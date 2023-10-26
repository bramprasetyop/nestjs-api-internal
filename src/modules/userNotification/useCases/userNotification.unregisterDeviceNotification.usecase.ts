import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { NotificationService, config } from '@wahyoo/wahyoo-shared';
import { ICurrentUserArgs } from 'src/modules/auth/repositories/currentUser.interface';
import { UnregisterDeviceNotificationRequest } from '../dto/unregisterDeviceNotificationRequest.dto';

@Injectable()
export class UserNotificationUnregisterDeviceNotificationUseCase
  implements IUseCase {
  constructor(private notificationService: NotificationService) {}

  private currentUser: ICurrentUserArgs;
  with(currentUser: ICurrentUserArgs) {
    this.currentUser = currentUser;
    return this;
  }

  async execute(dto: UnregisterDeviceNotificationRequest): Promise<Boolean> {
    const { deviceId, deviceToken } = dto;

    let { appId } = dto;
    if (!appId) {
      appId = config.notificationSvc.appId;
    }

    const res = await this.notificationService.unregisterDeviceNotification({
      posUserId: this.currentUser.id,
      appId,
      deviceId,
      deviceToken,
      isEmployee: false
    });

    if (res.getSuccess()) {
      return true;
    }
    return false;
  }
}
