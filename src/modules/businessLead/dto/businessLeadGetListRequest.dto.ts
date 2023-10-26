import {
  ArgsType,
  Field,
  InputType,
  ID,
  Int,
  registerEnumType
} from '@nestjs/graphql';
import {
  BusinessLeadStatus,
  BusinessLeadRequirementStatus
} from '@wahyoo/wahyoo-shared/dist/constants/enums';
import { Pagination } from 'src/commons/pagination.dto';
import { SortBy, SortOrder } from 'src/commons/pagination.dto';

registerEnumType(BusinessLeadStatus, {
  name: 'BusinessLeadStatus',
  description: 'Business Lead Status'
});

registerEnumType(BusinessLeadRequirementStatus, {
  name: 'BusinessLeadRequirementStatus',
  description: 'Business Lead Requirement Status'
});

@InputType()
export class BusinessLeadFilter {
  @Field(type => ID, { nullable: true })
  id: string;

  @Field(type => String, { nullable: true })
  name: string;

  @Field(type => ID, { nullable: true })
  businessId: string;

  @Field(() => BusinessLeadStatus, { nullable: true })
  status: BusinessLeadStatus;

  @Field(() => BusinessLeadRequirementStatus, { nullable: true })
  requirementStatus: BusinessLeadRequirementStatus;
}

@ArgsType()
export class BusinessLeadGetListRequest extends Pagination {
  @Field({ nullable: true })
  filter: BusinessLeadFilter;

  search: string;

  @Field(type => Int, { nullable: true, defaultValue: 0 })
  page?: number;

  @Field(type => Int, { nullable: true, defaultValue: 10 })
  pageSize?: number;

  @Field(type => SortBy, {
    nullable: true,
    defaultValue: {
      columnName: 'createdAt',
      sortOrder: 'DESC'
    }
  })
  sortBy?: SortBy;
}
