import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessOutletCreateRequest } from '../dto/businessOutletCreateRequest.dto';
import { BusinessOutlet } from '../dto/businessOutlet.dto';
import { BusinessOutletRepository } from '../repositories/businessOutlet.repository';
import { BusinessOutletMapper } from '../mappers/businessOutlet.mapper';
import { BusinessRepository } from 'src/modules/business/repositories/business.repository';
import { OrganizationUserRepository } from 'src/modules/user/repositories/organizationUser.repository';

@Injectable()
export class BusinessOutletCreateUseCase implements IUseCase {
  constructor(
    private readonly businessOutletRepository: BusinessOutletRepository,
    private readonly businessRepository: BusinessRepository,
    private readonly organizationUserRepository: OrganizationUserRepository
  ) {}

  async getValidBusinessOutletCode() {
    // generate 4 letter alphanumeric code
    const code = Math.random()
      .toString(36)
      .substr(2, 4)
      .toUpperCase();
    const exists = await this.businessOutletRepository.findByCode(code);
    if (exists) {
      return this.getValidBusinessOutletCode();
    }
    return code;
  }

  async execute(dto: BusinessOutletCreateRequest): Promise<BusinessOutlet> {
    const { businessId, createdBy } = dto;
    const businessModel = await this.businessRepository.findById(businessId);
    if (!businessModel) {
      throw new NotFoundException(businessId);
    }
    if (createdBy) {
      const creator = await this.organizationUserRepository.findById(createdBy);
      if (!creator) {
        throw new Error(`Tidak dapat menemukan user ${createdBy}`);
      }
    }
    dto.updatedBy = createdBy;
    const code = await this.getValidBusinessOutletCode();
    dto.code = code;
    const businessOutletModel = await this.businessOutletRepository.create(dto);
    return BusinessOutletMapper.modelToDTO(businessOutletModel);
  }
}
