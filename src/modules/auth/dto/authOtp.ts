import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  AuthOtpModel,
  AuthOtpProviderMissedCall,
  AuthOtpProviderSms,
  AuthOtpProviderWhatsapp,
  AuthOtpSendMethod,
  AuthOtpType
} from '@wahyoo/wahyoo-shared';

registerEnumType(AuthOtpSendMethod, {
  name: 'AuthOtpSendMethod',
  description: 'AuthOtp Send Method'
});

@ObjectType()
export class AuthOtp {
  constructor(model: AuthOtpModel) {}

  @Field(type => ID)
  id: string;

  @Field()
  phoneNumber: string;

  @Field()
  countryCode: string;

  @Field()
  organizationUserId: string;

  @Field()
  type: AuthOtpType;

  @Field()
  isUsed: boolean;

  @Field()
  validUntil: Date;

  @Field()
  code: string;

  @Field()
  tokenPrefix: string;

  @Field()
  tokenCode: string;

  @Field()
  isRevoked: boolean;

  @Field()
  providerSms: AuthOtpProviderSms;

  @Field()
  providerWhatsapp: AuthOtpProviderWhatsapp;

  @Field()
  providerMissedCall: AuthOtpProviderMissedCall;

  @Field()
  sendMethod: AuthOtpSendMethod;

  @Field()
  counterAttempt: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
