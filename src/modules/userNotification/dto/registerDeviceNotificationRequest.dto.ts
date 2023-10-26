import { Field, InputType, registerEnumType } from '@nestjs/graphql';

@InputType()
export class RegisterDeviceNotificationRequest {
  @Field(() => String, { nullable: true })
  appId: string;

  @Field()
  deviceToken: string;

  @Field({ nullable: true })
  deviceId: string;

  @Field({ nullable: true })
  os: string;

  @Field({ nullable: true })
  osVersion: string;

  @Field({ nullable: true })
  manufacturer: string;

  @Field({ nullable: true })
  model: string;
}
