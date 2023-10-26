import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessSalesChannelGetListRequest } from '../dto/businessSalesChannelGetListRequest.dto';
import { BusinessSalesChannelGetListResponse } from '../dto/businessSalesChannelGetListResponse.dto';
import { BusinessSalesChannelMapper } from '../mappers/businessSalesChannel.mapper';
import { BusinessSalesChannelRepository } from '../repositories/businessSalesChannel.repository';

@Injectable()
export class BusinessSalesChannelGetListUseCase implements IUseCase {
  constructor(private readonly repository: BusinessSalesChannelRepository) {}
  async execute(
    dto: BusinessSalesChannelGetListRequest
  ): Promise<BusinessSalesChannelGetListResponse> {
    const result = await this.repository.findAll(dto);

    const response: BusinessSalesChannelGetListResponse = {
      businessSalesChannels: BusinessSalesChannelMapper.modelsToDTOs(
        result.businessSalesChannels
      ),
      meta: { ...result.meta }
    };
    return response;
  }
}
