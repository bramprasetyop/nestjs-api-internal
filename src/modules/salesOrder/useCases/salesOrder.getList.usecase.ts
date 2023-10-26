import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationUserRole } from 'src/modules/auth/auth.constants';
import { ICurrentUserArgs } from 'src/modules/auth/repositories/currentUser.interface';
import { SalesOrderGetListRequest } from '../dto/salesOrderGetListRequest.dto';
import { SalesOrderGetListResponse } from '../dto/salesOrderGetListResponse.dto';
import { SalesOrderMapper } from '../mappers/salesOrder.mapper';
import { SalesOrderRepository } from '../repositories/salesOrder.repository';

@Injectable()
export class SalesOrderGetListUseCase implements IUseCase {
  constructor(private readonly repository: SalesOrderRepository) {}

  private currentUser: ICurrentUserArgs;
  with(currentUser: ICurrentUserArgs) {
    this.currentUser = currentUser;
    return this;
  }

  async execute(
    dto: SalesOrderGetListRequest
  ): Promise<SalesOrderGetListResponse> {
    const { filter, businessOutletId } = dto;
    if (
      this.currentUser.roles.includes(OrganizationUserRole.OUTLET_OWNER) ||
      this.currentUser.roles.includes(
        OrganizationUserRole.OUTLET_EMPLOYEE_ORDER
      )
    ) {
      if (
        businessOutletId &&
        !this.currentUser.businessOutletIds.includes(businessOutletId)
      ) {
        throw Error('Invalid businessOutletId');
      }

      if (
        filter.organizationUserId &&
        this.currentUser.id !== filter.organizationUserId
      ) {
        throw Error('Invalid organizationUserId');
      }
    }
    const result = await this.repository.findAll(dto);
    const response: SalesOrderGetListResponse = {
      salesOrders: SalesOrderMapper.modelsToDTOs(result.salesOrders),
      meta: { ...result.meta }
    };
    return response;
  }
}
