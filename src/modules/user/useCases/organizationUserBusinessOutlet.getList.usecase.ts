import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationUserBusinessOutletGetListRequest } from '../dto/organizationUserBusinessOutletGetListRequest.dto';
import { OrganizationUserBusinessOutletGetListResponse } from '../dto/organizationUserBusinessOutletGetListResponse.dto';
import { OrganizationUserBusinessOutletMapper } from '../mappers/organizationUserBusinessOutlet.mapper';
import { OrganizationUserBusinessOutletRepository } from '../repositories/organizationUserBusinessOutlet.repository';

@Injectable()
export class OrganizationUserBusinessOutletGetListUseCase implements IUseCase {
  constructor(
    private readonly repository: OrganizationUserBusinessOutletRepository
  ) {}
  async execute(
    dto: OrganizationUserBusinessOutletGetListRequest
  ): Promise<OrganizationUserBusinessOutletGetListResponse> {
    const result = await this.repository.findAll(dto);

    const response: OrganizationUserBusinessOutletGetListResponse = {
      organizationUserBusinessOutlets: OrganizationUserBusinessOutletMapper.modelsToDTOs(
        result.organizationUserBusinessOutlets
      ),
      meta: { ...result.meta }
    };

    return response;
  }
}
