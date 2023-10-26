import { Module } from '@nestjs/common';
import { ProvinceModel, InjectionKey } from '@wahyoo/wahyoo-shared';
import { ProvinceResolver } from './province.resolver';
import { ProvinceRepository } from './repositories/province.repository';
import { ProvinceGetListUseCase } from './useCases/province.getList.usecase';
import { ProvinceSingleByIdLoader } from './province.singleById.loader';

@Module({
  imports: [],
  providers: [
    ProvinceResolver,
    ProvinceGetListUseCase,
    ProvinceRepository,
    ProvinceSingleByIdLoader,
    { provide: InjectionKey.PROVINCE_MODEL, useValue: ProvinceModel }
  ],
  exports: [ProvinceRepository, ProvinceSingleByIdLoader]
})
export class ProvinceModule {}
