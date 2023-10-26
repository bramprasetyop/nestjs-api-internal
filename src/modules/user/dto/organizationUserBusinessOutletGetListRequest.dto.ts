import { ArgsType, Field, InputType, ID } from '@nestjs/graphql';
import { OrganizationUserBusinessOutletStatus } from '@wahyoo/wahyoo-shared';
import { Pagination, SortBy } from 'src/commons/pagination.dto';

@InputType()
export class OrganizationUserBusinessOutletFilter {
  @Field(() => OrganizationUserBusinessOutletStatus, { nullable: true })
  status: OrganizationUserBusinessOutletStatus;

  @Field(() => ID, { nullable: true })
  businessOutletId: string;
}

@ArgsType()
export class OrganizationUserBusinessOutletGetListRequest extends Pagination {
  @Field({ nullable: true })
  filter: OrganizationUserBusinessOutletFilter;

  @Field(type => Boolean, { nullable: true, defaultValue: false })
  disabledPagination: boolean;
}
