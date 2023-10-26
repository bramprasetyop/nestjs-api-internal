import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessOutlet } from '../dto/businessOutlet.dto';
import { BusinessOutletMapper } from '../mappers/businessOutlet.mapper';
import { BusinessRepository } from 'src/modules/business/repositories/business.repository';
import { BusinessOutletRepository } from '../repositories/businessOutlet.repository';
import { OrganizationUserRepository } from 'src/modules/user/repositories/organizationUser.repository';
import { BusinessOutletAndPropertyUpdateRequest } from '../dto/businessOutletAndPropertyUpdateRequest.dto';

@Injectable()
export class BusinessOutletAndPropertyUpdateUseCase implements IUseCase {
  constructor(
    private readonly businessOutletRepository: BusinessOutletRepository,
    private readonly businessRepository: BusinessRepository,
    private readonly organizationUserRepository: OrganizationUserRepository
  ) {}
  async execute(
    dto: BusinessOutletAndPropertyUpdateRequest
  ): Promise<BusinessOutlet> {
    const { id, businessId, updatedBy } = dto.businessOutletDto;

    /* VALIDATION START */
    if (updatedBy) {
      const modifier = await this.organizationUserRepository.findById(
        updatedBy
      );
      if (!modifier) {
        throw new Error(`Tidak dapat menemukan user ${updatedBy}`);
      }
    }

    const businessOutletModel = await this.businessOutletRepository.findById(
      id
    );
    if (!businessOutletModel) {
      throw new Error(`Tidak dapat menemukan business outlet ${id}`);
    }

    const businessModel = await this.businessRepository.findById(businessId);
    if (!businessModel) {
      throw new Error(`Tidak dapat menemukan business ${businessId}`);
    }
    /* VALIDATION END */

    /* Update business outlet */
    const updatedBusinessOutletModel = await this.businessOutletRepository.businessOutletAndPropertyUpdate(
      dto
    );

    return BusinessOutletMapper.modelToDTO(updatedBusinessOutletModel);
  }
}
