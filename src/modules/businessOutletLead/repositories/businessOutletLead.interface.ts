import { BusinessOutletLeadModel } from '@wahyoo/wahyoo-shared';
import { BusinessOutletLeadRegisterRequest } from '../dto/businessOutletLeadRegisterRequest.dto';

export class PagingBusinessOutletLeadModel {
  businessOutletLeads: BusinessOutletLeadModel[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}

export interface IBusinessOutletLeadRepository {
  findById(id: string): Promise<BusinessOutletLeadModel>;
  findByIdWithInclude(id: string): Promise<BusinessOutletLeadModel>;
  findByIds(ids: string[]): Promise<BusinessOutletLeadModel[]>;
  findAllByBusinessId(businessId: string): Promise<BusinessOutletLeadModel[]>;
  findAllForCalculateLocationIntersection(
    businessId: string,
    isExcludeBusinessOutletLead: boolean,
    excludedBusinessOutletLeadId: string
  ): Promise<BusinessOutletLeadModel[]>;
  findByOrganizationUser(
    organizationUserId: string,
    businessId: string
  ): Promise<BusinessOutletLeadModel[]>;
  create(
    dto: BusinessOutletLeadRegisterRequest
  ): Promise<BusinessOutletLeadModel>;
}
