import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import {
  NotificationService,
  NotificationCategory,
  NotificationType,
  config
} from '@wahyoo/wahyoo-shared';
import { GetAllNotificationListRequest } from '../dto/getAllNotificationListRequest.dto';
import { GetAllNotificationListResponse } from '../dto/getAllNotificationListResponse.dto';
import { Notification } from '../dto/notification.dto';

@Injectable()
export class UserNotificationGetAllNotificationListUseCase implements IUseCase {
  constructor(private notificationService: NotificationService) {}

  async execute(
    dto: GetAllNotificationListRequest
  ): Promise<GetAllNotificationListResponse> {
    const { page, pageSize, search, filter, sortBy } = dto;
    const res = await this.notificationService.getNotifications({
      page,
      pageSize,
      search,
      filter,
      sortBy
    });

    const result: Notification[] = res.getResultsList().map(notif => {
      const category: NotificationCategory = Object.values(
        NotificationCategory
      )[notif.getCategory() - 1];
      const type: NotificationType = Object.values(NotificationType)[
        notif.getType() - 1
      ];

      const notification: Notification = {
        id: notif.getId(),
        title: notif.getTitle(),
        description: notif.getDescription(),
        type,
        category,
        actionData: notif.getActiondata()
          ? JSON.parse(notif.getActiondata())
          : null,
        actionLink: notif.getActionlink(),
        imageUrl: notif.getImageurl(),
        createdAt: new Date(notif.getCreatedat()),
        updatedAt: new Date(notif.getUpdatedat())
      };
      return notification;
    });

    return {
      notifications: result,
      meta: {
        currentPage: res.getMeta().getCurrentpage(),
        pageSize: res.getMeta().getPagesize(),
        total: res.getMeta().getTotal(),
        totalPage: res.getMeta().getTotalpage()
      }
    };
  }
}
