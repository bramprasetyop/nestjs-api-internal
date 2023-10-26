import { ArgsType, Field, InputType, registerEnumType } from '@nestjs/graphql';
import { AuthOtpSendMethod } from '@wahyoo/wahyoo-shared';
import { MaxLength } from 'class-validator';

registerEnumType(AuthOtpSendMethod, {
  name: 'AuthOtpSendMethod',
  description: 'AuthOtp Send Method'
});

@InputType()
export class OrganizationUserRegisterRequest {
  @Field()
  @MaxLength(255)
  name: string;

  @Field()
  phoneNumber: string;

  @Field()
  countryCode: string;

  @Field()
  email: string;

  @Field()
  birthDate: Date;

  @Field()
  organizationKnowSource: string;

  @Field()
  interestedBrand: string;

  @Field()
  otpCode: string;

  @Field()
  sendMethod: AuthOtpSendMethod;
}
