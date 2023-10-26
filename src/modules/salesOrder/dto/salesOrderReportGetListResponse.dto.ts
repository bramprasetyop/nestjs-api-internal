import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { SalesOrder } from './salesOrder.dto';

@ObjectType()
export class SalesOrderReportSummary {
  // sum salesOrder._totalPrice filter by business_sales_channel_categories.id "offline" or "Datang Langsung"
  @Field(type => Number)
  offlineChannelSalesAmount: Number;
  // sum salesOrder._totalPrice filter by business_sales_channel_categories.id "online" or "Aplikasi Online"
  @Field(type => Number)
  onlineChannelSalesAmount: Number;
  // sum salesOrder._totalBasePrice filter by business_sales_channel_categories.id "online" or "Aplikasi Online"
  @Field(type => Number)
  onlineChannelTransferAmount: Number;
}

@ObjectType()
export class SalesOrderReportDaily {
  @Field(type => Date)
  date: Date;

  @Field(type => [SalesOrder])
  salesOrders: SalesOrder[];

  @Field(() => SalesOrderReportSummary)
  summary: SalesOrderReportSummary;
}

@ObjectType()
export class SalesOrderReportGetListResponse {
  @Field(type => [SalesOrderReportDaily])
  salesOrderReports: SalesOrderReportDaily[];

  @Field()
  meta: PaginationMeta;
}
