import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationGetListRequest } from '../dto/organizationGetListRequest.dto';
import { OrganizationGetListResponse } from '../dto/organizationGetListResponse.dto';
import { OrganizationMapper } from '../mappers/organization.mapper';
import { OrganizationRepository } from '../repositories/organization.repository';

@Injectable()
export class OrganizationGetListUseCase implements IUseCase {
  constructor(private readonly repository: OrganizationRepository) {}
  async execute(
    dto: OrganizationGetListRequest
  ): Promise<OrganizationGetListResponse> {
    const result = await this.repository.findAll(dto);

    const response: OrganizationGetListResponse = {
      organizations: OrganizationMapper.modelsToDTOs(result.organizations),
      meta: { ...result.meta }
    };
    return response;
  }
}
