import { IUseCase } from 'src/commons/useCase.interface';
import { Injectable } from '@nestjs/common';
import { BusinessMerchantProductMapper } from '../mappers/businessMerchantProduct.mapper';
import { BusinessMerchantProductRepository } from '../repositories/businessMerchantProduct.repository';
import { BusinessMerchantProductGetListRequest } from '../dto/businessMerchantProductGetListRequest.dto';
import { BusinessMerchantProductGetListResponse } from '../dto/businessMerchantProductGetListResponse.dto';

@Injectable()
export class BusinessMerchantProductGetListUseCase implements IUseCase {
  constructor(private readonly repository: BusinessMerchantProductRepository) {}
  async execute(
    dto: BusinessMerchantProductGetListRequest
  ): Promise<BusinessMerchantProductGetListResponse> {
    const result = await this.repository.findAll(dto);

    const response: BusinessMerchantProductGetListResponse = {
      businessMerchantProducts: BusinessMerchantProductMapper.modelsToDTOs(
        result.businessMerchantProducts
      ),
      meta: { ...result.meta }
    };
    return response;
  }
}
