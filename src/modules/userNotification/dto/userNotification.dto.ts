import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { NotificationCategory, NotificationType } from '@wahyoo/wahyoo-shared';
import JSON from 'graphql-type-json';

@ObjectType()
export class UserNotification {
  @Field(type => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(type => NotificationCategory)
  category: NotificationCategory;

  @Field(type => NotificationType, { nullable: true })
  type: NotificationType;

  @Field(() => JSON, { nullable: true })
  actionData: object;

  @Field({ nullable: true })
  actionLink: string;

  @Field({ nullable: true })
  imageUrl: string;

  @Field()
  isRead: boolean;

  @Field(type => ID)
  notificationId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
