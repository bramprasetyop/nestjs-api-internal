import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessSalesChannelCategoryRepository } from '../repositories/businessSalesChannelCategory.repository';
import { BusinessSalesChannelCategoryMapper } from '../mappers/businessSalesChannelCategory.mapper';
import { BusinessSalesChannelCategory } from '../dto/businessSalesChannelCategory.dto';

@Injectable()
export class BusinessSalesChannelCategoryGetByIdUseCase implements IUseCase {
  constructor(
    private readonly repository: BusinessSalesChannelCategoryRepository
  ) {}
  async execute(id: string): Promise<BusinessSalesChannelCategory> {
    const businessModel = await this.repository.findById(id);
    if (!businessModel) {
      throw new NotFoundException(id);
    }
    return BusinessSalesChannelCategoryMapper.modelToDTO(businessModel);
  }
}
