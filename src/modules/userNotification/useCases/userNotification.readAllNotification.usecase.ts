import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { NotificationService, config } from '@wahyoo/wahyoo-shared';
import { ICurrentUserArgs } from 'src/modules/auth/repositories/currentUser.interface';

@Injectable()
export class UserNotificationReadAllNotificationUseCase implements IUseCase {
  constructor(private notificationService: NotificationService) {}

  private currentUser: ICurrentUserArgs;
  with(currentUser: ICurrentUserArgs) {
    this.currentUser = currentUser;
    return this;
  }

  async execute(appId): Promise<Boolean> {
    if (!appId) {
      appId = config.notificationSvc.appId;
    }

    const res = await this.notificationService.readAllNotification({
      posUserId: this.currentUser.id,
      appId
    });

    if (res.getSuccess()) {
      return true;
    }
    return false;
  }
}
