import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessSalesChannelMenuItemRepository } from './repositories/businessSalesChannelMenuItem.repository';

@Injectable()
export class BusinessSalesChannelMenuItemBatchTotalActiveChannelByMenuItemIdLoader
  implements NestDataLoader<string, number> {
  constructor(
    private readonly repository: BusinessSalesChannelMenuItemRepository
  ) {}
  generateDataLoader(): DataLoader<string, number> {
    return new DataLoader<string, number>(async keys => {
      const totalActiveChannels: any[] = await this.repository.findTotalActiveChannelByMenuItemIds(
        keys as string[]
      );
      const result = keys.map(key => {
        const checker = totalActiveChannels.find(
          totalActiveChannel => totalActiveChannel.businessMenuItemId === key
        );
        if (checker) {
          return Number(checker.total);
        }
        return 0;
      });

      return result;
    });
  }
}
