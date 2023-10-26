import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { BusinessSalesChannelMenuItem } from './dto/businessSalesChannelMenuItem.dto';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessSalesChannelMenuItemModel } from '@wahyoo/wahyoo-shared';
import { BusinessSalesChannelMenuItemMapper } from './mappers/businessSalesChannelMenuItem.mapper';
import { BusinessSalesChannelMenuItemRepository } from './repositories/businessSalesChannelMenuItem.repository';

@Injectable()
export class BusinessSalesChannelMenuItemBatchByBusinessSalesChannelIdLoader
  implements NestDataLoader<string, BusinessSalesChannelMenuItem[]> {
  constructor(
    private readonly repository: BusinessSalesChannelMenuItemRepository
  ) {}
  generateDataLoader(): DataLoader<string, BusinessSalesChannelMenuItem[]> {
    return new DataLoader<string, BusinessSalesChannelMenuItem[]>(
      async keys => {
        const businessSalesChannelMenuItems: BusinessSalesChannelMenuItemModel[] = await this.repository.findByBusinessSalesChannelIds(
          keys as string[]
        );
        const businessMenuItemList = BusinessSalesChannelMenuItemMapper.modelsToDTOs(
          businessSalesChannelMenuItems
        );
        return keys.map(key =>
          businessMenuItemList.filter(
            businessSalesChannelMenuItem =>
              businessSalesChannelMenuItem.businessSalesChannelId === key
          )
        );
      }
    );
  }
}
