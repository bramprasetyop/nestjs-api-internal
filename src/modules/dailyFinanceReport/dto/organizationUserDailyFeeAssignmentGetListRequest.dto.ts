import {
  ArgsType,
  Field,
  ID,
  InputType,
  registerEnumType
} from '@nestjs/graphql';
import { DateFilter } from 'src/commons/dateFilter';
import { Pagination } from 'src/commons/pagination.dto';

@InputType()
export class OrganizationUserDailyFeeAssignmentFilter {
  @Field(type => ID, { nullable: true })
  organizationUserId: string;

  @Field(type => ID, { nullable: true })
  businessOutletId: string;
}

@ArgsType()
export class OrganizationUserDailyFeeAssignmentGetListRequest extends Pagination {
  @Field({ nullable: true })
  filter: OrganizationUserDailyFeeAssignmentFilter;
}
