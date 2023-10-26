import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { BusinessMerchantProduct } from './businessMerchantProduct.dto';

@ObjectType()
export class BusinessMerchantProductGetListResponse {
  @Field(type => [BusinessMerchantProduct])
  businessMerchantProducts: BusinessMerchantProduct[];

  @Field()
  meta: PaginationMeta;
}
