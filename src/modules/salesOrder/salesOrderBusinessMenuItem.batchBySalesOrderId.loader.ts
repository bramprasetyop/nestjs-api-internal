import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { SalesOrderBusinessMenuItemModel } from '@wahyoo/wahyoo-shared';
import { NestDataLoader } from 'src/commons/loader';
import { SalesOrderBusinessMenuItem } from './dto/salesOrderBusinessMenuItem.dto';
import { SalesOrderBusinessMenuItemMapper } from './mappers/salesOrderBusinessMenuItem.mapper';
import { SalesOrderBusinessMenuItemRepository } from './repositories/salesOrderBusinessMenuItem.repository';

@Injectable()
export class SalesOrderBusinessMenuItemBatchBySalesOrderIdLoader
  implements NestDataLoader<string, SalesOrderBusinessMenuItem[]> {
  constructor(
    private readonly repository: SalesOrderBusinessMenuItemRepository
  ) {}
  generateDataLoader(): DataLoader<string, SalesOrderBusinessMenuItem[]> {
    return new DataLoader<string, SalesOrderBusinessMenuItem[]>(async keys => {
      const salesOrderBusinessMenuItems: SalesOrderBusinessMenuItemModel[] = await this.repository.findBySalesOrderIds(
        keys as string[]
      );
      const salesOrderBusinessMenuItemList = SalesOrderBusinessMenuItemMapper.modelsToDTOs(
        salesOrderBusinessMenuItems
      );
      return keys.map(key =>
        salesOrderBusinessMenuItemList.filter(
          salesOrderBusinessMenuItem =>
            salesOrderBusinessMenuItem.salesOrderId === key
        )
      );
    });
  }
}
