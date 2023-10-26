import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationUserRepository } from '../repositories/organizationUser.repository';
import { OrganizationUserCreateOutletEmployeeRequest } from '../dto/organizationUserCreateOutletEmployeeRequest.dto';
import { OrganizationUser } from '../dto/user.dto';
import { UserMapper } from '../mappers/user.mapper';
import { OrganizationUserModel } from '@wahyoo/wahyoo-shared';

@Injectable()
export class OrganizationUserCreateOutletEmployeeUseCase implements IUseCase {
  constructor(
    private readonly organizationUserRepository: OrganizationUserRepository
  ) {}
  async execute(
    dto: OrganizationUserCreateOutletEmployeeRequest
  ): Promise<OrganizationUser> {
    const { createdBy } = dto;
    if (createdBy) {
      const creator = await this.organizationUserRepository.findById(createdBy);
      if (!creator) {
        throw new Error(`Tidak dapat menemukan user ${createdBy}`);
      }
    }
    dto.updatedBy = createdBy;

    const organizationUserModel = await this.organizationUserRepository.createOutletEmployee(
      dto
    );
    return UserMapper.modelToDTO(organizationUserModel);
  }
}
