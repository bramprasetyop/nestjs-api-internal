import { BusinessSalesChannelCategoryModel } from '@wahyoo/wahyoo-shared';
import { BusinessSalesChannelCategoryCreateRequest } from '../dto/businessSalesChannelCategoryCreateRequest.dto';
import { BusinessSalesChannelCategoryGetListRequest } from '../dto/businessSalesChannelCategoryGetListRequest.dto';
import { BusinessSalesChannelCategoryUpdateRequest } from '../dto/businessSalesChannelCategoryUpdateRequest.dto';

export class PagingBusinessSalesChannelCategoryModel {
  businessSalesChannelCategories: BusinessSalesChannelCategoryModel[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}

export interface IBusinessSalesChannelCategoryRepository {
  findAll(
    dto: BusinessSalesChannelCategoryGetListRequest
  ): Promise<PagingBusinessSalesChannelCategoryModel>;
  findById(id: string): Promise<BusinessSalesChannelCategoryModel>;
  findByIds(ids: string[]): Promise<BusinessSalesChannelCategoryModel[]>;
  create(
    dto: BusinessSalesChannelCategoryCreateRequest
  ): Promise<BusinessSalesChannelCategoryModel>;
  update(
    dto: BusinessSalesChannelCategoryUpdateRequest
  ): Promise<BusinessSalesChannelCategoryModel>;
  destroyById(id: string): Promise<Boolean>;
}
