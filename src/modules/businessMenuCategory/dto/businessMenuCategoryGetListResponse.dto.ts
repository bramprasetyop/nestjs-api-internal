import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { BusinessMenuCategory } from './businessMenuCategory.dto';

@ObjectType()
export class BusinessMenuCategoryGetListResponse {
  @Field(type => [BusinessMenuCategory])
  businessMenuCategories: BusinessMenuCategory[];

  @Field()
  meta: PaginationMeta;
}
