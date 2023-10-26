import { Field, ObjectType } from '@nestjs/graphql';
import { BusinessOutletDailyFinanceReportMenuItem } from './businessOutletDailyFinanceReportMenuItem.dto';
import { BusinessOutletDailyFinanceReportMenuItemSummary } from './businessOutletDailyFinanceReportMenuItemSummary.dto';
@ObjectType()
export class BusinessOutletDailyFinanceReportMenuItemGetListResponse {
  @Field(type => [BusinessOutletDailyFinanceReportMenuItem])
  businessOutletDailyFinanceReportMenuItems: BusinessOutletDailyFinanceReportMenuItem[];

  @Field()
  summary: BusinessOutletDailyFinanceReportMenuItemSummary;
}
