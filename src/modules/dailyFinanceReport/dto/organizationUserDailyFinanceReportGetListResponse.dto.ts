import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { OrganizationUserDailyFinanceReport } from './organizationUserDailyFinanceReport.dto';

@ObjectType()
export class OrganizationUserDailyFinanceReportGetListResponse {
  @Field(type => [OrganizationUserDailyFinanceReport])
  organizationUserDailyFinanceReports: OrganizationUserDailyFinanceReport[];

  @Field()
  meta: PaginationMeta;
}
