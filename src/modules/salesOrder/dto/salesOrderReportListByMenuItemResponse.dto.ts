import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { SalesOrder } from './salesOrder.dto';

@ObjectType()
export class SalesOrderMenuItemSold {
  @Field(type => String)
  businessSalesChannelName: String;

  @Field(type => Number)
  quantity: Number;
}

@ObjectType()
export class SalesOrderMenuItem {
  @Field(type => String)
  businessMenuItemName: String;

  @Field(type => String)
  businessMenuCategoryName: String;

  @Field(type => [SalesOrderMenuItemSold])
  soldMenuItems: SalesOrderMenuItemSold[];
}

@ObjectType()
export class SalesOrderReportByMenuItemResponse {
  @Field(type => [SalesOrderMenuItem])
  menuItems: SalesOrderMenuItem[];
}
