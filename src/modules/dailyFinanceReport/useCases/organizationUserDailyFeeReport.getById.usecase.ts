import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationUserRole } from 'src/modules/auth/auth.constants';
import { ICurrentUserArgs } from 'src/modules/auth/repositories/currentUser.interface';
import { OrganizationUserDailyFeeReport } from '../dto/organizationUserDailyFeeReport.dto';
import { OrganizationUserDailyFeeReportMapper } from '../mappers/organizationUserDailyFeeReport.mapper';
import { OrganizationUserDailyFeeReportRepository } from '../repositories/organizationUserDailyFeeReport.repository';

@Injectable()
export class OrganizationUserDailyFeeReportGetByIdUseCase implements IUseCase {
  constructor(
    private readonly organizationUserDailyFeeReportRepository: OrganizationUserDailyFeeReportRepository
  ) {}

  private currentUser: ICurrentUserArgs;
  with(currentUser: ICurrentUserArgs) {
    this.currentUser = currentUser;
    return this;
  }

  async execute(id: string): Promise<OrganizationUserDailyFeeReport> {
    const organizationUserDailyFeeReportModel = await this.organizationUserDailyFeeReportRepository.findById(
      id
    );
    if (this.currentUser.roles.includes(OrganizationUserRole.OUTLET_OWNER)) {
      if (
        this.currentUser.id !==
        organizationUserDailyFeeReportModel.organizationUserId
      ) {
        throw Error('Invalid ID');
      }
    }
    return OrganizationUserDailyFeeReportMapper.modelToDTO(
      organizationUserDailyFeeReportModel
    );
  }
}
