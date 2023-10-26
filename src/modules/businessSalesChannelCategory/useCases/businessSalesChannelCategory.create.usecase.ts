import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessSalesChannelCategoryCreateRequest } from '../dto/businessSalesChannelCategoryCreateRequest.dto';
import { BusinessRepository } from '../../business/repositories/business.repository';
import { BusinessSalesChannelCategoryRepository } from '../repositories/businessSalesChannelCategory.repository';
import { BusinessSalesChannelCategoryMapper } from '../mappers/businessSalesChannelCategory.mapper';
import { BusinessSalesChannelCategory } from '../dto/businessSalesChannelCategory.dto';

@Injectable()
export class BusinessSalesChannelCategoryCreateUseCase implements IUseCase {
  constructor(
    private readonly businessSalesChannelCategoryRepository: BusinessSalesChannelCategoryRepository,
    private readonly businessRepository: BusinessRepository
  ) {}
  async execute(
    dto: BusinessSalesChannelCategoryCreateRequest
  ): Promise<BusinessSalesChannelCategory> {
    const { businessId } = dto;
    const organization = await this.businessRepository.findById(businessId);
    if (!organization) {
      throw new NotFoundException(businessId);
    }
    const businessSalesChannelCategoryModel = await this.businessSalesChannelCategoryRepository.create(
      dto
    );
    return BusinessSalesChannelCategoryMapper.modelToDTO(
      businessSalesChannelCategoryModel
    );
  }
}
