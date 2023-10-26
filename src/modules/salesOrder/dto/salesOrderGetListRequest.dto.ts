import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';
import { SalesOrderStatus } from '@wahyoo/wahyoo-shared';
import { DateFilter } from 'src/commons/dateFilter';
import { Pagination, SortBy, SortOrder } from 'src/commons/pagination.dto';
@InputType()
export class SalesOrderFilter {
  @Field(type => ID, { nullable: true })
  organizationUserId?: string;

  @Field(type => SalesOrderStatus, { nullable: true })
  status?: SalesOrderStatus;

  @Field(type => DateFilter, { nullable: true })
  createdAt?: DateFilter;

  @Field(type => DateFilter, { nullable: true })
  startDate?: DateFilter;

  @Field(type => DateFilter, { nullable: true })
  finishDate?: DateFilter;

  @Field(type => DateFilter, {
    nullable: true,
    description: 'Filters based on date only without considering time'
  })
  dateRange?: DateFilter;
}

@ArgsType()
export class SalesOrderGetListRequest extends Pagination {
  // Override from field class Pagination
  @Field(type => SortBy, {
    nullable: true,
    defaultValue: {
      columnName: 'createdAt',
      sortOrder: SortOrder.DESC
    }
  })
  sortBy?: SortBy;

  @Field(type => ID, { nullable: true })
  businessOutletId?: string;

  @Field(type => ID, { nullable: true })
  organizationUserDailyFinanceReportId?: string;

  @Field(type => ID, { nullable: true })
  businessOutletDailyFinanceReportId?: string;

  @Field({ nullable: true })
  filter: SalesOrderFilter;

  @Field(type => Boolean, { nullable: true, defaultValue: false })
  disabledPagination: boolean;
}
