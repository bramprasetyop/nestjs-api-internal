import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { Notification } from './notification.dto';

@ObjectType()
export class GetAllNotificationListResponse {
  @Field(type => [Notification])
  notifications: Notification[];

  @Field()
  meta: PaginationMeta;
}
