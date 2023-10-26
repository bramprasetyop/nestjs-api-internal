import { OrganizationUserDailyFinanceReportModel } from '@wahyoo/wahyoo-shared';
import { OrganizationUserDailyFinanceReportGetListRequest } from '../dto/organizationUserDailyFinanceReportGetListRequest.dto';

export class PagingOrganizationUserDailyFinanceReportModel {
  organizationUserDailyFinanceReports: OrganizationUserDailyFinanceReportModel[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}

export interface IOrganizationUserDailyFinanceReportRepository {
  findAll(
    dto: OrganizationUserDailyFinanceReportGetListRequest
  ): Promise<PagingOrganizationUserDailyFinanceReportModel>;
  findById(id: string): Promise<OrganizationUserDailyFinanceReportModel>;
}
