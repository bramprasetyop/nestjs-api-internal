import { Injectable, NotFoundException } from '@nestjs/common';
import { BusinessPromosStatus } from '@wahyoo/wahyoo-shared/dist/constants/enums';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessPromoRepository } from '../repositories/businessPromo.repository';
import { OrganizationUserRepository } from 'src/modules/user/repositories/organizationUser.repository';
import { BusinessPromoMapper } from '../mappers/businessPromo.mapper';
import { BusinessPromo } from '../dto/businessPromo.dto';
import { BusinessPromoClosedRequest } from '../dto/businessPromoClosedRequest.dto';

@Injectable()
export class BusinessPromoClosedUseCase implements IUseCase {
  constructor(
    private readonly businessPromoRepository: BusinessPromoRepository,
    private readonly organizationUserRepository: OrganizationUserRepository
  ) {}
  async execute(dto: BusinessPromoClosedRequest): Promise<BusinessPromo> {
    const { id, closedBy, status } = dto;

    const existingBusinessPromo = await this.businessPromoRepository.findById(
      id
    );
    if (!existingBusinessPromo) {
      throw new NotFoundException(id);
    }

    if (closedBy) {
      const creator = await this.organizationUserRepository.findById(closedBy);
      if (!creator) {
        throw new NotFoundException(closedBy);
      }
    }

    if (status === BusinessPromosStatus.closed) {
      dto.closedBy = closedBy;
      dto.closedAt = new Date();
    }

    const businessPromoModel = await this.businessPromoRepository.closedById(
      dto
    );
    return BusinessPromoMapper.modelToDTO(businessPromoModel);
  }
}
