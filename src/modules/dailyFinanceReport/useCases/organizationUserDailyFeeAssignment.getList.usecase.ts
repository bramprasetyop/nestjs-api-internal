import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationUserRepository } from 'src/modules/user/repositories/organizationUser.repository';
import { BusinessOutletDailyFinanceReportGetListRequest } from '../dto/businessOutletDailyFinanceReportGetListRequest.dto';
import { BusinessOutletDailyFinanceReportGetListResponse } from '../dto/businessOutletDailyFinanceReportGetListResponse.dto';
import { OrganizationUserDailyFeeAssignmentGetListRequest } from '../dto/organizationUserDailyFeeAssignmentGetListRequest.dto';
import { OrganizationUserDailyFeeAssignmentGetListResponse } from '../dto/organizationUserDailyFeeAssignmentGetListResponse.dto';
import { BusinessOutletDailyFinanceReportMapper } from '../mappers/businessOutletDailyFinanceReport.mapper';
import { BusinessOutletDailyFinanceReportRepository } from '../repositories/businessOutletDailyFinanceReport.repository';
import { OrganizationUserDailyFeeAssignmentRepository } from '../repositories/organizationUserDailyFeeAssignment.repository';

@Injectable()
export class OrganizationUserDailyFeeAssignmentGetListUseCase
  implements IUseCase {
  constructor(
    private readonly organizationUserDailyFeeAssignmentRepository: OrganizationUserDailyFeeAssignmentRepository
  ) {}

  async execute(
    dto: OrganizationUserDailyFeeAssignmentGetListRequest
  ): Promise<OrganizationUserDailyFeeAssignmentGetListResponse> {
    const result = await this.organizationUserDailyFeeAssignmentRepository.findAll(
      dto
    );
    return {
      organizationUserDailyFeeAssignment:
        result.organizationUserDailyFeeAssignment,
      meta: result.meta
    };
  }
}
