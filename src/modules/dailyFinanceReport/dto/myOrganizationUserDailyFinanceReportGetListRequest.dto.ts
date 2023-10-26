import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { DateFilter } from 'src/commons/dateFilter';
import { Pagination } from 'src/commons/pagination.dto';
import { DailyUserPaymentStatus } from './organizationUserDailyFinanceReportGetListRequest.dto';

@InputType()
export class MyOrganizationUserDailyFinanceReportFilter {
  organizationUserId?: string;

  @Field(type => DailyUserPaymentStatus, { nullable: true })
  paymentStatus?: DailyUserPaymentStatus;

  @Field(type => DateFilter, { nullable: true })
  period?: DateFilter;
}

@ArgsType()
export class MyOrganizationUserDailyFinanceReportGetListRequest extends Pagination {
  @Field({ nullable: true })
  filter: MyOrganizationUserDailyFinanceReportFilter;

  @Field(type => Boolean, { nullable: true, defaultValue: false })
  disabledPagination: boolean;
}
