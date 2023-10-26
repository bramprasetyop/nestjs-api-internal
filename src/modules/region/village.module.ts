import { Module } from '@nestjs/common';
import { VillageModel, InjectionKey } from '@wahyoo/wahyoo-shared';
import { VillageResolver } from './village.resolver';
import { VillageRepository } from './repositories/village.repository';
import { VillageGetListUseCase } from './useCases/village.getList.usecase';
import { VillageSingleByIdLoader } from './village.singleById.loader';

@Module({
  imports: [],
  providers: [
    VillageResolver,
    VillageGetListUseCase,
    VillageRepository,
    VillageSingleByIdLoader,
    { provide: InjectionKey.VILLAGE_MODEL, useValue: VillageModel }
  ],
  exports: [VillageRepository, VillageSingleByIdLoader]
})
export class VillageModule {}
