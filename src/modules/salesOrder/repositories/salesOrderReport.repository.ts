import { Inject, Injectable } from '@nestjs/common';
import {
  InjectionKey,
  SalesOrderModel,
  SalesOrderStatus,
  BusinessSalesChannelCategoryName
} from '@wahyoo/wahyoo-shared';
import { QueryTypes, Op } from 'sequelize';
import { SalesOrderReportByChannelRequest } from '../dto/salesOrderReportListByChannelRequest.dto';
import { SalesOrderReportListByChannelResponse } from '../dto/salesOrderReportListByChannelResponse.dto';
import { SalesOrderReportByMenuItemRequest } from '../dto/salesOrderReportListByMenuItemRequest.dto';
import { SalesOrderReportByMenuItemResponse } from '../dto/salesOrderReportListByMenuItemResponse.dto';
import { SalesOrderReportGetListRequest } from '../dto/salesOrderReportGetListRequest.dto';
import { SalesOrderReportGetListResponse } from '../dto/salesOrderReportGetListResponse.dto';
import { ISalesOrderReportRepository } from './salesOrderReport.interface';
import 'moment-timezone';
import moment from 'moment';
import { TimeZone } from 'src/commons/constants/timeZone';

@Injectable()
export class SalesOrderReportRepository implements ISalesOrderReportRepository {
  constructor(
    @Inject(InjectionKey.SALES_ORDER_MODEL)
    private readonly salesOrderModel: typeof SalesOrderModel
  ) {}

  private sequelize = this.salesOrderModel.sequelize;

