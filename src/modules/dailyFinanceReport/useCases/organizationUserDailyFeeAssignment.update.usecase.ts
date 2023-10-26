import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationUserRepository } from 'src/modules/user/repositories/organizationUser.repository';
import { BusinessOutletDailyFinanceReportGetListRequest } from '../dto/businessOutletDailyFinanceReportGetListRequest.dto';
import { BusinessOutletDailyFinanceReportGetListResponse } from '../dto/businessOutletDailyFinanceReportGetListResponse.dto';
import { OrganizationUserDailyFeeAssignment } from '../dto/organizationUserDailyFeeAssignment.dto';
import { OrganizationUserDailyFeeAssignmentGetListRequest } from '../dto/organizationUserDailyFeeAssignmentGetListRequest.dto';
import { OrganizationUserDailyFeeAssignmentGetListResponse } from '../dto/organizationUserDailyFeeAssignmentGetListResponse.dto';
import { OrganizationUserDailyFeeAssignmentUpdateRequest } from '../dto/organizationUserDailyFeeAssignmentUpdateRequest.dto';
import { BusinessOutletDailyFinanceReportMapper } from '../mappers/businessOutletDailyFinanceReport.mapper';
import { BusinessOutletDailyFinanceReportRepository } from '../repositories/businessOutletDailyFinanceReport.repository';
import { OrganizationUserDailyFeeAssignmentRepository } from '../repositories/organizationUserDailyFeeAssignment.repository';

@Injectable()
export class OrganizationUserDailyFeeAssignmentUpdateUseCase
  implements IUseCase {
  constructor(
    private readonly organizationUserDailyFeeAssignmentRepository: OrganizationUserDailyFeeAssignmentRepository
  ) {}

  async execute(
    dto: OrganizationUserDailyFeeAssignmentUpdateRequest
  ): Promise<OrganizationUserDailyFeeAssignment> {
    return this.organizationUserDailyFeeAssignmentRepository.update(dto);
  }
}
