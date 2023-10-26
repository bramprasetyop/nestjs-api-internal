import {
  BusinessLeadStatus,
  BusinessLeadRequirementStatus
} from '@wahyoo/wahyoo-shared/dist/constants/enums';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from '../../../commons/useCase.interface';
import { BusinessLeadRepository } from '../repositories/businessLead.repository';
import { OrganizationUserRepository } from '../../user/repositories/organizationUser.repository';
import { BusinessLeadMapper } from '../mappers/businessLead.mapper';
import { BusinessLead } from '../dto/businessLead.dto';
import { BusinessLeadUpdateRequest } from '../dto/businessLeadUpdateRequest.dto';

@Injectable()
export class BusinessLeadUpdateAsDraftUseCase implements IUseCase {
  constructor(
    private readonly businessLeadRepository: BusinessLeadRepository,
    private readonly organizationUserRepository: OrganizationUserRepository
  ) {}
  async execute(dto: BusinessLeadUpdateRequest): Promise<BusinessLead> {
    const { updatedBy } = dto;

    dto.requirementStatus = BusinessLeadRequirementStatus.none;
    dto.status = BusinessLeadStatus.draft;

    if (updatedBy) {
      const creator = await this.organizationUserRepository.findById(updatedBy);
      if (!creator) {
        throw new NotFoundException(updatedBy);
      }
      dto.updatedBy = creator.id;
      dto.organizationId = creator.organizationId;
    }

    const businessLeadModel = await this.businessLeadRepository.updateAsDraft(
      dto
    );
    return BusinessLeadMapper.modelToDTO(businessLeadModel);
  }
}
