import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { BusinessPromoMenuItem } from './dto/businessPromoMenuItem.dto';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessPromoRepository } from './repositories/businessPromo.repository';
import { BusinessPromoMenuItemsModel } from '@wahyoo/wahyoo-shared';
import { BusinessPromoMenuItemMapper } from './mappers/businessPromoMenuItem.mapper';

@Injectable()
export class BusinessPromoMenuItemSingleByIdLoader
  implements NestDataLoader<string, BusinessPromoMenuItem[]> {
  constructor(private readonly repository: BusinessPromoRepository) {}
  generateDataLoader(): DataLoader<string, BusinessPromoMenuItem[]> {
    return new DataLoader<string, BusinessPromoMenuItem[]>(async keys => {
      const businessPromoMenuItems: BusinessPromoMenuItemsModel[] = await this.repository.findByIdsMenuItem(
        keys as string[]
      );
      const businessPromoMenuItemList = BusinessPromoMenuItemMapper.modelsToDTOs(
        businessPromoMenuItems
      );

      return keys.map(key =>
        businessPromoMenuItemList.filter(
          businessPromomenuItem => businessPromomenuItem.businessPromoId === key
        )
      );
    });
  }
}
