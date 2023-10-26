import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { ScheduledNotification } from './scheduledNotification.dto';

@ObjectType()
export class ScheduledNotificationGetListResponse {
  @Field(type => [ScheduledNotification])
  scheduledNotifications: ScheduledNotification[];

  @Field()
  meta: PaginationMeta;
}
