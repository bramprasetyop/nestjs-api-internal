import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationUserBusinessGetListRequest } from '../dto/organizationUserBusinessGetListRequest.dto';
import { OrganizationUserBusinessGetListResponse } from '../dto/organizationUserBusinessGetListResponse.dto';
import { OrganizationUserBusinessMapper } from '../mappers/organizationUserBusiness.mapper';
import { OrganizationUserBusinessRepository } from '../repositories/organizationUserBusiness.repository';

@Injectable()
export class OrganizationUserBusinessGetListUseCase implements IUseCase {
  constructor(
    private readonly repository: OrganizationUserBusinessRepository
  ) {}
  async execute(
    dto: OrganizationUserBusinessGetListRequest
  ): Promise<OrganizationUserBusinessGetListResponse> {
    const result = await this.repository.findAll(dto);

    const response: OrganizationUserBusinessGetListResponse = {
      organizationUserBusinesses: OrganizationUserBusinessMapper.modelsToDTOs(
        result.organizationUserBusinesses
      ),
      meta: { ...result.meta }
    };

    return response;
  }
}
