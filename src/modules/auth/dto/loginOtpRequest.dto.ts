import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { AuthOtpSendMethod } from '@wahyoo/wahyoo-shared';
import { MaxLength } from 'class-validator';

registerEnumType(AuthOtpSendMethod, {
  name: 'AuthOtpSendMethod',
  description: 'AuthOtp Send Method'
});

@InputType()
export class LoginOtpRequest {
  @Field()
  @MaxLength(30)
  phoneNumber: string;

  @Field()
  @MaxLength(4)
  otpCode: string;

  @Field(type => AuthOtpSendMethod)
  sendMethod: AuthOtpSendMethod;
}
