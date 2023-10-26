import {
  ArgsType,
  Field,
  ID,
  InputType,
  registerEnumType
} from '@nestjs/graphql';
import { DateFilter } from 'src/commons/dateFilter';
import { Pagination } from 'src/commons/pagination.dto';

export enum DailyUserPaymentStatus {
  success = 'success',
  failed = 'failed',
  pending = 'pending'
}

registerEnumType(DailyUserPaymentStatus, {
  name: 'DailyUserPaymentStatus',
  description: 'DailyUserPaymentStatus'
});

@InputType()
export class OrganizationUserDailyFinanceReportFilter {
  @Field(type => ID, { nullable: true })
  organizationUserId?: string;

  @Field(type => DailyUserPaymentStatus, { nullable: true })
  paymentStatus?: DailyUserPaymentStatus;

  @Field(type => DateFilter, { nullable: true })
  period?: DateFilter;

  @Field(type => Boolean, { nullable: true, defaultValue: false })
  isUnprocessed?: boolean;
}

@ArgsType()
export class OrganizationUserDailyFinanceReportGetListRequest extends Pagination {
  @Field({ nullable: true })
  filter: OrganizationUserDailyFinanceReportFilter;

  @Field(type => Boolean, { nullable: true, defaultValue: false })
  disabledPagination: boolean;
}
