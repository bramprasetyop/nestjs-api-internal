import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessOutletDailyFinanceReport } from '../dto/businessOutletDailyFinanceReport.dto';
import { BusinessOutletDailyFinanceReportMapper } from '../mappers/businessOutletDailyFinanceReport.mapper';
import { BusinessOutletDailyFinanceReportRepository } from '../repositories/businessOutletDailyFinanceReport.repository';

@Injectable()
export class BusinessOutletDailyFinanceReportGetByIdUseCase
  implements IUseCase {
  constructor(
    private readonly repository: BusinessOutletDailyFinanceReportRepository
  ) {}

  async execute(id: string): Promise<BusinessOutletDailyFinanceReport> {
    const businessOutletDailyFinanceReportModel = await this.repository.findById(
      id
    );
    return BusinessOutletDailyFinanceReportMapper.modelToDTO(
      businessOutletDailyFinanceReportModel
    );
  }
}
