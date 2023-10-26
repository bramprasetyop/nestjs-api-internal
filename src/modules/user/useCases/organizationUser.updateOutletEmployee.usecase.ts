import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationUserRepository } from '../repositories/organizationUser.repository';
import { OrganizationUser } from '../dto/user.dto';
import { UserMapper } from '../mappers/user.mapper';
import { OrganizationUserUpdateOutletEmployeeRequest } from '../dto/organizationUserUpdateOutletEmployeeRequest.dto';

@Injectable()
export class OrganizationUserUpdateOutletEmployeeUseCase implements IUseCase {
  constructor(
    private readonly organizationUserRepository: OrganizationUserRepository
  ) {}

  async execute(
    dto: OrganizationUserUpdateOutletEmployeeRequest
  ): Promise<OrganizationUser> {
    const { id, updatedBy } = dto;
    const outletEmployee = await this.organizationUserRepository.findOutletEmployee(
      { id, currentUserId: updatedBy }
    );
    if (!outletEmployee) {
      throw new NotFoundException(id);
    }

    const organizationUserModel = await this.organizationUserRepository.updateOutletEmployee(
      dto
    );
    return UserMapper.modelToDTO(organizationUserModel);
  }
}
