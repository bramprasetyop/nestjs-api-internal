import { Injectable, NotFoundException } from '@nestjs/common';
import { BusinessLeadStatus } from '@wahyoo/wahyoo-shared/dist/constants/enums';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessLeadRepository } from '../repositories/businessLead.repository';
import { OrganizationUserRepository } from 'src/modules/user/repositories/organizationUser.repository';
import { BusinessLeadMapper } from '../mappers/businessLead.mapper';
import { BusinessLead } from '../dto/businessLead.dto';
import { BusinessLeadClosedRequest } from '../dto/businessLeadClosedRequest.dto';

@Injectable()
export class BusinessLeadClosedUseCase implements IUseCase {
  constructor(
    private readonly businessLeadRepository: BusinessLeadRepository,
    private readonly organizationUserRepository: OrganizationUserRepository
  ) {}
  async execute(dto: BusinessLeadClosedRequest): Promise<BusinessLead> {
    const { id, closedBy } = dto;

    dto.status = BusinessLeadStatus.closed;

    const existingBusinessLead = await this.businessLeadRepository.findById(id);
    if (!existingBusinessLead) {
      throw new NotFoundException(id);
    }

    if (closedBy) {
      const creator = await this.organizationUserRepository.findById(closedBy);
      if (!creator) {
        throw new NotFoundException(closedBy);
      }
    }

    if (dto.status === BusinessLeadStatus.closed) {
      dto.closedBy = closedBy;
      dto.closedAt = new Date();
    }

    const businessLeadModel = await this.businessLeadRepository.closedById(dto);
    return BusinessLeadMapper.modelToDTO(businessLeadModel);
  }
}
