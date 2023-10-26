import {
  ArgsType,
  Field,
  Float,
  ID,
  InputType,
  registerEnumType
} from '@nestjs/graphql';
import { DateFilter } from 'src/commons/dateFilter';
import { Pagination } from 'src/commons/pagination.dto';

@InputType()
export class OrganizationUserDailyFeeAssignmentUpdateRequest {
  @Field(type => ID)
  organizationUserId: string;

  @Field(type => Float)
  dailyTransferFee: number;
}
