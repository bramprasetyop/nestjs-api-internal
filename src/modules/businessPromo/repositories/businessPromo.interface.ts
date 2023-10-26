import { BusinessPromosModel } from '@wahyoo/wahyoo-shared';
import { BusinessPromoUpdateRequest } from '../dto/businessPromoUpdateRequest.dto';
import { BusinessPromoCreateRequest } from '../dto/businessPromoCreateRequest.dto';
import { BusinessPromoGetListRequest } from '../dto/businessPromoGetListRequest.dto';

export class PagingBusinessPromoModel {
  businessPromo: BusinessPromosModel[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}

export interface IBusinessPromoRepository {
  findAll(dto: BusinessPromoGetListRequest): Promise<PagingBusinessPromoModel>;
  findById(id: string): Promise<BusinessPromosModel>;
  findByIds(ids: string[]): Promise<BusinessPromosModel[]>;
  create(dto: BusinessPromoCreateRequest): Promise<BusinessPromosModel>;
  update(dto: BusinessPromoUpdateRequest): Promise<BusinessPromosModel>;
  destroyById(id: string): Promise<Boolean>;
}
