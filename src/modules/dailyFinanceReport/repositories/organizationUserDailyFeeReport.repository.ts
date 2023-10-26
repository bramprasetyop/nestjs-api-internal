import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import {
  InjectionKey,
  OrganizationUserDailyFeeReportModel,
  OrganizationUserDailyFinanceReportModel
} from '@wahyoo/wahyoo-shared';
import { IOrganizationUserDailyFeeReportRepository } from './organizationUserDailyFeeReport.interface';

@Injectable()
export class OrganizationUserDailyFeeReportRepository
  implements IOrganizationUserDailyFeeReportRepository {
  constructor(
    @Inject(InjectionKey.ORGANIZATION_USER_DAILY_FEE_REPORT_MODEL)
    private readonly organizationUserDailyFeeReportModel: typeof OrganizationUserDailyFeeReportModel
  ) {}
  async findById(id: string): Promise<OrganizationUserDailyFeeReportModel> {
    return this.organizationUserDailyFeeReportModel.findByPk(id);
  }
  async findByDays(
    days: string[]
  ): Promise<OrganizationUserDailyFeeReportModel[]> {
    return this.organizationUserDailyFeeReportModel.findAll({
      where: {
        day: {
          [Op.in]: days
        }
      }
    });
  }
}
