import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { BusinessMenuItem } from './dto/businessMenuItem.dto';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessMenuItemRepository } from './repositories/businessMenuItem.repository';
import { BusinessMenuItemModel } from '@wahyoo/wahyoo-shared';
import { BusinessMenuItemMapper } from './mappers/businessMenuItem.mapper';

@Injectable()
export class BusinessMenuItemBatchByMenuCategoryIdLoader
  implements NestDataLoader<string, BusinessMenuItem[]> {
  constructor(private readonly repository: BusinessMenuItemRepository) {}
  generateDataLoader(): DataLoader<string, BusinessMenuItem[]> {
    return new DataLoader<string, BusinessMenuItem[]>(async keys => {
      const businessMenuItems: BusinessMenuItemModel[] = await this.repository.findByMenuCategoryIds(
        keys as string[]
      );
      const businessMenuItemList = BusinessMenuItemMapper.modelsToDTOs(
        businessMenuItems
      );
      return keys.map(key =>
        businessMenuItemList.filter(
          businessMenuItem => businessMenuItem.businessMenuCategoryId === key
        )
      );
    });
  }
}
