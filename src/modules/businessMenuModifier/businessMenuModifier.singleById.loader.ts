import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { BusinessMenuModifier } from './dto/businessMenuModifier.dto';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessMenuModifierRepository } from './repositories/businessMenuModifier.repository';
import { BusinessMenuModifierModel } from '@wahyoo/wahyoo-shared';
import { BusinessMenuModifierMapper } from './mappers/businessMenuModifier.mapper';

@Injectable()
export class BusinessMenuModifierSingleByIdLoader
  implements NestDataLoader<string, BusinessMenuModifier> {
  constructor(private readonly repository: BusinessMenuModifierRepository) {}
  generateDataLoader(): DataLoader<string, BusinessMenuModifier> {
    return new DataLoader<string, BusinessMenuModifier>(async keys => {
      const businessMenuModifiers: BusinessMenuModifierModel[] = await this.repository.findByIds(
        keys as string[]
      );
      const businessMenuModifierList = BusinessMenuModifierMapper.modelsToDTOs(
        businessMenuModifiers
      );
      return keys.map(key =>
        businessMenuModifierList.find(
          businessMenuModifier => businessMenuModifier.id === key
        )
      );
    });
  }
}
