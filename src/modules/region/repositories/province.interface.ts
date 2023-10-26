import { ProvinceModel } from '@wahyoo/wahyoo-shared';
import { ProvinceGetListRequest } from '../dto/provinceGetListRequest.dto';

export class PagingProvinceModel {
  provinces: ProvinceModel[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}

export interface IProvinceRepository {
  findAll(dto: ProvinceGetListRequest): Promise<PagingProvinceModel>;
  findByIds(ids: string[]): Promise<ProvinceModel[]>;
}
