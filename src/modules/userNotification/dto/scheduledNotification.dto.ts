import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  ScheduledNotificationStatus,
  ScheduledNotificationModel,
  ScheduledNotificationLogModel
} from '@wahyoo/wahyoo-shared';
import { OrganizationUser } from 'src/modules/user/dto/user.dto';
import JSON from 'graphql-type-json';

registerEnumType(ScheduledNotificationStatus, {
  name: 'ScheduledNotificationStatus',
  description: 'Scheduled Notification Status'
});

@ObjectType()
export class ScheduledNotification {
  constructor(model: ScheduledNotificationModel) {
    this.id = model.id;
    this.notificationPayloadJson = model.notificationPayloadJson;
    this.scheduleDatetime = model.scheduleDatetime;
    this.status = model.status;
    this.createdAt = model.createdAt;
    this.createdBy = model.createdBy;
    this.updatedAt = model.updatedAt;
    this.updatedBy = model.updatedBy;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => JSON)
  notificationPayloadJson: any;

  @Field()
  scheduleDatetime: Date;

  @Field(() => ScheduledNotificationStatus)
  status: ScheduledNotificationStatus;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  createdBy: string;

  @Field(type => OrganizationUser, { nullable: true })
  createdByUser?: OrganizationUser;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field({ nullable: true })
  updatedBy: string;

  @Field(type => OrganizationUser, { nullable: true })
  updatedByUser?: OrganizationUser;

  @Field({ nullable: true })
  deletedAt?: Date;

  scheduledNotificationLogs: ScheduledNotificationLogModel[];
}
