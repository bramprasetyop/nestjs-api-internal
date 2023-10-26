import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { ICurrentUserArgs } from 'src/modules/auth/repositories/currentUser.interface';
import { MyOrganizationUserDailyFinanceReportGetListRequest } from '../dto/myOrganizationUserDailyFinanceReportGetListRequest.dto';
import { OrganizationUserDailyFinanceReportGetListResponse } from '../dto/organizationUserDailyFinanceReportGetListResponse.dto';
import { OrganizationUserDailyFinanceReportMapper } from '../mappers/organizationUserDailyFinanceReport.mapper';
import { OrganizationUserDailyFinanceReportRepository } from '../repositories/organizationUserDailyFinanceReport.repository';

@Injectable()
export class MyOrganizationUserDailyFinanceReportGetListUseCase
  implements IUseCase {
  constructor(
    private readonly repository: OrganizationUserDailyFinanceReportRepository
  ) {}

  private currentUser: ICurrentUserArgs;
  with(currentUser: ICurrentUserArgs) {
    this.currentUser = currentUser;
    return this;
  }
  async execute(
    dto: MyOrganizationUserDailyFinanceReportGetListRequest
  ): Promise<OrganizationUserDailyFinanceReportGetListResponse> {
    if (!dto.filter) {
      dto.filter = {};
    }
    dto.filter.organizationUserId = this.currentUser.id;
    const result = await this.repository.findAll(dto);
    const response: OrganizationUserDailyFinanceReportGetListResponse = {
      organizationUserDailyFinanceReports: OrganizationUserDailyFinanceReportMapper.modelsToDTOs(
        result.organizationUserDailyFinanceReports
      ),
      meta: { ...result.meta }
    };
    return response;
  }
}
