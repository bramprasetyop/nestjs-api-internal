import { ArgsType, Field, InputType, ID, Int } from '@nestjs/graphql';
import { NotificationCategory, NotificationType } from '@wahyoo/wahyoo-shared';
import { SortBy, SortOrder } from 'src/commons/pagination.dto';

@InputType()
export class NotificationFilter {
  @Field(type => NotificationCategory, { nullable: true })
  category: NotificationCategory;

  @Field(type => NotificationType, { nullable: true })
  type: NotificationType;
}

@InputType()
export class SearchNotification {
  @Field(type => [String])
  inColumns: string[];

  @Field()
  query: string;
}

@ArgsType()
export class GetAllNotificationListRequest {
  @Field(type => Int, { nullable: true, defaultValue: 0 })
  page?: number;

  @Field(type => Int, { nullable: true, defaultValue: 10 })
  pageSize?: number;

  @Field(type => SortBy, {
    nullable: true,
    defaultValue: {
      columnName: 'createdAt',
      sortOrder: 'DESC'
    }
  })
  sortBy?: SortBy;

  @Field({ nullable: true })
  filter: NotificationFilter;

  @Field({ nullable: true })
  search?: SearchNotification;
}
