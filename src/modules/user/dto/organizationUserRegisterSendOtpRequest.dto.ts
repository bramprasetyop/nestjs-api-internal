import { ArgsType, Field, InputType, registerEnumType } from '@nestjs/graphql';
import { AuthOtpSendMethod } from '@wahyoo/wahyoo-shared';
import { MaxLength } from 'class-validator';

registerEnumType(AuthOtpSendMethod, {
  name: 'AuthOtpSendMethod',
  description: 'AuthOtp Send Method'
});

@InputType()
export class OrganizationUserRegisterSendOtpRequest {
  @Field()
  @MaxLength(30)
  phoneNumber: string;

  @Field(type => AuthOtpSendMethod)
  sendMethod: AuthOtpSendMethod;
}
