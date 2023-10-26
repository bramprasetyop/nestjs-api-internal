import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { OrganizationUserBusiness } from './organizationUserBusiness.dto';
import { OrganizationUser } from './user.dto';

@ObjectType()
export class OrganizationUserBusinessGetListResponse {
  @Field(type => [OrganizationUserBusiness])
  organizationUserBusinesses: OrganizationUserBusiness[];

  @Field()
  meta: PaginationMeta;
}
