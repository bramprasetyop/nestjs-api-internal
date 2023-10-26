import { ArgsType, Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Pagination, SortBy } from 'src/commons/pagination.dto';
import {
  OrderDeliveryTimeWindowStatus,
  OrderDeliveryTimeWindowDeliveryType
} from 'src/modules/external/interfaces/order.interface';

registerEnumType(OrderDeliveryTimeWindowStatus, {
  name: 'OrderDeliveryTimeWindowStatus',
  description: 'OrderDeliveryTimeWindowStatus'
});

registerEnumType(OrderDeliveryTimeWindowDeliveryType, {
  name: 'OrderDeliveryTimeWindowDeliveryType',
  description: 'OrderDeliveryTimeWindowDeliveryType'
});

@InputType()
export class OrderDeliveryTimeWindowFilter {
  @Field(type => OrderDeliveryTimeWindowStatus, { nullable: true })
  status: OrderDeliveryTimeWindowStatus;

  @Field(type => OrderDeliveryTimeWindowDeliveryType, { nullable: true })
  deliveryType: OrderDeliveryTimeWindowDeliveryType;
}

@ArgsType()
export class OrderDeliveryTimeWindowGetListRequest extends Pagination {
  @Field({ nullable: true })
  filter: OrderDeliveryTimeWindowFilter;

  @Field({ nullable: true })
  search: string;

  @Field()
  page: number = 0;

  @Field()
  pageSize: number = 10;

  @Field({ nullable: true })
  sortBy: SortBy;
}
