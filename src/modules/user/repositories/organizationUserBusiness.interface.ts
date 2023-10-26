import { OrganizationUserBusinessModel } from '@wahyoo/wahyoo-shared';

export class PagingOrganizationUserBusinessModel {
  organizationUserBusinesses: OrganizationUserBusinessModel[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}
export interface findByFieldsArgs {
  organizationUserId?: string;
  businessId?: string;
}
export interface IOrganizationUserBusinessRepository {
  findById(id: string): Promise<OrganizationUserBusinessModel>;
  findByBusinessIds(ids: string[]): Promise<OrganizationUserBusinessModel[]>;
  findByFields(args: findByFieldsArgs): Promise<OrganizationUserBusinessModel>;
}
