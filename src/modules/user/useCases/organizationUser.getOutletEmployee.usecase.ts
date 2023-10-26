import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationUser } from '../dto/user.dto';
import { UserMapper } from '../mappers/user.mapper';
import { OrganizationUserRepository } from '../repositories/organizationUser.repository';
import { OrganizationUserGetDetailRequest } from '../dto/organizationUserGetDetailRequest.dto';

@Injectable()
export class OrganizationUserGetOutletEmployeeUseCase implements IUseCase {
  constructor(private readonly repository: OrganizationUserRepository) {}
  async execute(
    dto: OrganizationUserGetDetailRequest
  ): Promise<OrganizationUser> {
    const organizationUser = await this.repository.findOutletEmployee(dto);
    if (!organizationUser) {
      throw new NotFoundException(dto.id);
    }
    return UserMapper.modelToDTO(organizationUser);
  }
}
