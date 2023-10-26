import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessPromoGetListRequest } from '../dto/businessPromoGetListRequest.dto';
import { BusinessPromoListResponse } from '../dto/businessPromoResponse.dto';
import { BusinessPromoMapper } from '../mappers/businessPromo.mapper';
import { BusinessPromoRepository } from '../repositories/businessPromo.repository';

@Injectable()
export class BusinessPromoGetListUseCase implements IUseCase {
  constructor(private readonly repository: BusinessPromoRepository) {}
  async execute(
    dto: BusinessPromoGetListRequest
  ): Promise<BusinessPromoListResponse> {
    const result = await this.repository.findAll(dto);

    const response: BusinessPromoListResponse = {
      businessPromo: BusinessPromoMapper.modelsToDTOs(result.businessPromo),
      meta: { ...result.meta }
    };
    return response;
  }
}
