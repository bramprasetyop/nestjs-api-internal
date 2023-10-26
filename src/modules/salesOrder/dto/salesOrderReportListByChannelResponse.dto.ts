import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { SalesOrder } from './salesOrder.dto';

@ObjectType()
export class SalesOrderChannelSummary {
  @Field(type => String)
  businessSalesChannelName: String;
  @Field(type => Number)
  numberOfOrders: Number;
  @Field(type => Number)
  totalSales: Number;
}

@ObjectType()
export class SalesOrderChannelMonthlyNumberOfOrderRow {
  @Field(type => String)
  businessSalesChannelName: String;

  @Field(type => Number)
  numberOfOrders: Number;
}

@ObjectType()
export class SalesOrderChannelMonthlyTotalSalesOrderRow {
  @Field(type => String)
  businessSalesChannelName: String;

  @Field(type => Number)
  totalSales: Number;
}

@ObjectType()
export class SalesOrderChannelMonthlyNumberOfOrder {
  @Field(type => String)
  month: String;

  @Field(type => [SalesOrderChannelMonthlyNumberOfOrderRow])
  numberOfOrders: SalesOrderChannelMonthlyNumberOfOrderRow[];
}

@ObjectType()
export class SalesOrderChannelMonthlyTotalSalesOrder {
  @Field(type => String)
  month: String;

  @Field(type => [SalesOrderChannelMonthlyTotalSalesOrderRow])
  totalSalesOrders: SalesOrderChannelMonthlyTotalSalesOrderRow[];
}

@ObjectType()
export class SalesOrderReportListByChannelResponse {
  @Field(type => [SalesOrderChannelSummary])
  salesOrderChannelSummaries: SalesOrderChannelSummary[];

  @Field(type => [SalesOrderChannelMonthlyNumberOfOrder])
  monthlyNumberOfOrders: SalesOrderChannelMonthlyNumberOfOrder[];

  @Field(type => [SalesOrderChannelMonthlyTotalSalesOrder])
  monthlyTotalSalesOrders: SalesOrderChannelMonthlyTotalSalesOrder[];
}
