import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { XMenuItem } from './xMenuItem.dto';

@ObjectType()
export class XMenuItemUnassignedListResponse {
  @Field(type => [XMenuItem])
  xMenuItems: XMenuItem[];

  @Field()
  meta: PaginationMeta;
}
