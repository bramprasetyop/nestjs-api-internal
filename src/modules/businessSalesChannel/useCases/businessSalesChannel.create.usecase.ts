import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessSalesChannelCreateRequest } from '../dto/businessSalesChannelCreateRequest.dto';
import { BusinessRepository } from '../../business/repositories/business.repository';
import { BusinessSalesChannelRepository } from '../repositories/businessSalesChannel.repository';
import { BusinessSalesChannelMapper } from '../mappers/businessSalesChannel.mapper';
import { BusinessSalesChannel } from '../dto/businessSalesChannel.dto';

@Injectable()
export class BusinessSalesChannelCreateUseCase implements IUseCase {
  constructor(
    private readonly businessSalesChannelRepository: BusinessSalesChannelRepository,
    private readonly businessRepository: BusinessRepository
  ) {}
  async execute(
    dto: BusinessSalesChannelCreateRequest
  ): Promise<BusinessSalesChannel> {
    const { businessId } = dto;
    const organization = await this.businessRepository.findById(businessId);
    if (!organization) {
      throw new NotFoundException(businessId);
    }
    const businessSalesChannelModel = await this.businessSalesChannelRepository.create(
      dto
    );
    return BusinessSalesChannelMapper.modelToDTO(businessSalesChannelModel);
  }
}
