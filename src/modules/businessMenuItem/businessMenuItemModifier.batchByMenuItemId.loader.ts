import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { BusinessMenuItemModifier } from './dto/businessMenuItemModifier.dto';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessMenuItemModifierModel } from '@wahyoo/wahyoo-shared';
import { BusinessMenuItemModifierMapper } from './mappers/businessMenuItemModifier.mapper';
import { BusinessMenuItemModifierRepository } from './repositories/businessMenuItemModifier.repository';

@Injectable()
export class BusinessMenuItemModifierBatchByMenuItemIdLoader
  implements NestDataLoader<string, BusinessMenuItemModifier[]> {
  constructor(
    private readonly repository: BusinessMenuItemModifierRepository
  ) {}
  generateDataLoader(): DataLoader<string, BusinessMenuItemModifier[]> {
    return new DataLoader<string, BusinessMenuItemModifier[]>(async keys => {
      const businessMenuItemModifiers: BusinessMenuItemModifierModel[] = await this.repository.findByBusinessMenuItemIds(
        keys as string[]
      );
      const businessMenuItemModifierList = BusinessMenuItemModifierMapper.modelsToDTOs(
        businessMenuItemModifiers
      );
      return keys.map(key =>
        businessMenuItemModifierList.filter(
          businessMenuItemModifier =>
            businessMenuItemModifier.businessMenuItemId === key
        )
      );
    });
  }
}