  public async getReportList(
    dto: SalesOrderReportGetListRequest
  ): Promise<SalesOrderReportGetListResponse> {
    const {
      businessOutletId,
      startDate,
      endDate,
      isPaginated,
      page,
      sortBy,
      pageSize
    } = dto;
    let additionalQuery = '';
    if (isPaginated) {
      additionalQuery = ` limit ${pageSize} offset ${page * pageSize}`;
    }

    const sqlQueryBase = `select date(so.start_date) as "orderDate",
    coalesce(SUM(so."_total_price") filter (where bscc."name" ilike '${
      BusinessSalesChannelCategoryName.OFFLINE
    }'),0) as "offlineChannelSalesAmount",
    coalesce(SUM(so."_total_price") filter (where bscc."name" ilike '${
      BusinessSalesChannelCategoryName.ONLINE
    }'),0) as "onlineChannelSalesAmount",
    coalesce(SUM(so."_total_base_price") filter (where bscc."name" ilike '${
      BusinessSalesChannelCategoryName.ONLINE
    }'),0) as "onlineChannelTransferAmount"
  from sales_orders so inner join business_sales_channels bsc on so.business_sales_channel_id=bsc.id 
  inner join business_sales_channel_categories bscc on bsc.business_sales_channel_category_id=bscc.id 
  where so.business_outlet_id ='${businessOutletId}' 
  and so.status='${
    SalesOrderStatus.finished
  }' and date(so.start_date) >='${moment(startDate)
      .tz(TimeZone.ASIA_JAKARTA)
      .format('YYYY-MM-DD')}' and date(so.start_date) <='${moment(endDate)
      .tz(TimeZone.ASIA_JAKARTA)
      .format(
        'YYYY-MM-DD'
      )}' and so.deleted_at is null and bscc.deleted_at is null 
  group by "orderDate"
  order by "orderDate" desc`;

    const sqlQueryCount = `select count("_result"."orderDate") from (${sqlQueryBase})  as "_result"`;
    const sqlQueryPaging = `${sqlQueryBase} ${additionalQuery}`;

    const [countResult]: any[] = await this.sequelize.query(sqlQueryCount, {
      type: QueryTypes.SELECT
    });

    const salesReports: any[] = await this.sequelize.query(sqlQueryPaging, {
      type: QueryTypes.SELECT
    });

    if (salesReports.length === 0) {
      return {
        salesOrderReports: [],
        meta: {
          total: 0,
          pageSize: pageSize,
          currentPage: page,
          totalPage: 0
        }
      };
    }

    let salesOrderReports: any[] = [];

    const dates: any[] = [];
    salesReports.forEach(report => {
      const {
        orderDate,
        offlineChannelSalesAmount,
        onlineChannelSalesAmount,
        onlineChannelTransferAmount
      } = report;
      dates.push(orderDate);
      const summary = {
        onlineChannelSalesAmount,
        offlineChannelSalesAmount,
        onlineChannelTransferAmount
      };

      salesOrderReports.push({ date: orderDate, summary });
    });
    const dateStringify = `'${dates.join("','")}'`;

    const salesOrders: any[] = await this.salesOrderModel.findAll({
      where: {
        [Op.and]: [
          this.sequelize.Sequelize.literal(
            `date(start_date) in (${dateStringify})`
          )
        ],
        businessOutletId
      },
      order: [[sortBy.columnName, sortBy.sortOrder]]
    });

    dates.forEach(date => {
      const selectedOrders = salesOrders.filter(
        salesOrder =>
          moment(salesOrder.startDate)
            .tz(TimeZone.ASIA_JAKARTA)
            .format('YYYY-MM-DD') === date
      );
      const idx = salesOrderReports.findIndex(data => data.date === date);
      salesOrderReports[idx].salesOrders = selectedOrders;
      salesOrderReports[idx].date = moment(date).tz(TimeZone.ASIA_JAKARTA);
    });

    return {
      salesOrderReports,
      meta: {
        total: countResult.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(countResult.count / pageSize)
      }
    };
  }
  public async getReportListBySalesChannel(
    dto: SalesOrderReportByChannelRequest
  ): Promise<SalesOrderReportListByChannelResponse> {
    const { businessOutletId, startDate, endDate } = dto;
    const salesOrderChannelSummaries: any[] = await this.sequelize.query(
      `select
	bsc.name as "businessSalesChannelName",
	coalesce("totalSales", 0) as "totalSales",
	coalesce("numberOfOrders", 0) as "numberOfOrders"
from
	business_sales_channels bsc
left join  
(
	select
		so.business_sales_channel_id as "businessSalesChannelId",
		coalesce( sum(so."_total_price"), 0) as "totalSales",
		count(so.id) as "numberOfOrders"
	from
		sales_orders so
	where
		so.business_outlet_id = '${businessOutletId}'
		and so.status = '${SalesOrderStatus.finished}'
		and date(so.start_date) >= '${moment(startDate)
      .tz(TimeZone.ASIA_JAKARTA)
      .format('YYYY-MM-DD')}'
		and date(so.start_date) <='${moment(endDate)
      .tz(TimeZone.ASIA_JAKARTA)
      .format('YYYY-MM-DD')}'
		and so.deleted_at is null
	group by
		"businessSalesChannelId") calculatedOrder on
	bsc.id = calculatedOrder."businessSalesChannelId"
where
	bsc.deleted_at is null`,
      { type: QueryTypes.SELECT }
    );
    const salesOccur: any = salesOrderChannelSummaries.find(
      data => Number(data.numberOfOrders) > 0
    );
    if (typeof salesOccur === 'undefined') {
      return {
        salesOrderChannelSummaries: [],
        monthlyNumberOfOrders: [],
        monthlyTotalSalesOrders: []
      };
    }

    const availableSalesChannel: any[] = await this.sequelize.query(
      `select distinct name from business_sales_channels bsc 
      where bsc.deleted_at is null`,
      { type: QueryTypes.SELECT }
    );
    let additionalQuery = '';

    availableSalesChannel.forEach(salesChannel => {
      additionalQuery += ` ,SUM(so."_total_price") filter (where bsc."name" ilike '${salesChannel.name}') as "salesTot${salesChannel.name}", count(so.id) filter (where bsc."name" ilike '${salesChannel.name}') as "numOrd${salesChannel.name}" `;
    });

    const monthly: any[] = await this.sequelize.query(
      `select
      TO_CHAR(so.start_date , 'Month YYYY') as "monthName" ${additionalQuery}
    from
      sales_orders so inner join business_sales_channels bsc on so.business_sales_channel_id=bsc.id 
    where so.business_outlet_id ='${businessOutletId}' 
    and so.status='${
      SalesOrderStatus.finished
    }' and date(so.start_date) >='${moment(startDate)
        .tz(TimeZone.ASIA_JAKARTA)
        .format('YYYY-MM-DD')}' and date(so.start_date) <='${moment(endDate)
        .tz(TimeZone.ASIA_JAKARTA)
        .format(
          'YYYY-MM-DD'
        )}' and so.deleted_at is null and bsc.deleted_at is null
    group by "monthName" `,
      { type: QueryTypes.SELECT }
    );

    const monthlyNumberOfOrders: any[] = [];
    const monthlyTotalSalesOrders: any[] = [];
    const numberOfOrderKeys: any[] = Object.keys(monthly[0]).filter(data =>
      data.includes('numOrd')
    );
    const salesKeys: any[] = Object.keys(monthly[0]).filter(data =>
      data.includes('salesTot')
    );

    monthly.forEach((selectedMonth, key) => {
      const monthlyNumberOfOrderItem: any = {
        month: selectedMonth.monthName,
        numberOfOrders: []
      };
      numberOfOrderKeys.forEach(data => {
        const [, formattedData] = data.split('numOrd');
        monthlyNumberOfOrderItem.numberOfOrders.push({
          businessSalesChannelName: formattedData,
          numberOfOrders: Number(selectedMonth[data]) || 0
        });
      });

      monthlyNumberOfOrders.push(monthlyNumberOfOrderItem);

      const monthlySalesOrderItem: any = {
        month: selectedMonth.monthName,
        totalSalesOrders: []
      };
      salesKeys.forEach(data => {
        const [, formattedData] = data.split('salesTot');
        monthlySalesOrderItem.totalSalesOrders.push({
          businessSalesChannelName: formattedData,
          totalSales: Number(selectedMonth[data]) || 0
        });
      });

      monthlyTotalSalesOrders.push(monthlySalesOrderItem);
    });
    return {
      salesOrderChannelSummaries,
      monthlyNumberOfOrders,
      monthlyTotalSalesOrders
    };
  }

