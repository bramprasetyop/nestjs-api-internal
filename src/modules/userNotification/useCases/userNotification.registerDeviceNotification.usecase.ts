import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { NotificationService, config } from '@wahyoo/wahyoo-shared';
import { ICurrentUserArgs } from 'src/modules/auth/repositories/currentUser.interface';
import { RegisterDeviceNotificationRequest } from '../dto/registerDeviceNotificationRequest.dto';

@Injectable()
export class UserNotificationRegisterDeviceNotificationUseCase
  implements IUseCase {
  constructor(private notificationService: NotificationService) {}

  private currentUser: ICurrentUserArgs;
  with(currentUser: ICurrentUserArgs) {
    this.currentUser = currentUser;
    return this;
  }

  async execute(dto: RegisterDeviceNotificationRequest): Promise<Boolean> {
    const { deviceId, deviceToken, manufacturer, model, os, osVersion } = dto;

    let { appId } = dto;
    if (!appId) {
      appId = config.notificationSvc.appId;
    }

    const res = await this.notificationService.registerDeviceNotification({
      posUserId: this.currentUser.id,
      appId,
      deviceId,
      deviceToken,
      manufacturer,
      model,
      os,
      osVersion,
      isEmployee: false
    });

    if (res.getId()) {
      return true;
    }
    return false;
  }
}
