import { IUseCase } from 'src/commons/useCase.interface';
import { Business } from '../dto/business.dto';
import { BusinessMapper } from '../mappers/business.mapper';
import { BusinessRepository } from '../repositories/business.repository';
import { BusinessCreateRequest } from '../dto/businessCreateRequest.dto';
import { OrganizationRepository } from '../../organization/repositories/organization.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class BusinessCreateUseCase implements IUseCase {
  constructor(
    private readonly businessRepository: BusinessRepository,
    private readonly organizationRepository: OrganizationRepository
  ) {}
  async execute(dto: BusinessCreateRequest): Promise<Business> {
    const { organizationId } = dto;
    const organization = await this.organizationRepository.findById(
      organizationId
    );
    if (!organization) {
      throw new NotFoundException(organizationId);
    }
    const businessModel = await this.businessRepository.create(dto);
    return BusinessMapper.modelToDTO(businessModel);
  }
}
