import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { VillageModel } from '@wahyoo/wahyoo-shared';
import { NestDataLoader } from 'src/commons/loader';
import { Village } from './dto/village.dto';
import { VillageMapper } from './mappers/village.mapper';
import { VillageRepository } from './repositories/village.repository';

@Injectable()
export class VillageSingleByIdLoader
  implements NestDataLoader<string, Village> {
  constructor(private readonly repository: VillageRepository) {}
  generateDataLoader(): DataLoader<string, Village> {
    return new DataLoader<string, Village>(async keys => {
      const villages: VillageModel[] = await this.repository.findByIds(
        keys as string[]
      );
      const villageList = VillageMapper.modelsToDTOs(villages);
      return keys.map(key =>
        villageList.find(village => village.id === Number(key))
      );
    });
  }
}
