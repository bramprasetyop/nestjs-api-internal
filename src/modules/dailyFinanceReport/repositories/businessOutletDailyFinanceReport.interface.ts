import { BusinessOutletDailyFinanceReportModel } from '@wahyoo/wahyoo-shared';
import { BusinessOutletDailyFinanceReportGetListRequest } from '../dto/businessOutletDailyFinanceReportGetListRequest.dto';

export class PagingBusinessOutletDailyFinanceReportModel {
  businessOutletDailyFinanceReports: BusinessOutletDailyFinanceReportModel[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}

export interface IBusinessOutletDailyFinanceReportRepository {
  findAll(
    dto: BusinessOutletDailyFinanceReportGetListRequest
  ): Promise<PagingBusinessOutletDailyFinanceReportModel>;
  findById(id: string): Promise<BusinessOutletDailyFinanceReportModel>;
}
