import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { BusinessMenuModifierItem } from './dto/businessMenuModifierItem.dto';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessMenuModifierRepository } from './repositories/businessMenuModifier.repository';
import { BusinessMenuModifierItemModel } from '@wahyoo/wahyoo-shared';
import { BusinessMenuModifierItemMapper } from './mappers/businessMenuModifierItem.mapper';

@Injectable()
export class BusinessMenuItemModifierItemBatchByMenuModifierIdLoader
  implements NestDataLoader<string, BusinessMenuModifierItem[]> {
  constructor(private readonly repository: BusinessMenuModifierRepository) {}
  generateDataLoader(): DataLoader<string, BusinessMenuModifierItem[]> {
    return new DataLoader<string, BusinessMenuModifierItem[]>(async keys => {
      const businessMenuModifierItems: BusinessMenuModifierItemModel[] = await this.repository.menuModifierItemFindByMenuModifierIds(
        keys as string[]
      );
      const businessMenuModifierList = BusinessMenuModifierItemMapper.modelsToDTOs(
        businessMenuModifierItems
      );
      return keys.map(key =>
        businessMenuModifierList.filter(
          businessMenuModifierItem =>
            businessMenuModifierItem.businessMenuModifierId === key
        )
      );
    });
  }
}
