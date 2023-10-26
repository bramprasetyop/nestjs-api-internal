import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { OrganizationUserBusinessOutlet } from './organizationUserBusinessOutlet.dto';

@ObjectType()
export class OrganizationUserBusinessOutletGetListResponse {
  @Field(type => [OrganizationUserBusinessOutlet])
  organizationUserBusinessOutlets: OrganizationUserBusinessOutlet[];

  @Field()
  meta: PaginationMeta;
}
