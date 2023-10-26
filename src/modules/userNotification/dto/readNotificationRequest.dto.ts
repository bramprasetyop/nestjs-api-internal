import { Field, ArgsType, ID } from '@nestjs/graphql';

@ArgsType()
export class ReadNotificationRequest {
  @Field(type => ID)
  notificationId: number;
}
