import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class BusinessOutletDailyFinanceReportMenuItemFilter {
  @Field(type => ID)
  businessOutletId: string;

  @Field()
  finishDate: Date;
}

@ArgsType()
export class BusinessOutletDailyFinanceReportMenuItemGetListRequest {
  @Field()
  filter: BusinessOutletDailyFinanceReportMenuItemFilter;
}
