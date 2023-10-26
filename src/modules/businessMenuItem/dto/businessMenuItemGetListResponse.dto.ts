import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { BusinessMenuItem } from './businessMenuItem.dto';

@ObjectType()
export class BusinessMenuItemGetListResponse {
  @Field(type => [BusinessMenuItem])
  businessMenuItems: BusinessMenuItem[];

  @Field()
  meta: PaginationMeta;
}
