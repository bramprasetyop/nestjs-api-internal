import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class VerifyPhoneNumberRequest {
  @Field()
  @MaxLength(30)
  phoneNumber: string;
}
