import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DailyTransactionSummary {
  @Field()
  day: String;

  @Field(type => [DailyTransactionSummaryDetail])
  dailyTransactionSummaryDetails: DailyTransactionSummaryDetail[];

  @Field(type => Float)
  totalOfflineSales: number;

  @Field(type => Float)
  totalOnlineSales: number;

  @Field(type => Float)
  totalEstimatedEarnings: number;
}

@ObjectType()
export class DailyTransactionSummaryDetail {
  @Field()
  businessSalesChannelName: String;

  @Field()
  businessSalesChannelLabel: String;

  @Field()
  businessSalesChannelCategoryName: String;

  @Field(type => Float)
  totalSales: number;

  @Field(type => Float)
  estimatedEarnings: number;
}
