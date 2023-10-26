import { BusinessOutletModel } from '@wahyoo/wahyoo-shared';
import { BusinessOutletCreateRequest } from '../dto/businessOutletCreateRequest.dto';
import { BusinessOutletGetListRequest } from '../dto/businessOutletGetListRequest.dto';
import { BusinessOutletUpdateRequest } from '../dto/businessOutletUpdateRequest.dto';

export class PagingBusinessOutletModel {
  businessOutlets: BusinessOutletModel[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}

export interface IBusinessOutletRepository {
  findAll(
    dto: BusinessOutletGetListRequest
  ): Promise<PagingBusinessOutletModel>;
  findAllByXWahyooKioskIds(
    xWahyooKioskIds: number[]
  ): Promise<BusinessOutletModel[]>;
  findAllByBusinessId(businessId: string): Promise<BusinessOutletModel[]>;
  findByIds(id: string[]): Promise<BusinessOutletModel[]>;
  findById(id: string): Promise<BusinessOutletModel>;
  create(dto: BusinessOutletCreateRequest): Promise<BusinessOutletModel>;
  update(
    dto: BusinessOutletUpdateRequest,
    transaction: any
  ): Promise<BusinessOutletModel>;
  delete(id: string): Promise<Boolean>;
}
