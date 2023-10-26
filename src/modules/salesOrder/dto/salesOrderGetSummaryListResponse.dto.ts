import { Field, ObjectType } from '@nestjs/graphql';
import { DailyTransactionSummary } from './dailyTransactionSummary.dto';

@ObjectType()
export class SalesOrderGetSummaryListResponse {
  @Field(type => [DailyTransactionSummary])
  dailyTransactionSummaries: DailyTransactionSummary[];
}
