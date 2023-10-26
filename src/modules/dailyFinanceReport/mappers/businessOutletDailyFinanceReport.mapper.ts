import { BusinessOutletDailyFinanceReportModel } from '@wahyoo/wahyoo-shared';
import { BusinessOutletDailyFinanceReport } from '../dto/businessOutletDailyFinanceReport.dto';

export class BusinessOutletDailyFinanceReportMapper {
  public static modelToDTO(
    model: BusinessOutletDailyFinanceReportModel
  ): BusinessOutletDailyFinanceReport {
    return new BusinessOutletDailyFinanceReport(model);
  }

  public static modelsToDTOs(
    models: BusinessOutletDailyFinanceReportModel[]
  ): BusinessOutletDailyFinanceReport[] {
    return models.map(model =>
      BusinessOutletDailyFinanceReportMapper.modelToDTO(model)
    );
  }
}
