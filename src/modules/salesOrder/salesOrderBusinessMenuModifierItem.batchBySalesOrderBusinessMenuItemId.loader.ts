import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { SalesOrderBusinessMenuModifierItemModel } from '@wahyoo/wahyoo-shared';
import { NestDataLoader } from 'src/commons/loader';
import { SalesOrderBusinessMenuModifierItemRepository } from './repositories/salesOrderBusinessMenuModifierItem.repository';
import { SalesOrderBusinessMenuModifierItemMapper } from './mappers/salesOrderBusinessMenuModifierItem.mapper';
import { SalesOrderBusinessMenuModifierItem } from './dto/salesOrderBusinessMenuModifierItem.dto';

@Injectable()
export class SalesOrderBusinessMenuModifierItemBatchBySalesOrderBusinessMenuItemIdLoader
  implements NestDataLoader<string, SalesOrderBusinessMenuModifierItem[]> {
  constructor(
    private readonly repository: SalesOrderBusinessMenuModifierItemRepository
  ) {}
  generateDataLoader(): DataLoader<
    string,
    SalesOrderBusinessMenuModifierItem[]
  > {
    return new DataLoader<string, SalesOrderBusinessMenuModifierItem[]>(
      async keys => {
        const salesOrderBusinessMenuModifierItems: SalesOrderBusinessMenuModifierItemModel[] = await this.repository.findBySalesOrderBusinessMenuItemIds(
          keys as string[]
        );
        const salesOrderBusinessMenuModifierItemList = SalesOrderBusinessMenuModifierItemMapper.modelsToDTOs(
          salesOrderBusinessMenuModifierItems
        );
        return keys.map(key =>
          salesOrderBusinessMenuModifierItemList.filter(
            salesOrderBusinessMenuModifierItem =>
              salesOrderBusinessMenuModifierItem.salesOrderBusinessMenuItemId ===
              key
          )
        );
      }
    );
  }
}
