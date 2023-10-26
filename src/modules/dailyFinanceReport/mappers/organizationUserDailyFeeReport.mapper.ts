import { OrganizationUserDailyFeeReportModel } from '@wahyoo/wahyoo-shared';
import { OrganizationUserDailyFeeReport } from '../dto/organizationUserDailyFeeReport.dto';

export class OrganizationUserDailyFeeReportMapper {
  public static modelToDTO(
    model: OrganizationUserDailyFeeReportModel
  ): OrganizationUserDailyFeeReport {
    return new OrganizationUserDailyFeeReport(model);
  }

  public static modelsToDTOs(
    models: OrganizationUserDailyFeeReportModel[]
  ): OrganizationUserDailyFeeReport[] {
    return models.map(model =>
      OrganizationUserDailyFeeReportMapper.modelToDTO(model)
    );
  }
}
