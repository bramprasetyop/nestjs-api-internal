import { OrganizationUserDailyFeeReportModel } from '@wahyoo/wahyoo-shared';

export interface IOrganizationUserDailyFeeReportRepository {
  findById(id: string): Promise<OrganizationUserDailyFeeReportModel>;
  findByDays(days: string[]): Promise<OrganizationUserDailyFeeReportModel[]>;
}
