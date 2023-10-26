import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';
import { DateFilter } from 'src/commons/dateFilter';
import { Pagination } from 'src/commons/pagination.dto';

@InputType()
export class BusinessOutletDailyFinanceReportFilter {
  @Field(type => ID, { nullable: true })
  organizationUserId: string;

  @Field(type => ID, { nullable: true })
  businessOutletId: string;

  @Field(type => DateFilter, { nullable: true })
  period: DateFilter;
}

@ArgsType()
export class BusinessOutletDailyFinanceReportGetListRequest extends Pagination {
  @Field({ nullable: true })
  filter: BusinessOutletDailyFinanceReportFilter;

  @Field(type => Boolean, { nullable: true, defaultValue: false })
  disabledPagination: boolean;
}
