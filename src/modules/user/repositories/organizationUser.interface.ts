import { OrganizationUserModel } from '@wahyoo/wahyoo-shared';
export class PagingOrganizationUserModel {
  organizationUsers: OrganizationUserModel[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}
export interface FindByPhoneNumberArgs {
  phoneNumber: string;
  countryCode: string;
}

export interface IOrganizationUserRepository {
  findByPhoneNumber(arg: FindByPhoneNumberArgs): Promise<OrganizationUserModel>;
  findById(id: string): Promise<any>;
}
