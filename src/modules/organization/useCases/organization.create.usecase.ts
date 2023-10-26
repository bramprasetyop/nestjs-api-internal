import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationModel } from '@wahyoo/wahyoo-shared';
import { OrganizationCreateRequest } from '../dto/organizationCreateRequest.dto';
import { OrganizationRepository } from '../repositories/organization.repository';
import { OrganizationMapper } from '../mappers/organization.mapper';
import { Organization } from '../dto/organization.dto';

@Injectable()
export class OrganizationCreateUseCase implements IUseCase {
  constructor(private readonly repository: OrganizationRepository) {}
  async execute(dto: OrganizationCreateRequest): Promise<Organization> {
    const organizationModel = await this.repository.create(dto);
    return OrganizationMapper.modelToDTO(organizationModel);
  }
}
