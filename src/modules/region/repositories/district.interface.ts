import { DistrictModel } from '@wahyoo/wahyoo-shared';
import { DistrictGetListRequest } from '../dto/districtGetListRequest.dto';

export class PagingDistrictModel {
  districts: DistrictModel[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}

export interface IDistrictRepository {
  findAll(dto: DistrictGetListRequest): Promise<PagingDistrictModel>;
  findByIds(ids: string[]): Promise<DistrictModel[]>;
}