  public async getReportListByMenuItem(
    dto: SalesOrderReportByMenuItemRequest
  ): Promise<SalesOrderReportByMenuItemResponse> {
    const { businessOutletId, startDate, endDate } = dto;
    const availableSalesChannel: any[] = await this.sequelize.query(
      `select distinct name from business_sales_channels bsc 
      where bsc.deleted_at is null`,
      { type: QueryTypes.SELECT }
    );
    let additionalQuery = '';

    let additionalWhereClause = ``;
    // comment this line if want to show all items
    additionalWhereClause = ` and calculatedOrder."totalSold" is not null`;

    availableSalesChannel.forEach(salesChannel => {
      additionalQuery += ` ,SUM(sobmi.quantity) filter (where bsc."name" ilike '${salesChannel.name}') as "itemSold${salesChannel.name}"`;
    });
    const reportSalesItem: any[] = await this.sequelize.query(
      `select
	bmi."name" as "businessMenuItemName",
	bmc."name" as "businessMenuCategoryName",
	calculatedOrder.*
from 
	business_menu_items bmi
inner join business_menu_categories bmc on
	bmi.business_menu_category_id = bmc.id
left join
(
	select
    so.business_id as "businessId",
		sobmi.business_menu_item_id as "businessMenuItemId" ${additionalQuery}  
    ,sum(sobmi.quantity) as "totalSold" 
	from
		sales_order_business_menu_items sobmi
	inner join sales_orders so on
		so.id = sobmi.sales_order_id
	inner join business_sales_channels bsc on
		so.business_sales_channel_id = bsc.id
	where
	  so.business_outlet_id ='${businessOutletId}'
    and so.deleted_at is null
    and so.status='${
      SalesOrderStatus.finished
    }' and date(so.start_date) >='${moment(startDate)
        .tz(TimeZone.ASIA_JAKARTA)
        .format('YYYY-MM-DD')}' and date(so.start_date) <='${moment(endDate)
        .tz(TimeZone.ASIA_JAKARTA)
        .format('YYYY-MM-DD')}' 
	group by
		"businessMenuItemId", "businessId" ) calculatedOrder on
	bmi.id = calculatedOrder."businessMenuItemId" and bmc.business_id =calculatedOrder."businessId"
where
	bmc.deleted_at is null ${additionalWhereClause}`,
      { type: QueryTypes.SELECT }
    );
    if (reportSalesItem.length === 0) {
      return {
        menuItems: []
      };
    }

    const menuItems: any[] = [];
    const itemSoldKey: any[] = Object.keys(reportSalesItem[0]).filter(data =>
      data.includes('itemSold')
    );
    reportSalesItem.forEach(salesItem => {
      const { businessMenuItemName, businessMenuCategoryName } = salesItem;

      const menuItem: any = {
        businessMenuItemName,
        businessMenuCategoryName,
        soldMenuItems: []
      };
      itemSoldKey.forEach(data => {
        const [, formattedData] = data.split('itemSold');
        menuItem.soldMenuItems.push({
          businessSalesChannelName: formattedData,
          quantity: Number(salesItem[data]) || 0
        });
      });
      menuItems.push(menuItem);
    });

    return { menuItems };
  }
}
