import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationRepository } from '../repositories/organization.repository';
import { OrganizationMapper } from '../mappers/organization.mapper';
import { Organization } from '../dto/organization.dto';

@Injectable()
export class OrganizationGetByIdUseCase implements IUseCase {
  constructor(private readonly repository: OrganizationRepository) {}
  async execute(id: string): Promise<Organization> {
    const organizationModel = await this.repository.findById(id);
    if (!organizationModel) {
      throw new NotFoundException(id);
    }
    return OrganizationMapper.modelToDTO(organizationModel);
  }
}
