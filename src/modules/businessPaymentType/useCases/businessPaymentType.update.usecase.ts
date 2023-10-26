import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessPaymentTypeRepository } from '../repositories/businessPaymentType.repository';
import { BusinessRepository } from '../../business/repositories/business.repository';
import { BusinessPaymentTypeMapper } from '../mappers/businessPaymentType.mapper';
import { BusinessPaymentType } from '../dto/businessPaymentType.dto';
import { BusinessPaymentTypeUpdateRequest } from '../dto/businessPaymentTypeUpdateRequest.dto';

@Injectable()
export class BusinessPaymentTypeUpdateUseCase implements IUseCase {
  constructor(
    private readonly businessPaymentTypeRepository: BusinessPaymentTypeRepository,
    private readonly BusinessRepository: BusinessRepository
  ) {}
  async execute(
    dto: BusinessPaymentTypeUpdateRequest
  ): Promise<BusinessPaymentType> {
    const { id, businessId } = dto;
    const businessPaymentTypeModel = await this.businessPaymentTypeRepository.findById(
      id
    );
    if (!businessPaymentTypeModel) {
      throw new NotFoundException(id);
    }

    const organization = await this.BusinessRepository.findById(businessId);
    if (!organization) {
      throw new NotFoundException(businessId);
    }
    const updatedBusinessPaymentType = await this.businessPaymentTypeRepository.update(
      dto
    );
    return BusinessPaymentTypeMapper.modelToDTO(updatedBusinessPaymentType);
  }
}
