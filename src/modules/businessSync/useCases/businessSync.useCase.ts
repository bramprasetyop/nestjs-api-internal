import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessSalesChannelCategoryMapper } from 'src/modules/businessSalesChannelCategory/mappers/businessSalesChannelCategory.mapper';
import { BusinessSyncRequest } from '../dto/businessSyncRequest.dto';
import { BusinessSyncResponse } from '../dto/businessSyncResponse.dto';
import { BusinessSyncRepository } from '../repositories/businessSync.repository';

@Injectable()
export class BusinessSyncUseCase implements IUseCase {
  constructor(private readonly repository: BusinessSyncRepository) {}
  async execute(dto: BusinessSyncRequest): Promise<BusinessSyncResponse> {
    const models = await this.repository.findAll(dto.businessId);
    const businessSalesChannelCategories = BusinessSalesChannelCategoryMapper.modelsToDTOs(
      models
    );
    const response: BusinessSyncResponse = {
      businessSalesChannelCategories
    };
    return response;
  }
}
