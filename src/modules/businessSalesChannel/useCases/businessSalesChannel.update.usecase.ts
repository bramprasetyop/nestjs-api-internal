import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessSalesChannelRepository } from '../repositories/businessSalesChannel.repository';
import { BusinessRepository } from '../../business/repositories/business.repository';
import { BusinessSalesChannelMapper } from '../mappers/businessSalesChannel.mapper';
import { BusinessSalesChannel } from '../dto/businessSalesChannel.dto';
import { BusinessSalesChannelUpdateRequest } from '../dto/businessSalesChannelUpdateRequest.dto';

@Injectable()
export class BusinessSalesChannelUpdateUseCase implements IUseCase {
  constructor(
    private readonly businessSalesChannelRepository: BusinessSalesChannelRepository,
    private readonly BusinessRepository: BusinessRepository
  ) {}
  async execute(
    dto: BusinessSalesChannelUpdateRequest
  ): Promise<BusinessSalesChannel> {
    const { id, businessId } = dto;
    const businessSalesChannelModel = await this.businessSalesChannelRepository.findById(
      id
    );
    if (!businessSalesChannelModel) {
      throw new NotFoundException(id);
    }

    const organization = await this.BusinessRepository.findById(businessId);
    if (!organization) {
      throw new NotFoundException(businessId);
    }
    const updatedBusinessSalesChannel = await this.businessSalesChannelRepository.update(
      dto
    );
    return BusinessSalesChannelMapper.modelToDTO(updatedBusinessSalesChannel);
  }
}
