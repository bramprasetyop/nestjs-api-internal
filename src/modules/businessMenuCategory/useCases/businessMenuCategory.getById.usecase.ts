import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessMenuCategory } from '../dto/businessMenuCategory.dto';
import { BusinessMenuCategoryMapper } from '../mappers/businessMenuCategory.mapper';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BusinessMenuCategoryRepository } from '../repositories/businessMenuCategory.repository';

@Injectable()
export class BusinessMenuCategoryGetByIdUseCase implements IUseCase {
  constructor(private readonly repository: BusinessMenuCategoryRepository) {}
  async execute(id: string): Promise<BusinessMenuCategory> {
    const businessMenuCategoryModel = await this.repository.findById(id);
    if (!businessMenuCategoryModel) {
      throw new NotFoundException(id);
    }
    return BusinessMenuCategoryMapper.modelToDTO(businessMenuCategoryModel);
  }
}
