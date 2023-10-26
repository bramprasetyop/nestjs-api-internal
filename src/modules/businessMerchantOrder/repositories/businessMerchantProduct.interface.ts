import { BusinessMerchantProductModel } from '@wahyoo/wahyoo-shared';
import { BusinessMerchantProductGetListRequest } from '../dto/businessMerchantProductGetListRequest.dto';

export class PagingBusinessMerchantProductModel {
  businessMerchantProducts: BusinessMerchantProductModel[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}

export interface IBusinessMerchantProductRepository {
  findByIds(ids: string[]): Promise<BusinessMerchantProductModel[]>;
  findAll(
    dto: BusinessMerchantProductGetListRequest
  ): Promise<PagingBusinessMerchantProductModel>;
}
