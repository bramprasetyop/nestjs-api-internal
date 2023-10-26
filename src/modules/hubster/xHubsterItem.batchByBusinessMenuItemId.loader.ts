import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { XHubsterItemModel } from '@wahyoo/wahyoo-shared';
import { NestDataLoader } from 'src/commons/loader';
import { XHubsterItemRepository } from './repositories/xHubsterItem.repository';
import { XHubsterItem } from './dto/xHubsterItem';
import { XHubsterItemMapper } from './mappers/xHubsterItem.mapper';

@Injectable()
export class XHubsterItemBatchByBusinessMenuItemIdLoader
  implements NestDataLoader<string, XHubsterItem[]> {
  constructor(private readonly repository: XHubsterItemRepository) {}
  generateDataLoader(): DataLoader<string, XHubsterItem[]> {
    return new DataLoader<string, XHubsterItem[]>(async keys => {
      const xHubsterItems: XHubsterItemModel[] = await this.repository.findByBusinessMenuItemIds(
        keys as string[]
      );
      const xHubsterItemList = XHubsterItemMapper.modelsToDTOs(xHubsterItems);
      return keys.map(key =>
        xHubsterItemList.filter(
          xHubsterItem => xHubsterItem.businessMenuItemId === key
        )
      );
    });
  }
}
