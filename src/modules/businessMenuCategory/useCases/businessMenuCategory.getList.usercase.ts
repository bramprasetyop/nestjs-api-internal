import { IUseCase } from 'src/commons/useCase.interface';
import { Injectable } from '@nestjs/common';
import { BusinessMenuCategoryMapper } from '../mappers/businessMenuCategory.mapper';
import { BusinessMenuCategoryRepository } from '../repositories/businessMenuCategory.repository';
import { BusinessMenuCategoryGetListRequest } from '../dto/businessMenuCategoryGetListRequest.dto';
import { BusinessMenuCategoryGetListResponse } from '../dto/businessMenuCategoryGetListResponse.dto';

@Injectable()
export class BusinessMenuCategoryGetListUseCase implements IUseCase {
  constructor(private readonly repository: BusinessMenuCategoryRepository) {}
  async execute(
    dto: BusinessMenuCategoryGetListRequest
  ): Promise<BusinessMenuCategoryGetListResponse> {
    const result = await this.repository.findAll(dto);

    const response: BusinessMenuCategoryGetListResponse = {
      businessMenuCategories: BusinessMenuCategoryMapper.modelsToDTOs(
        result.businessMenuCategories
      ),
      meta: { ...result.meta }
    };
    return response;
  }
}
