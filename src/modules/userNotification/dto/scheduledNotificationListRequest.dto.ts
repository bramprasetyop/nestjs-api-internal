import {
  ArgsType,
  Field,
  InputType,
  Int,
  registerEnumType
} from '@nestjs/graphql';
import { ScheduledNotificationStatus } from '@wahyoo/wahyoo-shared';
import { SortBy } from 'src/commons/pagination.dto';

registerEnumType(ScheduledNotificationStatus, {
  name: 'ScheduledNotificationStatus',
  description: 'Scheduled Notification Status'
});

@InputType()
export class ScheduledNotificationFilter {
  @Field(type => ScheduledNotificationStatus, { nullable: true })
  status: ScheduledNotificationStatus;
}

@ArgsType()
export class ScheduledNotificationListRequest {
  @Field(type => Int, { nullable: true, defaultValue: 0 })
  page?: number;

  @Field(type => Int, { nullable: true, defaultValue: 10 })
  pageSize?: number;

  @Field(type => SortBy, {
    nullable: true,
    defaultValue: {
      columnName: 'createdAt',
      sortOrder: 'ASC'
    }
  })
  sortBy?: SortBy;

  @Field({ nullable: true })
  filter?: ScheduledNotificationFilter;

  @Field({ nullable: true })
  search?: string;
}
