import { BusinessMenuItemModel } from '@wahyoo/wahyoo-shared';
import { BusinessMenuItemCreateRequest } from '../dto/businessMenuItemCreateRequest.dto';
import { BusinessMenuItemGetListRequest } from '../dto/businessMenuItemGetListRequest.dto';
import { BusinessMenuItemUpdateRequest } from '../dto/businessMenuItemUpdateRequest.dto';

export class PagingBusinessMenuItemModel {
  businessMenuItems: BusinessMenuItemModel[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}

export interface IBusinessMenuItemRepository {
  findAll(
    dto: BusinessMenuItemGetListRequest
  ): Promise<PagingBusinessMenuItemModel>;
  findById(id: string): Promise<BusinessMenuItemModel>;
  findAllByMenuCategoryId(id: string): Promise<BusinessMenuItemModel[]>;
  findBySlug(slug: string): Promise<BusinessMenuItemModel>;
  findByIds(ids: string[]): Promise<BusinessMenuItemModel[]>;
  findByMenuCategoryIds(ids: string[]): Promise<BusinessMenuItemModel[]>;
  create(dto: BusinessMenuItemCreateRequest): Promise<BusinessMenuItemModel>;
  update(dto: BusinessMenuItemUpdateRequest): Promise<BusinessMenuItemModel>;
  destroyById(id: string): Promise<boolean>;
}
