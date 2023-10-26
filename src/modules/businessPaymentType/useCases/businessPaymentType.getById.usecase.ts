import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessPaymentTypeRepository } from '../repositories/businessPaymentType.repository';
import { BusinessPaymentTypeMapper } from '../mappers/businessPaymentType.mapper';
import { BusinessPaymentType } from '../dto/businessPaymentType.dto';

@Injectable()
export class BusinessPaymentTypeGetByIdUseCase implements IUseCase {
  constructor(private readonly repository: BusinessPaymentTypeRepository) {}
  async execute(id: string): Promise<BusinessPaymentType> {
    const businessModel = await this.repository.findById(id);
    if (!businessModel) {
      throw new NotFoundException(id);
    }
    return BusinessPaymentTypeMapper.modelToDTO(businessModel);
  }
}
