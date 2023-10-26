import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessOutletUpdateRequest } from '../dto/businessOutletUpdateRequest.dto';
import { BusinessOutlet } from '../dto/businessOutlet.dto';
import { BusinessOutletMapper } from '../mappers/businessOutlet.mapper';
import { BusinessRepository } from 'src/modules/business/repositories/business.repository';
import { BusinessOutletRepository } from '../repositories/businessOutlet.repository';
import { OrganizationUserRepository } from 'src/modules/user/repositories/organizationUser.repository';

@Injectable()
export class BusinessOutletUpdateUseCase implements IUseCase {
  constructor(
    private readonly businessOutletRepository: BusinessOutletRepository,
    private readonly businessRepository: BusinessRepository,
    private readonly organizationUserRepository: OrganizationUserRepository
  ) {}
  async execute(dto: BusinessOutletUpdateRequest): Promise<BusinessOutlet> {
    const { id, businessId, updatedBy } = dto;
    if (updatedBy) {
      const modifier = await this.organizationUserRepository.findById(
        updatedBy
      );
      if (!modifier) {
        throw new Error(`Tidak dapat menemukan user ${updatedBy}`);
      }
    }
    const businessOutletModel = this.businessOutletRepository.findById(id);
    if (!businessOutletModel) {
      throw new Error(`Tidak dapat menemukan business outlet ${id}`);
    }
    const businessModel = await this.businessRepository.findById(businessId);
    if (!businessModel) {
      throw new Error(`Tidak dapat menemukan business ${businessId}`);
    }
    const updatedBusinessOutletModel = await this.businessOutletRepository.update(
      dto
    );
    return BusinessOutletMapper.modelToDTO(updatedBusinessOutletModel);
  }
}
