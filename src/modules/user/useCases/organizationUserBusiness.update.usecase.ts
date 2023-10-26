import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationUserRepository } from 'src/modules/user/repositories/organizationUser.repository';
import { OrganizationUserBusinessRepository } from '../repositories/organizationUserBusiness.repository';
import { OrganizationUserBusiness } from '../dto/organizationUserBusiness.dto';
import { OrganizationUserBusinessMapper } from '../mappers/organizationUserBusiness.mapper';
import { OrganizationUserBusinessUpdateRequest } from '../dto/organizationUserBusinessUpdateRequest.dto';

@Injectable()
export class OrganizationUserBusinessUpdateUseCase implements IUseCase {
  constructor(
    private readonly repository: OrganizationUserBusinessRepository,
    private readonly organizationUserRepository: OrganizationUserRepository
  ) {}

  async execute(
    dto: OrganizationUserBusinessUpdateRequest
  ): Promise<OrganizationUserBusiness> {
    const { id, updatedBy } = dto;
    const organizationUserBusiness = await this.repository.findById(id);
    if (!organizationUserBusiness) {
      throw new NotFoundException(id);
    }
    if (updatedBy) {
      const modifier = await this.organizationUserRepository.findById(
        updatedBy
      );
      if (!modifier) {
        throw new Error(`Tidak dapat menemukan user ${updatedBy}`);
      }
    }
    const businessModel = await this.repository.update(dto);
    return OrganizationUserBusinessMapper.modelToDTO(businessModel);
  }
}
