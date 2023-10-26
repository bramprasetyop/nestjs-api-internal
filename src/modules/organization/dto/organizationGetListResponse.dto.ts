import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { Organization } from './organization.dto';

@ObjectType()
export class OrganizationGetListResponse {
  @Field(type => [Organization])
  organizations: Organization[];

  @Field()
  meta: PaginationMeta;
}
