import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessOutletDailyFinanceReportGetListRequest } from '../dto/businessOutletDailyFinanceReportGetListRequest.dto';
import { BusinessOutletDailyFinanceReportGetListResponse } from '../dto/businessOutletDailyFinanceReportGetListResponse.dto';
import { BusinessOutletDailyFinanceReportMapper } from '../mappers/businessOutletDailyFinanceReport.mapper';
import { BusinessOutletDailyFinanceReportRepository } from '../repositories/businessOutletDailyFinanceReport.repository';

@Injectable()
export class BusinessOutletDailyFinanceReportGetListUseCase
  implements IUseCase {
  constructor(
    private readonly repository: BusinessOutletDailyFinanceReportRepository
  ) {}

  async execute(
    dto: BusinessOutletDailyFinanceReportGetListRequest
  ): Promise<BusinessOutletDailyFinanceReportGetListResponse> {
    const result = await this.repository.findAll(dto);
    const response: BusinessOutletDailyFinanceReportGetListResponse = {
      businessOutletDailyFinanceReports: BusinessOutletDailyFinanceReportMapper.modelsToDTOs(
        result.businessOutletDailyFinanceReports
      ),
      meta: { ...result.meta }
    };
    return response;
  }
}
