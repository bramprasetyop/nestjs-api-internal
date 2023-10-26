import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessPaymentTypeCreateRequest } from '../dto/businessPaymentTypeCreateRequest.dto';
import { BusinessRepository } from '../../business/repositories/business.repository';
import { BusinessPaymentTypeRepository } from '../repositories/businessPaymentType.repository';
import { BusinessPaymentTypeMapper } from '../mappers/businessPaymentType.mapper';
import { BusinessPaymentType } from '../dto/businessPaymentType.dto';

@Injectable()
export class BusinessPaymentTypeCreateUseCase implements IUseCase {
  constructor(
    private readonly businessPaymentTypeRepository: BusinessPaymentTypeRepository,
    private readonly businessRepository: BusinessRepository
  ) {}
  async execute(
    dto: BusinessPaymentTypeCreateRequest
  ): Promise<BusinessPaymentType> {
    const { businessId } = dto;
    const organization = await this.businessRepository.findById(businessId);
    if (!organization) {
      throw new NotFoundException(businessId);
    }
    const businessPaymentTypeModel = await this.businessPaymentTypeRepository.create(
      dto
    );
    return BusinessPaymentTypeMapper.modelToDTO(businessPaymentTypeModel);
  }
}
