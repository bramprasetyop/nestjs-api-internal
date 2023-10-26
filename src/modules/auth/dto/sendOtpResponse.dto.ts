import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SendOtpResponse {
  @Field(type => Boolean)
  isSucceed: boolean;

  @Field(type => String, { nullable: true })
  tokenPrefix?: string;

  @Field(type => String, { nullable: true })
  phoneNumber?: string;
}
