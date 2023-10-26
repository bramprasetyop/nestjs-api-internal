import { OrganizationUserBusinessOutletModel } from '@wahyoo/wahyoo-shared';

export class PagingOrganizationUserBusinessOutletModel {
  organizationUserBusinessOutlets: OrganizationUserBusinessOutletModel[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}
export interface findByFieldsArgs {
  organizationUserId?: string;
  businessOutletId?: string;
}
export interface findAllByRoleAndOrganizationUserIdArgs {
  organizationUserId?: string;
  role?: string;
}
export interface IOrganizationUserBusinessOutletRepository {
  findById(id: string): Promise<OrganizationUserBusinessOutletModel>;
  findAllByRoleAndOrganizationUserId(
    args: findAllByRoleAndOrganizationUserIdArgs
  ): Promise<OrganizationUserBusinessOutletModel[]>;
  findByBusinessOutletIds(
    ids: string[]
  ): Promise<OrganizationUserBusinessOutletModel[]>;
  findByFields(
    args: findByFieldsArgs
  ): Promise<OrganizationUserBusinessOutletModel>;
  findByBusinessIds(
    ids: string[]
  ): Promise<OrganizationUserBusinessOutletModel[]>;
}
