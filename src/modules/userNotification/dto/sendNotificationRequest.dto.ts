import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import {
  NotificationCategory,
  NotificationType,
  NotificationTargetUser
} from '@wahyoo/wahyoo-shared';
import JSON from 'graphql-type-json';

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
export class SendNotificationRequest {
  @Field(type => [String], { nullable: true })
  posUserIds: string[];

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(type => NotificationCategory)
  category: NotificationCategory;

  @Field(type => NotificationType)
  type: NotificationType;

  @Field(() => JSON, { nullable: true })
  actionData: any;

  @Field({ nullable: true })
  actionLink: string;

  @Field({ nullable: true })
  imageUrl: string;

  @Field()
  checkUniqueNotification: boolean;

  @Field(type => [NotificationTargetUser], { nullable: true })
  targetUsers: NotificationTargetUser[];

  @Field({ nullable: true })
  scheduleDatetime: Date;

  @Field(type => [String], { nullable: true })
  businessIds: string[];

  createdBy: string;
}
