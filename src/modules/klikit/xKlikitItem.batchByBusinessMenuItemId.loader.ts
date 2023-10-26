import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { XKlikitItemModel } from '@wahyoo/wahyoo-shared';
import { NestDataLoader } from 'src/commons/loader';
import { XKlikitItemRepository } from './repositories/xKlikitItem.repository';
import { XKlikitItem } from './dto/xKlikitItem';
import { XKlikitItemMapper } from './mappers/xKlikitItem.mapper';

@Injectable()
export class XKlikitItemBatchByBusinessMenuItemIdLoader
  implements NestDataLoader<string, XKlikitItem[]> {
  constructor(private readonly repository: XKlikitItemRepository) {}
  generateDataLoader(): DataLoader<string, XKlikitItem[]> {
    return new DataLoader<string, XKlikitItem[]>(async keys => {
      const xKlikitItems: XKlikitItemModel[] = await this.repository.findByBusinessMenuItemIds(
        keys as string[]
      );
      const xKlikitItemList = XKlikitItemMapper.modelsToDTOs(xKlikitItems);
      return keys.map(key =>
        xKlikitItemList.filter(
          xKlikitItem => xKlikitItem.businessMenuItemId === key
        )
      );
    });
  }
}
