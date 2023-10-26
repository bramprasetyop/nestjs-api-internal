import { ArgsType, Field, ID } from '@nestjs/graphql';
import { DateFilter } from 'src/commons/dateFilter';

@ArgsType()
export class SalesOrderGetSummaryListRequest {
  @Field(type => ID)
  businessOutletId: string;

  @Field(type => DateFilter)
  dateRange: DateFilter;
}
