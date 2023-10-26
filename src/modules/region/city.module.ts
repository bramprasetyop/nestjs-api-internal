import { Module } from '@nestjs/common';
import { CityModel, InjectionKey } from '@wahyoo/wahyoo-shared';
import { CityResolver } from './city.resolver';
import { CityRepository } from './repositories/city.repository';
import { CityGetListUseCase } from './useCases/city.getList.usecase';
import { CitySingleByIdLoader } from './city.singleById.loader';

@Module({
  imports: [],
  providers: [
    CityResolver,
    CityGetListUseCase,
    CityRepository,
    CitySingleByIdLoader,
    { provide: InjectionKey.CITY_MODEL, useValue: CityModel }
  ],
  exports: [CityRepository, CitySingleByIdLoader]
})
export class CityModule {}
