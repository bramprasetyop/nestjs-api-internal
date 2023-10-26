import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { BusinessSalesChannel } from './dto/businessSalesChannel.dto';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessSalesChannelRepository } from './repositories/businessSalesChannel.repository';
import { BusinessSalesChannelModel } from '@wahyoo/wahyoo-shared';
import { BusinessSalesChannelMapper } from './mappers/businessSalesChannel.mapper';

@Injectable()
export class BusinessSalesChannelSingleByIdLoader
  implements NestDataLoader<string, BusinessSalesChannel> {
  constructor(private readonly repository: BusinessSalesChannelRepository) {}
  generateDataLoader(): DataLoader<string, BusinessSalesChannel> {
    return new DataLoader<string, BusinessSalesChannel>(async keys => {
      const businessSalesChanneles: BusinessSalesChannelModel[] = await this.repository.findByIds(
        keys as string[]
      );
      const businessSalesChannelList = BusinessSalesChannelMapper.modelsToDTOs(
        businessSalesChanneles
      );
      return keys.map(key =>
        businessSalesChannelList.find(
          businessSalesChannel => businessSalesChannel.id === key
        )
      );
    });
  }
}
