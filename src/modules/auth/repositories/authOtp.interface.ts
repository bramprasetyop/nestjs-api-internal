import { AuthOtp } from '../dto/authOtp';
import { AuthOtpModel } from '@wahyoo/wahyoo-shared';
export interface FindByCodeArgs {
  code: string;
  sendMethod: string;
  organizationUserId: string;
}

export interface FindLastValidOtpArgs {
  sendMethod: string;
  organizationUserId: string;
  type: string;
}

export interface FindByRegisterCodeArgs {
  code: string;
  sendMethod: string;
}

export interface IAuthOtpRepository {
  findByCode(arg: FindByCodeArgs): Promise<AuthOtpModel>;
  create(dto: AuthOtp): Promise<AuthOtpModel>;
  findByRegisterCode(arg: FindByRegisterCodeArgs): Promise<AuthOtpModel>;
}
