import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { SalesOrder } from './salesOrder.dto';

@ObjectType()
export class SalesOrderGetListResponse {
  @Field(type => [SalesOrder])
  salesOrders: SalesOrder[];

  @Field()
  meta: PaginationMeta;
}
