import { Inject, Injectable } from '@nestjs/common';
import { Op, QueryTypes } from 'sequelize';
import {
  BusinessOutletDailyFinanceReportModel,
  BusinessOutletModel,
  InjectionKey,
  SalesOrderBusinessMenuItemModel,
  SalesOrderModel,
  SalesOrderStatus
} from '@wahyoo/wahyoo-shared';
import { BusinessOutletDailyFinanceReportGetListRequest } from '../dto/businessOutletDailyFinanceReportGetListRequest.dto';
import { BusinessOutletDailyFinanceReportSalesChannelGetListRequest } from '../dto/businessOutletDailyFinanceReportSalesChannelGetListRequest.dto';
import { BusinessOutletDailyFinanceReportSalesChannelGetListResponse } from '../dto/businessOutletDailyFinanceReportSalesChannelGetListResponse.dto';
import { BusinessOutletDailyFinanceReportMenuItemGetListRequest } from '../dto/businessOutletDailyFinanceReportMenuItemGetListRequest.dto';
import { BusinessOutletDailyFinanceReportMenuItemGetListResponse } from '../dto/businessOutletDailyFinanceReportMenuItemGetListResponse.dto';
import {
  IBusinessOutletDailyFinanceReportRepository,
  PagingBusinessOutletDailyFinanceReportModel
} from './businessOutletDailyFinanceReport.interface';
import moment from 'moment';
import { BusinessOutletDailyFinanceReportSalesChannel } from '../dto/businessOutletDailyFinanceReportSalesChannel.dto';
import { BusinessOutletDailyFinanceReportMenuItem } from '../dto/businessOutletDailyFinanceReportMenuItem.dto';

