import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { OrderDeliveryTimeWindow } from './orderDeliveryTimeWindow.dto';

@ObjectType()
export class OrderDeliveryTimeWindowGetListResponse {
  @Field(type => [OrderDeliveryTimeWindow])
  orderDeliveryTimeWindows: OrderDeliveryTimeWindow[];

  @Field()
  meta: PaginationMeta;
}
