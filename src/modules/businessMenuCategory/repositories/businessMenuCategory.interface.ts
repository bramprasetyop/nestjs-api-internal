import { BusinessMenuCategoryModel } from '@wahyoo/wahyoo-shared';
import { BusinessMenuCategoryGetListRequest } from '../dto/businessMenuCategoryGetListRequest.dto';
import { BusinessMenuCategoryCreateRequest } from '../dto/businessMenuCategoryCreateRequest.dto';
import { BusinessMenuCategoryUpdateRequest } from '../dto/businessMenuCategoryUpdateRequest.dto';

export class PagingBusinessMenuCategoryModel {
  businessMenuCategories: BusinessMenuCategoryModel[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}

export interface IBusinessMenuCategoryRepository {
  findAll(
    dto: BusinessMenuCategoryGetListRequest
  ): Promise<PagingBusinessMenuCategoryModel>;
  findById(id: string): Promise<BusinessMenuCategoryModel>;
  findByIds(id: string[]): Promise<BusinessMenuCategoryModel[]>;
  create(
    dto: BusinessMenuCategoryCreateRequest
  ): Promise<BusinessMenuCategoryModel>;
  update(
    dto: BusinessMenuCategoryUpdateRequest
  ): Promise<BusinessMenuCategoryModel>;
  destroyById(id: string): Promise<boolean>;
}
