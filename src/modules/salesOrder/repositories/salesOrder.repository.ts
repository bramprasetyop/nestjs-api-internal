import { Inject, Injectable } from '@nestjs/common';
import {
  BusinessOutletModel,
  InjectionKey,
  OrganizationUserBusinessOutletModel,
  OrganizationUserModel,
  SalesOrderBusinessMenuItemModel,
  SalesOrderBusinessMenuModifierItemModel,
  SalesOrderModel,
  OrganizationUserDailyFinanceReportOrderModel,
  BusinessOutletDailyFinanceReportOrderModel,
  XHubsterOrderModel
} from '@wahyoo/wahyoo-shared';
import { Op, QueryTypes } from 'sequelize';
import { OrganizationUserBusiness } from 'src/modules/user/dto/organizationUserBusiness.dto';
import { SalesOrderGetListRequest } from '../dto/salesOrderGetListRequest.dto';
import { SalesOrderGetSummaryListRequest } from '../dto/salesOrderGetSummaryListRequest.dto';
import { SalesOrderSyncInput } from '../dto/salesOrderSyncRequest.dto';
import { SalesOrderUpdateUserInfoRequest } from '../dto/salesOrderUpdateUserInfoRequest.dto';
import {
  ISalesOrderRepository,
  PagingSalesOrderModel
} from './salesOrder.interface';

@Injectable()
export class SalesOrderRepository implements ISalesOrderRepository {
  constructor(
    @Inject(InjectionKey.SALES_ORDER_MODEL)
    private readonly salesOrderModel: typeof SalesOrderModel,

    @Inject(InjectionKey.SALES_ORDER_BUSINESS_MENU_ITEM_MODEL)
    private readonly salesOrderBusinessMenuItemModel: typeof SalesOrderBusinessMenuItemModel,

    @Inject(InjectionKey.SALES_ORDER_BUSINESS_MENU_MODIFIER_ITEM_MODEL)
    private readonly salesOrderBusinessMenuModifierItemModel: typeof SalesOrderBusinessMenuModifierItemModel
  ) {}

