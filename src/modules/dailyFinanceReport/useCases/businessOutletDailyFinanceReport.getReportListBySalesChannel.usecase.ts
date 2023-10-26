import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessOutletDailyFinanceReportSalesChannelGetListRequest } from '../dto/businessOutletDailyFinanceReportSalesChannelGetListRequest.dto';
import { BusinessOutletDailyFinanceReportSalesChannelGetListResponse } from '../dto/businessOutletDailyFinanceReportSalesChannelGetListResponse.dto';
import { BusinessOutletDailyFinanceReportRepository } from '../repositories/businessOutletDailyFinanceReport.repository';

@Injectable()
export class BusinessOutletDailyFinanceReportGetReportListBySalesChannelUseCase
  implements IUseCase {
  constructor(
    private readonly repository: BusinessOutletDailyFinanceReportRepository
  ) {}

  async execute(
    dto: BusinessOutletDailyFinanceReportSalesChannelGetListRequest
  ): Promise<BusinessOutletDailyFinanceReportSalesChannelGetListResponse> {
    const response = await this.repository.getReportListBySalesChannel(dto);

    return response;
  }
}
