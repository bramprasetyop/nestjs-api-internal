import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessProperty } from '../dto/businessProperty.dto';
import { BusinessPropertyMapper } from '../mappers/businessProperty.mapper';
import { BusinessPropertyRepository } from '../repositories/businessProperty.repository';

@Injectable()
export class BusinessPropertyByBusinessIdUseCase implements IUseCase {
  constructor(
    private readonly businessPropertyRepository: BusinessPropertyRepository
  ) {}
  async execute(businessId: string): Promise<BusinessProperty> {
    const businessProperty = await this.businessPropertyRepository.findByBusinessId(
      businessId
    );
    return BusinessPropertyMapper.modelToDTO(businessProperty);
  }
}
