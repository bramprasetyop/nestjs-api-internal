import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessOutletDailyFinanceReportMenuItemGetListRequest } from '../dto/businessOutletDailyFinanceReportMenuItemGetListRequest.dto';
import { BusinessOutletDailyFinanceReportMenuItemGetListResponse } from '../dto/businessOutletDailyFinanceReportMenuItemGetListResponse.dto';
import { BusinessOutletDailyFinanceReportRepository } from '../repositories/businessOutletDailyFinanceReport.repository';

@Injectable()
export class BusinessOutletDailyFinanceReportGetReportListByMenuItemUseCase
  implements IUseCase {
  constructor(
    private readonly repository: BusinessOutletDailyFinanceReportRepository
  ) {}

  async execute(
    dto: BusinessOutletDailyFinanceReportMenuItemGetListRequest
  ): Promise<BusinessOutletDailyFinanceReportMenuItemGetListResponse> {
    const response = await this.repository.getReportListByMenuItem(dto);

    return response;
  }
}
