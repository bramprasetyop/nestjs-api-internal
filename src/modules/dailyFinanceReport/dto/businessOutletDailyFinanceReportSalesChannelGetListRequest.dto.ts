import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class BusinessOutletDailyFinanceReportSalesChannelFilter {
  @Field(type => ID)
  businessOutletId: string;

  @Field()
  finishDate: Date;
}

@ArgsType()
export class BusinessOutletDailyFinanceReportSalesChannelGetListRequest {
  @Field()
  filter: BusinessOutletDailyFinanceReportSalesChannelFilter;
}
