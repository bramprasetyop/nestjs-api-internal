import { Business } from '../dto/business.dto';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessMapper } from '../mappers/business.mapper';
import { BusinessRepository } from '../repositories/business.repository';
import { BusinessUpdateRequest } from '../dto/businessUpdateRequest.dto';
import { OrganizationRepository } from '../../organization/repositories/organization.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class BusinessUpdateUseCase implements IUseCase {
  constructor(
    private readonly businessRepository: BusinessRepository,
    private readonly organizationRepository: OrganizationRepository
  ) {}
  async execute(dto: BusinessUpdateRequest): Promise<Business> {
    const { id, organizationId } = dto;
    const businessModel = await this.businessRepository.findById(id);
    if (!businessModel) {
      throw new NotFoundException(id);
    }

    const organization = await this.organizationRepository.findById(
      organizationId
    );
    if (!organization) {
      throw new NotFoundException(organizationId);
    }
    const updatedBusiness = await this.businessRepository.update(dto);
    return BusinessMapper.modelToDTO(updatedBusiness);
  }
}
