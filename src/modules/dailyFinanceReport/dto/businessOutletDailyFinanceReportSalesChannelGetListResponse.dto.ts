import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { BusinessOutletDailyFinanceReportSalesChannel } from './businessOutletDailyFinanceReportSalesChannel.dto';
import { BusinessOutletDailyFinanceReportSalesChannelSummary } from './businessOutletDailyFinanceReportSalesChannelSummary.dto';
@ObjectType()
export class BusinessOutletDailyFinanceReportSalesChannelGetListResponse {
  @Field(type => [BusinessOutletDailyFinanceReportSalesChannel])
  businessOutletDailyReportSalesChannels: BusinessOutletDailyFinanceReportSalesChannel[];

  @Field()
  summary: BusinessOutletDailyFinanceReportSalesChannelSummary;
}
