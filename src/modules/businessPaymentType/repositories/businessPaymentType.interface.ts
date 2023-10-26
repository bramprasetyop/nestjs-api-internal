import { BusinessPaymentTypeModel } from '@wahyoo/wahyoo-shared';
import { BusinessPaymentTypeCreateRequest } from '../dto/businessPaymentTypeCreateRequest.dto';
import { BusinessPaymentTypeGetListRequest } from '../dto/businessPaymentTypeGetListRequest.dto';
import { BusinessPaymentTypeUpdateRequest } from '../dto/businessPaymentTypeUpdateRequest.dto';

export class PagingBusinessPaymentTypeModel {
  businessPaymentTypes: BusinessPaymentTypeModel[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}

export interface IBusinessPaymentTypeRepository {
  findAll(
    dto: BusinessPaymentTypeGetListRequest
  ): Promise<PagingBusinessPaymentTypeModel>;
  findById(id: string): Promise<BusinessPaymentTypeModel>;
  findByIds(ids: string[]): Promise<BusinessPaymentTypeModel[]>;
  create(
    dto: BusinessPaymentTypeCreateRequest
  ): Promise<BusinessPaymentTypeModel>;
  update(
    dto: BusinessPaymentTypeUpdateRequest
  ): Promise<BusinessPaymentTypeModel>;
  destroyById(id: string): Promise<Boolean>;
}
