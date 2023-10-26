import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationUserRole } from 'src/modules/auth/auth.constants';
import { ICurrentUserArgs } from 'src/modules/auth/repositories/currentUser.interface';
import { OrganizationUserDailyFinanceReport } from '../dto/organizationUserDailyFinanceReport.dto';
import { OrganizationUserDailyFinanceReportMapper } from '../mappers/organizationUserDailyFinanceReport.mapper';
import { OrganizationUserDailyFinanceReportRepository } from '../repositories/organizationUserDailyFinanceReport.repository';

@Injectable()
export class OrganizationUserDailyFinanceReportGetByIdUseCase
  implements IUseCase {
  constructor(
    private readonly organizationUserDailyFinanceReportRepository: OrganizationUserDailyFinanceReportRepository
  ) {}

  private currentUser: ICurrentUserArgs;
  with(currentUser: ICurrentUserArgs) {
    this.currentUser = currentUser;
    return this;
  }

  async execute(id: string): Promise<OrganizationUserDailyFinanceReport> {
    const organizationUserDailyFinanceReportModel = await this.organizationUserDailyFinanceReportRepository.findById(
      id
    );
    if (this.currentUser.roles.includes(OrganizationUserRole.OUTLET_OWNER)) {
      if (
        this.currentUser.id !==
        organizationUserDailyFinanceReportModel.organizationUserId
      ) {
        throw Error('Invalid ID');
      }
    }
    return OrganizationUserDailyFinanceReportMapper.modelToDTO(
      organizationUserDailyFinanceReportModel
    );
  }
}
