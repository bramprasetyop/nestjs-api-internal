import { ArgsType, Field, InputType, ID } from '@nestjs/graphql';
import { OrganizationUserStatus } from '@wahyoo/wahyoo-shared';
import { Pagination, SortBy } from 'src/commons/pagination.dto';

@InputType()
export class OrganizationUserFilter {
  @Field(() => OrganizationUserStatus, { nullable: true })
  status: OrganizationUserStatus;

  @Field(type => Boolean, { nullable: true })
  isEmployee: boolean;

  @Field(type => String, { nullable: true })
  brand: string;

  @Field(type => String, { nullable: true })
  leadSource: string;

  @Field(type => String, { nullable: true })
  outletRegistration: string;
}

@ArgsType()
export class OrganizationUserGetListRequest extends Pagination {
  @Field({ nullable: true })
  filter: OrganizationUserFilter;

  @Field(type => Boolean, { nullable: true, defaultValue: false })
  disabledPagination: boolean;

  @Field(() => ID, { nullable: true })
  currentUserId: string;
}
