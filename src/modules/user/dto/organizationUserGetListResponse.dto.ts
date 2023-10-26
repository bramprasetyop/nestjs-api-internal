import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { OrganizationUser } from './user.dto';

@ObjectType()
export class OrganizationUserGetListResponse {
  @Field(type => [OrganizationUser])
  organizationUsers: OrganizationUser[];

  @Field()
  meta: PaginationMeta;
}
