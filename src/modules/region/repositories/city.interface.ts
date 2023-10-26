import { CityModel } from '@wahyoo/wahyoo-shared';
import { CityGetListRequest } from '../dto/cityGetListRequest.dto';

export class PagingCityModel {
  cities: CityModel[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}

export interface ICityRepository {
  findAll(dto: CityGetListRequest): Promise<PagingCityModel>;
  findByIds(ids: string[]): Promise<CityModel[]>;
}
