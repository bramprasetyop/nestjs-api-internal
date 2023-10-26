import { AuthOtp } from '../dto/authOtp';
import { OrganizationUserModel } from '@wahyoo/wahyoo-shared';
export interface FindByPhoneNumberArgs {
  phoneNumber: string;
  countryCode: string;
}

export interface FindByIdArgs {
  id: string;
}

export interface IOrganizationUserRepository {
  findByPhoneNumber(arg: FindByPhoneNumberArgs): Promise<OrganizationUserModel>;
  findById(arg: FindByIdArgs): Promise<any>;
}
