import { VillageModel } from '@wahyoo/wahyoo-shared';
import { VillageGetListRequest } from '../dto/villageGetListRequest.dto';

export class PagingVillageModel {
  villages: VillageModel[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}

export interface IVillageRepository {
  findAll(dto: VillageGetListRequest): Promise<PagingVillageModel>;
  findByIds(ids: string[]): Promise<VillageModel[]>;
}
