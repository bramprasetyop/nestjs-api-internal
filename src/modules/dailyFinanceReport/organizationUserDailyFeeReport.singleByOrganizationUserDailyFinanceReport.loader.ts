import DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'src/commons/loader';
import { OrganizationUserDailyFeeReport } from './dto/organizationUserDailyFeeReport.dto';
import { OrganizationUserDailyFinanceReport } from './dto/organizationUserDailyFinanceReport.dto';
import { OrganizationUserDailyFeeReportRepository } from './repositories/organizationUserDailyFeeReport.repository';
import { OrganizationUserDailyFeeReportModel } from '@wahyoo/wahyoo-shared';
import { OrganizationUserDailyFeeReportMapper } from './mappers/organizationUserDailyFeeReport.mapper';

@Injectable()
export class OrganizationUserDailyFeeReportSingleByOrganizationUserDailyFinanceReportLoader
  implements
    NestDataLoader<
      OrganizationUserDailyFinanceReport,
      OrganizationUserDailyFeeReport
    > {
  constructor(
    private readonly repository: OrganizationUserDailyFeeReportRepository
  ) {}
  generateDataLoader(): DataLoader<
    OrganizationUserDailyFinanceReport,
    OrganizationUserDailyFeeReport
  > {
    return new DataLoader<
      OrganizationUserDailyFinanceReport,
      OrganizationUserDailyFeeReport
    >(async keys => {
      const days = keys.map(key => key.day);
      const organizationUserDailyFeeReportModels: OrganizationUserDailyFeeReportModel[] = await this.repository.findByDays(
        days as string[]
      );
      const organizationUserDailyFeeReportList = OrganizationUserDailyFeeReportMapper.modelsToDTOs(
        organizationUserDailyFeeReportModels
      );
      return keys.map(key =>
        organizationUserDailyFeeReportList.find(
          organizationUserDailyFeeReport =>
            organizationUserDailyFeeReport.organizationUserId ===
              key.organizationUserId &&
            organizationUserDailyFeeReport.day === key.day
        )
      );
    });
  }
}
