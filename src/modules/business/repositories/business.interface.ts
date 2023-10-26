import { BusinessModel } from '@wahyoo/wahyoo-shared';
import { BusinessCreateRequest } from '../dto/businessCreateRequest.dto';
import { BusinessGetListRequest } from '../dto/businessGetListRequest.dto';
import { BusinessUpdateRequest } from '../dto/businessUpdateRequest.dto';

export class PagingBusinessModel {
  businesses: BusinessModel[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}

export interface IBusinessRepository {
  findAll(dto: BusinessGetListRequest): Promise<PagingBusinessModel>;
  findById(id: string): Promise<BusinessModel>;
  findByBusinessMenuItemId(id: string): Promise<BusinessModel>;
  findByBusinessMenuCategoryId(id: string): Promise<BusinessModel>;
  findByIds(ids: string[]): Promise<BusinessModel[]>;
  create(dto: BusinessCreateRequest): Promise<BusinessModel>;
  update(dto: BusinessUpdateRequest): Promise<BusinessModel>;
  destroyById(id: string): Promise<Boolean>;
}
