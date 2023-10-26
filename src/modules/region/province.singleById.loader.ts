import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { ProvinceModel } from '@wahyoo/wahyoo-shared';
import { NestDataLoader } from 'src/commons/loader';
import { Province } from './dto/province.dto';
import { ProvinceMapper } from './mappers/province.mapper';
import { ProvinceRepository } from './repositories/province.repository';

@Injectable()
export class ProvinceSingleByIdLoader
  implements NestDataLoader<string, Province> {
  constructor(private readonly repository: ProvinceRepository) {}
  generateDataLoader(): DataLoader<string, Province> {
    return new DataLoader<string, Province>(async keys => {
      const provinces: ProvinceModel[] = await this.repository.findByIds(
        keys as string[]
      );
      const provinceList = ProvinceMapper.modelsToDTOs(provinces);
      return keys.map(key =>
        provinceList.find(province => province.id === Number(key))
      );
    });
  }
}
