import { OrganizationModel } from '@wahyoo/wahyoo-shared';
import { OrganizationCreateRequest } from '../dto/organizationCreateRequest.dto';
import { OrganizationGetListRequest } from '../dto/organizationGetListRequest.dto';

export class PagingOrganizationModel {
  organizations: OrganizationModel[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}

export interface IOrganizationRepository {
  findAll(dto: OrganizationGetListRequest): Promise<PagingOrganizationModel>;
  findById(id: string): Promise<OrganizationModel>;
  findByIds(ids: string[]): Promise<OrganizationModel[]>;
  create(dto: OrganizationCreateRequest): Promise<OrganizationModel>;
}
