import { Injectable, NotFoundException } from '@nestjs/common';
import {
  BusinessLeadStatus,
  BusinessLeadRequirementStatus
} from '@wahyoo/wahyoo-shared/dist/constants/enums';
import { BusinessLead } from '../dto/businessLead.dto';
import { IUseCase } from '../../../commons/useCase.interface';
import { BusinessLeadCreateRequest } from '../dto/businessLeadCreateRequest.dto';
import { BusinessLeadRepository } from '../repositories/businessLead.repository';
import { OrganizationUserRepository } from '../../user/repositories/organizationUser.repository';
import { BusinessLeadMapper } from '../mappers/businessLead.mapper';

@Injectable()
export class BusinessLeadCreateUseCase implements IUseCase {
  constructor(
    private readonly businessLeadRepository: BusinessLeadRepository,
    private readonly organizationUserRepository: OrganizationUserRepository
  ) {}
  async execute(dto: BusinessLeadCreateRequest): Promise<BusinessLead> {
    const { createdBy } = dto;

    dto.requirementStatus = BusinessLeadRequirementStatus.none;
    dto.status = BusinessLeadStatus.draft;

    if (createdBy) {
      const creator = await this.organizationUserRepository.findById(createdBy);
      if (!creator) {
        throw new NotFoundException(createdBy);
      }
      dto.createdBy = creator.id;
      dto.organizationId = creator.organizationId;
    }

    const businessLeadModel = await this.businessLeadRepository.create(dto);

    return BusinessLeadMapper.modelToDTO(businessLeadModel);
  }
}
