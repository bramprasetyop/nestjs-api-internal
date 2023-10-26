import { OrganizationUserDailyFinanceReportModel } from '@wahyoo/wahyoo-shared';
import { OrganizationUserDailyFinanceReport } from '../dto/organizationUserDailyFinanceReport.dto';

export class OrganizationUserDailyFinanceReportMapper {
  public static modelToDTO(
    model: OrganizationUserDailyFinanceReportModel
  ): OrganizationUserDailyFinanceReport {
    return new OrganizationUserDailyFinanceReport(model);
  }

  public static modelsToDTOs(
    models: OrganizationUserDailyFinanceReportModel[]
  ): OrganizationUserDailyFinanceReport[] {
    return models.map(model =>
      OrganizationUserDailyFinanceReportMapper.modelToDTO(model)
    );
  }
}
