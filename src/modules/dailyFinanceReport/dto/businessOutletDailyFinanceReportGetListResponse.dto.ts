import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { BusinessOutletDailyFinanceReport } from './businessOutletDailyFinanceReport.dto';

@ObjectType()
export class BusinessOutletDailyFinanceReportGetListResponse {
  @Field(type => [BusinessOutletDailyFinanceReport])
  businessOutletDailyFinanceReports: BusinessOutletDailyFinanceReport[];

  @Field()
  meta: PaginationMeta;
}
