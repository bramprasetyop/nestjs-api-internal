import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessSalesChannelCategoryGetListRequest } from '../dto/businessSalesChannelCategoryGetListRequest.dto';
import { BusinessSalesChannelCategoryGetListResponse } from '../dto/businessSalesChannelCategoryGetListResponse.dto';
import { BusinessSalesChannelCategoryMapper } from '../mappers/businessSalesChannelCategory.mapper';
import { BusinessSalesChannelCategoryRepository } from '../repositories/businessSalesChannelCategory.repository';

@Injectable()
export class BusinessSalesChannelCategoryGetListUseCase implements IUseCase {
  constructor(
    private readonly repository: BusinessSalesChannelCategoryRepository
  ) {}
  async execute(
    dto: BusinessSalesChannelCategoryGetListRequest
  ): Promise<BusinessSalesChannelCategoryGetListResponse> {
    const result = await this.repository.findAll(dto);

    const response: BusinessSalesChannelCategoryGetListResponse = {
      businessSalesChannelCategories: BusinessSalesChannelCategoryMapper.modelsToDTOs(
        result.businessSalesChannelCategories
      ),
      meta: { ...result.meta }
    };
    return response;
  }
}
