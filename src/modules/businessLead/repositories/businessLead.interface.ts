import { BusinessLeadModel } from '@wahyoo/wahyoo-shared';
import { BusinessLeadUpdateRequest } from '../dto/businessLeadUpdateRequest.dto';
import { BusinessLeadCreateRequest } from '../dto/businessLeadCreateRequest.dto';
import { BusinessLeadGetListRequest } from '../dto/businessLeadGetListRequest.dto';

export class PagingBusinessLeadModel {
  totalUncompleted: number;
  businessLeads: BusinessLeadModel[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}

export interface IBusinessLeadRepository {
  findAll(dto: BusinessLeadGetListRequest): Promise<PagingBusinessLeadModel>;
  findById(id: string): Promise<BusinessLeadModel>;
  create(dto: BusinessLeadCreateRequest): Promise<BusinessLeadModel>;
  updateAsDraft(dto: BusinessLeadUpdateRequest): Promise<BusinessLeadModel>;
  updateAsPublished(dto: BusinessLeadUpdateRequest): Promise<BusinessLeadModel>;
}
