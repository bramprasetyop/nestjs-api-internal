import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import {
  OrganizationUserRole,
  OrganizationUserLevel
} from 'src/modules/auth/auth.constants';
import { ICurrentUserArgs } from 'src/modules/auth/repositories/currentUser.interface';
import { SalesOrderReportByMenuItemResponse } from '../dto/salesOrderReportListByMenuItemResponse.dto';
import { SalesOrderReportByMenuItemRequest } from '../dto/salesOrderReportListByMenuItemRequest.dto';
import { SalesOrderReportRepository } from '../repositories/salesOrderReport.repository';

@Injectable()
export class SalesOrderReportGetReportListByMenuItemUseCase
  implements IUseCase {
  constructor(private readonly repository: SalesOrderReportRepository) {}

  private currentUser: ICurrentUserArgs;
  with(currentUser: ICurrentUserArgs) {
    this.currentUser = currentUser;
    return this;
  }

  async execute(
    dto: SalesOrderReportByMenuItemRequest
  ): Promise<SalesOrderReportByMenuItemResponse> {
    const { businessOutletId } = dto;
    if (
      this.currentUser.organizationLevel === OrganizationUserLevel.OUTLET &&
      this.currentUser.roles.includes(OrganizationUserRole.OUTLET_OWNER)
    ) {
      if (businessOutletId) {
        if (!this.currentUser.businessOutletIds.includes(businessOutletId)) {
          throw Error('Invalid businessOutletId');
        }
      }
    }
    const response = await this.repository.getReportListByMenuItem(dto);
    return response;
  }
}
