import DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessSalesChannelMenuCategoryRepository } from './repositories/businessSalesChannelMenuCategory.repository';

@Injectable()
export class BusinessSalesChannelMenuCategoryBatchTotalActiveChannelByMenuCategoryId
  implements NestDataLoader<string, number> {
  constructor(
    private readonly repository: BusinessSalesChannelMenuCategoryRepository
  ) {}
  generateDataLoader(): DataLoader<string, number> {
    return new DataLoader<string, number>(async keys => {
      const totalActiveChannels: any[] = await this.repository.findTotalActiveChannelByMenuCategoryIds(
        keys as string[]
      );
      const result = keys.map(key => {
        const checker = totalActiveChannels.find(
          totalActiveChannel =>
            totalActiveChannel.businessMenuCategoryId === key
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
