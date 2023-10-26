import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { BusinessPaymentType } from './businessPaymentType.dto';

@ObjectType()
export class BusinessPaymentTypeGetListResponse {
  @Field(type => [BusinessPaymentType])
  businessPaymentTypes: BusinessPaymentType[];

  @Field()
  meta: PaginationMeta;
}
