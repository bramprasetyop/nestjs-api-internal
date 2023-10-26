import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationUserRepository } from 'src/modules/user/repositories/organizationUser.repository';
import { OrganizationUserBusinessOutletRepository } from '../repositories/organizationUserBusinessOutlet.repository';
import { OrganizationUserBusinessOutlet } from '../dto/organizationUserBusinessOutlet.dto';
import { OrganizationUserBusinessOutletMapper } from '../mappers/organizationUserBusinessOutlet.mapper';
import { OrganizationUserBusinessOutletUpdateRequest } from '../dto/organizationUserBusinessOutletUpdateRequest.dto';
import { BusinessOutletRepository } from 'src/modules/businessOutlet/repositories/businessOutlet.repository';

@Injectable()
export class OrganizationUserBusinessOutletUpdateUseCase implements IUseCase {
  constructor(
    private readonly repository: OrganizationUserBusinessOutletRepository,
    private readonly organizationUserRepository: OrganizationUserRepository,
    private readonly businessOutletRepository: BusinessOutletRepository
  ) {}

  async execute(
    dto: OrganizationUserBusinessOutletUpdateRequest
  ): Promise<OrganizationUserBusinessOutlet> {
    const { id, updatedBy, businessOutletId } = dto;
    const organizationUserBusinessOutlet = await this.repository.findById(id);
    if (!organizationUserBusinessOutlet) {
      throw new NotFoundException(id);
    }
    if (updatedBy) {
      const modifier = await this.organizationUserRepository.findById(
        updatedBy
      );
      if (!modifier) {
        throw new Error(`Tidak dapat menemukan user ${updatedBy}`);
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
    const businessOutletModel = await this.repository.update(dto);
    return OrganizationUserBusinessOutletMapper.modelToDTO(businessOutletModel);
  }
}
