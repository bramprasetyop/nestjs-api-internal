import { Field, Int, ObjectType } from '@nestjs/graphql';
import { type } from 'os';
import { PaginationMeta } from 'src/commons/paginationMeta.dto';
import { UserNotification } from './userNotification.dto';

@ObjectType()
export class UserNotificationListResponse {
  @Field(type => [UserNotification])
  notifications: UserNotification[];

  @Field(type => Int)
  totalUnread: number;

  @Field()
  meta: PaginationMeta;
}
