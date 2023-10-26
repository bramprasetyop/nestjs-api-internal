import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { DistrictModel } from '@wahyoo/wahyoo-shared';
import { NestDataLoader } from 'src/commons/loader';
import { District } from './dto/district.dto';
import { DistrictMapper } from './mappers/district.mapper';
import { DistrictRepository } from './repositories/district.repository';

@Injectable()
export class DistrictSingleByIdLoader
  implements NestDataLoader<string, District> {
  constructor(private readonly repository: DistrictRepository) {}
  generateDataLoader(): DataLoader<string, District> {
    return new DataLoader<string, District>(async keys => {
      const districts: DistrictModel[] = await this.repository.findByIds(
        keys as string[]
      );
      const districtList = DistrictMapper.modelsToDTOs(districts);
      return keys.map(key =>
        districtList.find(district => district.id === Number(key))
      );
    });
  }
}
