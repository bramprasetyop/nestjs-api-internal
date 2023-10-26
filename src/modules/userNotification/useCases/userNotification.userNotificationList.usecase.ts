import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import {
  NotificationService,
  config,
  NotificationCategory,
  NotificationType
} from '@wahyoo/wahyoo-shared';
import { UserNotificationListRequest } from '../dto/userNotificationListRequest.dto';
import { ICurrentUserArgs } from 'src/modules/auth/repositories/currentUser.interface';
import { UserNotificationListResponse } from '../dto/userNotificationListResponse.dto';
import { UserNotification } from '../dto/userNotification.dto';

@Injectable()
export class UserNotificationUserNotificationListUseCase implements IUseCase {
  constructor(private notificationService: NotificationService) {}

  private currentUser: ICurrentUserArgs;
  with(currentUser: ICurrentUserArgs) {
    this.currentUser = currentUser;
    return this;
  }

  async execute(
    dto: UserNotificationListRequest
  ): Promise<UserNotificationListResponse> {
    const { page, pageSize } = dto;

    let { appId } = dto;
    if (!appId) {
      appId = config.notificationSvc.appId;
    }

    const res = await this.notificationService.getUserNotifications({
      page,
      pageSize,
      isEmployee: false,
      appId,
      posUserId: this.currentUser.id
    });
    const result: UserNotification[] = res.getResultsList().map(notif => {
      const category: NotificationCategory = Object.values(
        NotificationCategory
      )[notif.getCategory() - 1];
      const type: NotificationType = Object.values(NotificationType)[
        notif.getType() - 1
      ];

      const notification: UserNotification = {
        id: notif.getId(),
        title: notif.getTitle(),
        description: notif.getDescription(),
        type,
        category,
        isRead: notif.getIsread(),
        actionData: notif.getActiondata()
          ? JSON.parse(notif.getActiondata())
          : null,
        actionLink: notif.getActionlink(),
        imageUrl: notif.getImageurl(),
        notificationId: notif.getNotificationid(),
        createdAt: new Date(notif.getCreatedat()),
        updatedAt: new Date(notif.getUpdatedat())
      };
      return notification;
    });

    return {
      notifications: result,
      totalUnread: res.getTotalunread(),
      meta: {
        currentPage: res.getMeta().getCurrentpage(),
        pageSize: res.getMeta().getPagesize(),
        total: res.getMeta().getTotal(),
        totalPage: res.getMeta().getTotalpage()
      }
    };
  }
}
