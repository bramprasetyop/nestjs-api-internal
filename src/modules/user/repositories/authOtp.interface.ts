import {
  AuthOtpModel,
  AuthOtpProviderMissedCall,
  AuthOtpProviderSms,
  AuthOtpProviderWhatsapp,
  AuthOtpSendMethod,
  AuthOtpType
} from '@wahyoo/wahyoo-shared';

export interface CreateRegisterOtpArgs {
  phoneNumber: string;
  countryCode: string;
  type: AuthOtpType;
  isUsed: boolean;
  validUntil: Date;
  code: string;
  tokenPrefix: string;
  tokenCode: string;
  isRevoked: boolean;
  providerSms: AuthOtpProviderSms;
  providerWhatsapp: AuthOtpProviderWhatsapp;
  providerMissedCall: AuthOtpProviderMissedCall;
  sendMethod: AuthOtpSendMethod;
  counterAttempt: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FindByRegisterCodeArgs {
  code: string;
  sendMethod: string;
}

export interface IAuthOtpRepository {
  createRegisterOtp(dto: CreateRegisterOtpArgs): Promise<AuthOtpModel>;
  findByRegisterCode(arg: FindByRegisterCodeArgs): Promise<AuthOtpModel>;
}
