import { ScheduledNotificationListRequest } from '../dto/scheduledNotificationListRequest.dto';
import { ScheduledNotificationGetListResponse } from '../dto/scheduledNotificationGetListResponse.dto';
import { ScheduledNotificationModel } from '@wahyoo/wahyoo-shared';
import { SendNotificationRequest } from '../dto/sendNotificationRequest.dto';
import { ScheduledNotificationUpdateRequest } from '../dto/scheduledNotificationUpdateRequest.dto';

export class PagingScheduledNotificationModel {
  scheduledNotifications: ScheduledNotificationModel[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}

export interface IScheduledNotificationRepository {
  findAll(
    dto: ScheduledNotificationListRequest
  ): Promise<PagingScheduledNotificationModel>;
  findById(id: string): Promise<ScheduledNotificationModel>;
  update(
    dto: ScheduledNotificationUpdateRequest
  ): Promise<ScheduledNotificationModel>;
  cancel(id: string): Promise<ScheduledNotificationModel>;
  destroyById(id: string): Promise<Boolean>;
  create(dto: SendNotificationRequest): Promise<ScheduledNotificationModel>;
}
