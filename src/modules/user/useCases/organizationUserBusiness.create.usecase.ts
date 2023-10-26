import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationUserRepository } from 'src/modules/user/repositories/organizationUser.repository';
import { OrganizationUserBusinessRepository } from '../repositories/organizationUserBusiness.repository';
import { OrganizationUserBusinessCreateRequest } from '../dto/organizationUserBusinessCreateRequest.dto';
import { OrganizationUserBusiness } from '../dto/organizationUserBusiness.dto';
import { OrganizationUserBusinessMapper } from '../mappers/organizationUserBusiness.mapper';

@Injectable()
export class OrganizationUserBusinessCreateUseCase implements IUseCase {
  constructor(
    private readonly repository: OrganizationUserBusinessRepository,
    private readonly organizationUserRepository: OrganizationUserRepository
  ) {}

  async execute(
    dto: OrganizationUserBusinessCreateRequest
  ): Promise<OrganizationUserBusiness> {
    const { createdBy } = dto;
    if (createdBy) {
      const creator = await this.organizationUserRepository.findById(createdBy);
      if (!creator) {
        throw new Error(`Tidak dapat menemukan user ${createdBy}`);
      }
    }
    dto.updatedBy = createdBy;
    const businessModel = await this.repository.create(dto);
    return OrganizationUserBusinessMapper.modelToDTO(businessModel);
  }
}
