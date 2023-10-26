import { Module } from '@nestjs/common';
import { DistrictModel, InjectionKey } from '@wahyoo/wahyoo-shared';
import { DistrictResolver } from './district.resolver';
import { DistrictRepository } from './repositories/district.repository';
import { DistrictGetListUseCase } from './useCases/district.getList.usecase';
import { DistrictSingleByIdLoader } from './district.singleById.loader';

@Module({
  imports: [],
  providers: [
    DistrictResolver,
    DistrictGetListUseCase,
    DistrictRepository,
    DistrictSingleByIdLoader,
    { provide: InjectionKey.DISTRICT_MODEL, useValue: DistrictModel }
  ],
  exports: [DistrictRepository, DistrictSingleByIdLoader]
})
export class DistrictModule {}
