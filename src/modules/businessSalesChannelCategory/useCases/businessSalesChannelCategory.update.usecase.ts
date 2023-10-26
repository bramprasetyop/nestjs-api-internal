import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessSalesChannelCategoryRepository } from '../repositories/businessSalesChannelCategory.repository';
import { BusinessRepository } from '../../business/repositories/business.repository';
import { BusinessSalesChannelCategoryMapper } from '../mappers/businessSalesChannelCategory.mapper';
import { BusinessSalesChannelCategory } from '../dto/businessSalesChannelCategory.dto';
import { BusinessSalesChannelCategoryUpdateRequest } from '../dto/businessSalesChannelCategoryUpdateRequest.dto';

@Injectable()
export class BusinessSalesChannelCategoryUpdateUseCase implements IUseCase {
  constructor(
    private readonly businessSalesChannelCategoryRepository: BusinessSalesChannelCategoryRepository,
    private readonly BusinessRepository: BusinessRepository
  ) {}
  async execute(
    dto: BusinessSalesChannelCategoryUpdateRequest
  ): Promise<BusinessSalesChannelCategory> {
    const { id, businessId } = dto;
    const businessSalesChannelCategoryModel = await this.businessSalesChannelCategoryRepository.findById(
      id
    );
    if (!businessSalesChannelCategoryModel) {
      throw new NotFoundException(id);
    }

    const organization = await this.BusinessRepository.findById(businessId);
    if (!organization) {
      throw new NotFoundException(businessId);
    }
    const updatedBusinessSalesChannelCategory = await this.businessSalesChannelCategoryRepository.update(
      dto
    );
    return BusinessSalesChannelCategoryMapper.modelToDTO(
      updatedBusinessSalesChannelCategory
    );
  }
}
