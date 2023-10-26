import { BusinessSalesChannelModel } from '@wahyoo/wahyoo-shared';
import { BusinessSalesChannelCreateRequest } from '../dto/businessSalesChannelCreateRequest.dto';
import { BusinessSalesChannelGetListRequest } from '../dto/businessSalesChannelGetListRequest.dto';
import { BusinessSalesChannelUpdateRequest } from '../dto/businessSalesChannelUpdateRequest.dto';

export class PagingBusinessSalesChannelModel {
  businessSalesChannels: BusinessSalesChannelModel[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}

export interface IBusinessSalesChannelRepository {
  findAll(
    dto: BusinessSalesChannelGetListRequest
  ): Promise<PagingBusinessSalesChannelModel>;
  findById(id: string): Promise<BusinessSalesChannelModel>;
  findByIds(ids: string[]): Promise<BusinessSalesChannelModel[]>;
  create(
    dto: BusinessSalesChannelCreateRequest
  ): Promise<BusinessSalesChannelModel>;
  update(
    dto: BusinessSalesChannelUpdateRequest
  ): Promise<BusinessSalesChannelModel>;
  destroyById(id: string): Promise<Boolean>;
}
