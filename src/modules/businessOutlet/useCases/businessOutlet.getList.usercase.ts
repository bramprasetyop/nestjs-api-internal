import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import {
  OrganizationUserLevel,
  OrganizationUserRole
} from 'src/modules/auth/auth.constants';
import { ICurrentUserArgs } from 'src/modules/auth/repositories/currentUser.interface';
import { BusinessOutletGetListRequest } from '../dto/businessOutletGetListRequest.dto';
import { BusinessOutletGetListResponse } from '../dto/businessOutletGetListResponse.dto';
import { BusinessOutletMapper } from '../mappers/businessOutlet.mapper';
import { BusinessOutletRepository } from '../repositories/businessOutlet.repository';

@Injectable()
export class BusinessOutletGetListUseCase implements IUseCase {
  constructor(private readonly repository: BusinessOutletRepository) {}

  private currentUser: ICurrentUserArgs;
  with(currentUser: ICurrentUserArgs) {
    this.currentUser = currentUser;
    return this;
  }
  async execute(
    dto: BusinessOutletGetListRequest
  ): Promise<BusinessOutletGetListResponse> {
    if (
      this.currentUser.organizationLevel === OrganizationUserLevel.OUTLET &&
      this.currentUser.roles.includes(OrganizationUserRole.OUTLET_OWNER)
    ) {
      dto.businessOutletIds = this.currentUser.businessOutletIds;
    }

    if (this.currentUser.organizationLevel === OrganizationUserLevel.BUSINESS) {
      dto.businessOutletIds = null;
    }

    const result = await this.repository.findAll(dto);
    const response: BusinessOutletGetListResponse = {
      businessOutlets: BusinessOutletMapper.modelsToDTOs(
        result.businessOutlets
      ),
      meta: { ...result.meta }
    };
    return response;
  }
}
