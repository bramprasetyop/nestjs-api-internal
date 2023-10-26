import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class UserNotificationListRequest {
  @Field(() => String, { nullable: true })
  appId: string;

  @Field(type => Int)
  page: number;

  @Field(type => Int)
  pageSize: number;
}