@Injectable()
export class BusinessOutletDailyFinanceReportRepository
  implements IBusinessOutletDailyFinanceReportRepository {
  constructor(
    @Inject(InjectionKey.BUSINESS_OUTLET_DAILY_FINANCE_REPORT_MODEL)
    private readonly businessOutletDailyFinanceReportModel: typeof BusinessOutletDailyFinanceReportModel,

    @Inject(InjectionKey.SALES_ORDER_MODEL)
    private readonly salesOrderModel: typeof SalesOrderModel,

    @Inject(InjectionKey.SALES_ORDER_BUSINESS_MENU_ITEM_MODEL)
    private readonly salesOrderBusinessMenuItemModel: typeof SalesOrderBusinessMenuItemModel
  ) {}

  async findAll(
    dto: BusinessOutletDailyFinanceReportGetListRequest
  ): Promise<PagingBusinessOutletDailyFinanceReportModel> {
    const { sortBy, page, pageSize, filter, search, disabledPagination } = dto;
    const whereClause: any = {};
    const includeClause: any = [];

    if (filter && Object.keys(filter).length > 0) {
      if (filter.businessOutletId) {
        whereClause.businessOutletId = filter.businessOutletId;
      }
      if (filter.organizationUserId) {
        whereClause.organizationUserId = filter.organizationUserId;
      }
      if (filter.period) {
        whereClause[Op.and] = [];
        if (filter.period.startDate) {
          whereClause[Op.and].push({
            day: {
              [Op.gte]: moment(filter.period.startDate).format('YYYY-MM-DD')
            }
          });
        }
        if (filter.period.endDate) {
          whereClause[Op.and].push({
            day: {
              [Op.lte]: moment(filter.period.endDate).format('YYYY-MM-DD')
            }
          });
        }
      }
    }

    if (search) {
      includeClause.push({
        required: true,
        model: BusinessOutletModel,
        as: 'businessOutlet',
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: '%' + search + '%' } },
            { code: { [Op.iLike]: '%' + search + '%' } }
          ]
        }
      });
    }

    const result = await this.businessOutletDailyFinanceReportModel.findAndCountAll(
      {
        where: whereClause,
        order: [[sortBy.columnName, sortBy.sortOrder]],
        limit: disabledPagination ? undefined : pageSize,
        offset: disabledPagination ? undefined : pageSize * page,
        include: includeClause
      }
    );
    return {
      businessOutletDailyFinanceReports: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }
  async findById(id: string): Promise<BusinessOutletDailyFinanceReportModel> {
    return this.businessOutletDailyFinanceReportModel.findByPk(id);
  }

  async getReportListBySalesChannel(
    dto: BusinessOutletDailyFinanceReportSalesChannelGetListRequest
  ): Promise<BusinessOutletDailyFinanceReportSalesChannelGetListResponse> {
    const { filter } = dto;
    const sequelize = this.salesOrderModel.sequelize;
    const salesChannelReport: any[] = await sequelize.query(
      `select business_sales_channel_id,  
      channel_name, count(*) as "number_of_orders", 
      sum(_total_price) as "online_gross_amount", 
      sum(_total_base_price) as "online_mitra_transfer_amount"
      from (
      select business_sales_channels."name" as "channel_name",  sales_orders.business_sales_channel_id, sales_orders._total_price, sales_orders._total_base_price
      from sales_orders
      join business_sales_channels on business_sales_channels.id = sales_orders.business_sales_channel_id
      where business_outlet_id = '${
        filter.businessOutletId
      }' and date(sales_orders.finish_date) = '${moment(
        filter.finishDate
      ).format('YYYY-MM-DD')}'
      )t
      group by business_sales_channel_id, channel_name`,
      { type: QueryTypes.SELECT }
    );

    let totalOrders = 0;
    let totalOnlineMitraTransferAmount = 0;
    let totalOnlineGrossAmount = 0;
    const businessOutletDailyReportSalesChannels: BusinessOutletDailyFinanceReportSalesChannel[] = [];
    salesChannelReport.forEach(data => {
      businessOutletDailyReportSalesChannels.push({
        channelName: data.channel_name,
        numberOfOrders: data.number_of_orders,
        onlineGrossAmount: data.online_gross_amount,
        onlineMitraTransferAmount: data.online_mitra_transfer_amount
      });
      (totalOrders += parseInt(data.number_of_orders)),
        (totalOnlineGrossAmount += parseFloat(data.online_gross_amount));
      totalOnlineMitraTransferAmount += parseFloat(
        data.online_mitra_transfer_amount
      );
    });

    return {
      businessOutletDailyReportSalesChannels,
      summary: {
        totalOrders,
        totalOnlineMitraTransferAmount,
        totalOnlineGrossAmount
      }
    };
  }

  async getReportListByMenuItem(
    dto: BusinessOutletDailyFinanceReportMenuItemGetListRequest
  ): Promise<BusinessOutletDailyFinanceReportMenuItemGetListResponse> {
    const { filter } = dto;
    const sequelize = this.salesOrderBusinessMenuItemModel.sequelize;
    const menuItemReport: any[] = await sequelize.query(
      `select business_sales_channel_id,  
      channel_name,
      _business_item_name,
      sum(quantity) as "quantity",
      sum(_business_item_price) as "online_gross_amount", 
      sum(_business_item_base_price) as "online_mitra_transfer_amount"
      from (
      select business_sales_channel_id,
              business_sales_channels."name" as "channel_name",
              sales_order_business_menu_items._business_item_name, 
              sales_order_business_menu_items.quantity * sales_order_business_menu_items._business_item_price as "_business_item_price",
              sales_order_business_menu_items.quantity * sales_order_business_menu_items._business_item_base_price as "_business_item_base_price",
              sales_order_business_menu_items.quantity
      from sales_order_business_menu_items
      join sales_orders on sales_orders.id = sales_order_business_menu_items.sales_order_id
      join business_sales_channels on business_sales_channels.id = sales_orders.business_sales_channel_id
      where sales_orders.status = '${
        SalesOrderStatus.finished
      }' and sales_orders.business_outlet_id = '${filter.businessOutletId}'
      and DATE(sales_orders.finish_date) = '${moment(filter.finishDate).format(
        'YYYY-MM-DD'
      )}'
      ) t
      group by business_sales_channel_id, channel_name, _business_item_name`,
      { type: QueryTypes.SELECT }
    );

    let totalQuantity = 0;
    let totalOnlineMitraTransferAmount = 0;
    let totalOnlineGrossAmount = 0;
    const businessOutletDailyFinanceReportMenuItems: BusinessOutletDailyFinanceReportMenuItem[] = [];
    menuItemReport.forEach(data => {
      businessOutletDailyFinanceReportMenuItems.push({
        channelName: data.channel_name,
        businessItemName: data._business_item_name,
        quantity: data.quantity,
        onlineGrossAmount: data.online_gross_amount,
        onlineMitraTransferAmount: data.online_mitra_transfer_amount
      });
      (totalQuantity += parseInt(data.quantity)),
        (totalOnlineGrossAmount += parseFloat(data.online_gross_amount));
      totalOnlineMitraTransferAmount += parseFloat(
        data.online_mitra_transfer_amount
      );
    });

    return {
      businessOutletDailyFinanceReportMenuItems,
      summary: {
        totalQuantity,
        totalOnlineMitraTransferAmount,
        totalOnlineGrossAmount
      }
    };
  }
}
