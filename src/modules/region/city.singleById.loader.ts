import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { CityModel } from '@wahyoo/wahyoo-shared';
import { NestDataLoader } from 'src/commons/loader';
import { City } from './dto/city.dto';
import { CityMapper } from './mappers/city.mapper';
import { CityRepository } from './repositories/city.repository';

@Injectable()
export class CitySingleByIdLoader implements NestDataLoader<string, City> {
  constructor(private readonly repository: CityRepository) {}
  generateDataLoader(): DataLoader<string, City> {
    return new DataLoader<string, City>(async keys => {
      const cities: CityModel[] = await this.repository.findByIds(
        keys as string[]
      );
      const cityList = CityMapper.modelsToDTOs(cities);
      return keys.map(key => cityList.find(city => city.id === Number(key)));
    });
  }
}
