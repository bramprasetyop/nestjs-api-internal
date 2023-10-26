import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationUserRepository } from '../repositories/organizationUser.repository';
import { OrganizationUserDeleteOutletEmployeeRequest } from '../dto/organizationUserDeleteOutletEmployeeRequest.dto';
@Injectable()
export class OrganizationUserDeleteOutletEmployeeUseCase implements IUseCase {
  constructor(
    private readonly organizationUserRepository: OrganizationUserRepository
  ) {}
  async execute(
    dto: OrganizationUserDeleteOutletEmployeeRequest
  ): Promise<Boolean> {
    const { id, deletedBy } = dto;
    const outletEmployee = await this.organizationUserRepository.findOutletEmployee(
      { id, currentUserId: deletedBy }
    );
    if (!outletEmployee) {
      throw new NotFoundException(id);
    }

    const organizationUser = await this.organizationUserRepository.findById(id);
    if (!organizationUser) {
      throw new Error('Organization user tidak dapat ditemukan');
    }

    return this.organizationUserRepository.deleteOutletEmployee(id);
  }
}
