import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationUserRepository } from 'src/modules/user/repositories/organizationUser.repository';
import { OrganizationUserBusinessOutletRepository } from '../repositories/organizationUserBusinessOutlet.repository';
import { OrganizationUserBusinessOutletCreateRequest } from '../dto/organizationUserBusinessOutletCreateRequest.dto';
import { OrganizationUserBusinessOutlet } from '../dto/organizationUserBusinessOutlet.dto';
import { OrganizationUserBusinessOutletMapper } from '../mappers/organizationUserBusinessOutlet.mapper';
import { BusinessOutletRepository } from 'src/modules/businessOutlet/repositories/businessOutlet.repository';

@Injectable()
export class OrganizationUserBusinessOutletCreateUseCase implements IUseCase {
  constructor(
    private readonly repository: OrganizationUserBusinessOutletRepository,
    private readonly organizationUserRepository: OrganizationUserRepository,
    private readonly businessOutletRepository: BusinessOutletRepository
  ) {}

  async execute(
    dto: OrganizationUserBusinessOutletCreateRequest
  ): Promise<OrganizationUserBusinessOutlet> {
    const { createdBy, businessOutletId } = dto;
    if (createdBy) {
      const creator = await this.organizationUserRepository.findById(createdBy);
      if (!creator) {
        throw new Error(`Tidak dapat menemukan user ${createdBy}`);
      }
    }
    const businessOutlet = await this.businessOutletRepository.findById(
      businessOutletId
    );
    if (!businessOutlet) {
      throw new Error(
        `Tidak dapat menemukan business outlet ${businessOutletId}`
      );
    }
    dto.updatedBy = createdBy;
    const businessOutletModel = await this.repository.create(dto);
    return OrganizationUserBusinessOutletMapper.modelToDTO(businessOutletModel);
  }
}