  async findAll(dto: SalesOrderGetListRequest): Promise<PagingSalesOrderModel> {
    const {
      sortBy,
      page,
      pageSize,
      filter,
      search,
      businessOutletId,
      organizationUserDailyFinanceReportId,
      businessOutletDailyFinanceReportId,
      disabledPagination
    } = dto;
    const whereClause: any = {};
    whereClause[Op.and] = [];
    const includeClause: any = [
      {
        model: XHubsterOrderModel,
        as: 'xHubsterOrder'
      }
    ];

    if (organizationUserDailyFinanceReportId) {
      includeClause.push({
        required: true,
        model: OrganizationUserDailyFinanceReportOrderModel,
        as: 'organizationUserDailyFinanceReportOrders',
        where: {
          organizationUserDailyFinanceReportId
        }
      });
    }

    if (businessOutletDailyFinanceReportId) {
      includeClause.push({
        required: true,
        model: BusinessOutletDailyFinanceReportOrderModel,
        as: 'businessOutletDailyFinanceReportOrders',
        where: {
          businessOutletDailyFinanceReportId
        }
      });
    }

    if (filter && Object.keys(filter).length > 0) {
      if (filter.status) {
        whereClause.status = filter.status;
      }
      if (businessOutletId) {
        whereClause.businessOutletId = businessOutletId;
      }

      if (filter.organizationUserId) {
        includeClause.push({
          required: true,
          model: BusinessOutletModel,
          as: 'businessOutlet',
          include: [
            {
              required: true,
              model: OrganizationUserBusinessOutletModel,
              where: {
                organizationUserId: filter.organizationUserId
              }
            }
          ]
        });
      }

      if (filter.createdAt) {
        if (filter.createdAt.startDate) {
          whereClause[Op.and].push({
            createdAt: { [Op.gte]: filter.createdAt.startDate }
          });
        }
        if (filter.createdAt.endDate) {
          whereClause[Op.and].push({
            createdAt: { [Op.lte]: filter.createdAt.endDate }
          });
        }
      }

      if (filter.startDate) {
        if (filter.startDate.startDate) {
          whereClause[Op.and].push({
            startDate: { [Op.gte]: filter.startDate.startDate }
          });
        }
        if (filter.startDate.endDate) {
          whereClause[Op.and].push({
            startDate: { [Op.lte]: filter.startDate.endDate }
          });
        }
      }

      if (filter.finishDate) {
        if (filter.finishDate.startDate) {
          whereClause[Op.and].push({
            finishDate: { [Op.gte]: filter.finishDate.startDate }
          });
        }
        if (filter.finishDate.endDate) {
          whereClause[Op.and].push({
            finishDate: { [Op.lte]: filter.finishDate.endDate }
          });
        }
      }

      if (filter.dateRange) {
        if (filter.dateRange.startDate) {
          whereClause[Op.and].push(
            this.salesOrderModel.sequelize.Sequelize.literal(
              `DATE("SalesOrderModel"."finish_date") >= DATE('${filter.dateRange.startDate.toISOString()}')`
            )
          );
        }
        if (filter.dateRange.endDate) {
          whereClause[Op.and].push(
            this.salesOrderModel.sequelize.Sequelize.literal(
              `DATE("SalesOrderModel"."finish_date") <= DATE('${filter.dateRange.endDate.toISOString()}')`
            )
          );
        }
      }
    }
    if (search) {
      whereClause[Op.or] = [
        { invoice: { [Op.iLike]: '%' + search + '%' } },
        { userName: { [Op.iLike]: '%' + search + '%' } },
        { notes: { [Op.iLike]: '%' + search + '%' } },
        { userPhoneNumber: { [Op.iLike]: '%' + search + '%' } }
      ];
    }
    const result = await this.salesOrderModel.findAndCountAll({
      where: whereClause,
      order: [[sortBy.columnName, sortBy.sortOrder]],
      include: includeClause,
      limit: disabledPagination ? undefined : pageSize,
      offset: disabledPagination ? undefined : pageSize * page
    });
    return {
      salesOrders: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }

  public async findById(id: string): Promise<SalesOrderModel> {
    return this.salesOrderModel.findByPk(id);
  }

  public async findByRefId(refId: string): Promise<SalesOrderModel> {
    return this.salesOrderModel.findOne({
      where: { refId }
    });
  }

  public async create(
    salesOrderSyncInput: SalesOrderSyncInput
  ): Promise<SalesOrderModel> {
    let transaction: any = null;
    try {
      transaction = await this.salesOrderModel.sequelize.transaction();
      const salesOrder = await this.salesOrderModel.create(
        salesOrderSyncInput,
        { transaction }
      );

      let { salesOrderBusinessMenuItems } = salesOrderSyncInput;
      const newSalesOrderBusinessMenuItems = salesOrderBusinessMenuItems.map(
        salesOrderBusinessMenuItem => {
          let {
            salesOrderBusinessMenuModifierItems
          } = salesOrderBusinessMenuItem;
          const newSalesOrderBusinessMenuModifierItems = salesOrderBusinessMenuModifierItems.map(
            salesOrderBusinessMenuModifierItem => {
              salesOrderBusinessMenuModifierItem.salesOrderId = salesOrder.id;
              return salesOrderBusinessMenuModifierItem;
            }
          );
          salesOrderBusinessMenuItem.salesOrderBusinessMenuModifierItems = newSalesOrderBusinessMenuModifierItems;
          salesOrderBusinessMenuItem.salesOrderId = salesOrder.id;
          return salesOrderBusinessMenuItem;
        }
      );
      await this.salesOrderBusinessMenuItemModel.bulkCreate(
        newSalesOrderBusinessMenuItems,
        {
          include: [
            {
              model: SalesOrderBusinessMenuModifierItemModel,
              as: 'salesOrderBusinessMenuModifierItems'
            }
          ],
          transaction
        }
      );
      await transaction.commit();
      return salesOrder;
    } catch (err) {
      if (transaction) {
        await transaction.rollback();
      }
      throw err;
    }
  }

  public async update({
    id,
    ...dto
  }: SalesOrderUpdateUserInfoRequest): Promise<SalesOrderModel> {
    const salesOrder = await this.findById(id);
    return salesOrder.update(dto);
  }

  public async updateStatusByRefId(
    salesOrderSyncInput: SalesOrderSyncInput
  ): Promise<SalesOrderModel> {
    await this.salesOrderModel.update(
      {
        status: salesOrderSyncInput.status
      },
      {
        where: { refId: salesOrderSyncInput.refId }
      }
    );
    return this.salesOrderModel.findOne({
      where: { refId: salesOrderSyncInput.refId }
    });
  }

  public async getDailySummaryList(
    dto: SalesOrderGetSummaryListRequest
  ): Promise<any> {
    const results = await this.salesOrderModel.sequelize.query(
      `SELECT
        orderDate,
        businessSalesChannelId,
        totalSales,
        estimatedEarnings,
        business_sales_channels."name" AS businessSalesChannelName,
        business_sales_channels."label" AS businessSalesChannelLabel,
        business_sales_channel_categories."name" AS businessSalesChannelCategoryName
      FROM (
        SELECT
          SUM(_total_price) AS totalSales,
          SUM(_total_base_price) AS estimatedEarnings,
          business_sales_channel_id AS businessSalesChannelId,
          DATE(start_date) AS orderDate
        FROM sales_orders
        WHERE business_outlet_id = :businessOutletId
          AND DATE(start_date) >= DATE('${dto.dateRange.startDate.toISOString()}')
          AND DATE(start_date) <= DATE('${dto.dateRange.endDate.toISOString()}')
          AND status = 'finished'
          AND deleted_at IS NULL
        GROUP BY business_sales_channel_id, DATE(start_date)
      ) AS so
      INNER JOIN business_sales_channels ON so.businessSalesChannelId = business_sales_channels.id
      INNER JOIN business_sales_channel_categories ON business_sales_channels.business_sales_channel_category_id = business_sales_channel_categories.id
      ORDER BY orderDate DESC`,
      {
        replacements: {
          businessOutletId: dto.businessOutletId
        },
        fieldMap: {
          orderdate: 'day',
          businesssaleschannelid:
            'dailyTransactionSummaryDetail.businessSalesChannelId',
          totalsales: 'dailyTransactionSummaryDetail.totalSales',
          estimatedearnings: 'dailyTransactionSummaryDetail.estimatedEarnings',
          businesssaleschannelname:
            'dailyTransactionSummaryDetail.businessSalesChannelName',
          businesssaleschannellabel:
            'dailyTransactionSummaryDetail.businessSalesChannelLabel',
          businesssaleschannelcategoryname:
            'dailyTransactionSummaryDetail.businessSalesChannelCategoryName'
        },
        nest: true,
        type: QueryTypes.SELECT
      }
    );

    console.log(results);
    return results;
  }
}
