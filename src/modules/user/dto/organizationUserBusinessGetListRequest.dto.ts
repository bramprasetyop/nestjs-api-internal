import { ArgsType, Field, InputType, ID } from '@nestjs/graphql';
import { OrganizationUserBusinessStatus } from '@wahyoo/wahyoo-shared';
import { Pagination, SortBy } from 'src/commons/pagination.dto';

@InputType()
export class OrganizationUserBusinessFilter {
  @Field(() => OrganizationUserBusinessStatus, { nullable: true })
  status: OrganizationUserBusinessStatus;

  @Field(() => ID, { nullable: true })
  businessId: string;
}

@ArgsType()
export class OrganizationUserBusinessGetListRequest extends Pagination {
  @Field({ nullable: true })
  filter: OrganizationUserBusinessFilter;

  @Field(type => Boolean, { nullable: true, defaultValue: false })
  disabledPagination: boolean;
}
