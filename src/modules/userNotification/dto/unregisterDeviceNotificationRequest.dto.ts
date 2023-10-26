import { Field, InputType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { UserNotification } from './userNotification.dto';

@InputType()
export class UnregisterDeviceNotificationRequest {
  @Field(() => String, { nullable: true })
  appId: string;

  @Field()
  deviceToken: string;

  @Field({ nullable: true })
  deviceId: string;
}
