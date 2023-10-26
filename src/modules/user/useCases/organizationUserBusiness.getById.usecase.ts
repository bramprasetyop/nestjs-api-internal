import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationUserBusiness } from '../dto/organizationUserBusiness.dto';
import { OrganizationUserBusinessMapper } from '../mappers/organizationUserBusiness.mapper';
import { OrganizationUserBusinessRepository } from '../repositories/organizationUserBusiness.repository';

@Injectable()
export class OrganizationUserBusinessGetByIdUseCase implements IUseCase {
  constructor(
    private readonly repository: OrganizationUserBusinessRepository
  ) {}
  async execute(id: string): Promise<OrganizationUserBusiness> {
    const organizationUserBusiness = await this.repository.findById(id);
    if (!organizationUserBusiness) {
      throw new NotFoundException(id);
    }
    return OrganizationUserBusinessMapper.modelToDTO(organizationUserBusiness);
  }
}
