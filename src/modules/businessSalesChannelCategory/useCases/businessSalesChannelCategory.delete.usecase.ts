import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessSalesChannelCategoryRepository } from '../repositories/businessSalesChannelCategory.repository';

@Injectable()
export class BusinessSalesChannelCategoryDeleteUseCase implements IUseCase {
  constructor(
    private readonly repository: BusinessSalesChannelCategoryRepository
  ) {}
  async execute(id: string): Promise<Boolean> {
    return this.repository.destroyById(id);
  }
}
