import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { BusinessSalesChannelCategory } from './businessSalesChannelCategory.dto';

@ObjectType()
export class BusinessSalesChannelCategoryGetListResponse {
  @Field(type => [BusinessSalesChannelCategory])
  businessSalesChannelCategories: BusinessSalesChannelCategory[];

  @Field()
  meta: PaginationMeta;
}
