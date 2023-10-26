import { Field, ID, InputType, registerEnumType } from '@nestjs/graphql';
import JSON from 'graphql-type-json';
import {
  NotificationCategory,
  NotificationType,
  NotificationTargetUser
} from '@wahyoo/wahyoo-shared';

registerEnumType(NotificationCategory, {
  name: 'NotificationCategory',
  description: 'Notification Category'
});

registerEnumType(NotificationType, {
  name: 'NotificationType',
  description: 'Notification Type'
});

registerEnumType(NotificationTargetUser, {
  name: 'NotificationTargetUser',
  description: 'Notification Target User'
});

@InputType()
export class NotificationPayload {
  @Field(type => [String])
  posUserIds: string[];

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => NotificationCategory)
  category: NotificationCategory;

  @Field(() => NotificationType)
  type: NotificationType;

  @Field(type => JSON)
  actionData: any;

  @Field()
  actionLink: string;

  @Field()
  imageUrl: string;

  @Field()
  checkUniqueNotification: boolean;

  @Field(() => [NotificationTargetUser])
  targetUsers: NotificationTargetUser[];

  @Field(type => [ID])
  businessIds: string[];
}

@InputType()
export class ScheduledNotificationUpdateRequest {
  @Field(type => ID)
  id: string;

  @Field(type => NotificationPayload)
  notificationPayloadJson: NotificationPayload;

  @Field()
  scheduleDatetime: Date;
}
