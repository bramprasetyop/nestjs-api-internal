import { IUseCase } from 'src/commons/useCase.interface';
import { Injectable } from '@nestjs/common';
import { BusinessMapper } from '../mappers/business.mapper';
import { BusinessRepository } from '../repositories/business.repository';
import { BusinessGetListRequest } from '../dto/businessGetListRequest.dto';
import { BusinessGetListResponse } from '../dto/businessGetListResponse.dto';

@Injectable()
export class BusinessGetListPublicUseCase implements IUseCase {
  constructor(private readonly repository: BusinessRepository) {}
  async execute(dto: BusinessGetListRequest): Promise<BusinessGetListResponse> {
    const result = await this.repository.findAllByIsHiddenToPublic(dto);

    const response: BusinessGetListResponse = {
      businesses: BusinessMapper.modelsToDTOs(result.businesses),
      meta: { ...result.meta }
    };
    return response;
  }
}
