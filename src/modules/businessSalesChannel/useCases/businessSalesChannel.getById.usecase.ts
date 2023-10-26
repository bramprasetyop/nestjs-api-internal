import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessSalesChannelRepository } from '../repositories/businessSalesChannel.repository';
import { BusinessSalesChannelMapper } from '../mappers/businessSalesChannel.mapper';
import { BusinessSalesChannel } from '../dto/businessSalesChannel.dto';

@Injectable()
export class BusinessSalesChannelGetByIdUseCase implements IUseCase {
  constructor(private readonly repository: BusinessSalesChannelRepository) {}
  async execute(id: string): Promise<BusinessSalesChannel> {
    const businessModel = await this.repository.findById(id);
    if (!businessModel) {
      throw new NotFoundException(id);
    }
    return BusinessSalesChannelMapper.modelToDTO(businessModel);
  }
}
