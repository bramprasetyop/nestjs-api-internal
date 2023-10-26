import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { NotificationService } from '@wahyoo/wahyoo-shared';
import { ICurrentUserArgs } from 'src/modules/auth/repositories/currentUser.interface';
import { ReadNotificationRequest } from '../dto/readNotificationRequest.dto';

@Injectable()
export class UserNotificationReadNotificationUseCase implements IUseCase {
  constructor(private notificationService: NotificationService) {}

  private currentUser: ICurrentUserArgs;
  with(currentUser: ICurrentUserArgs) {
    this.currentUser = currentUser;
    return this;
  }

  async execute(dto: ReadNotificationRequest): Promise<Boolean> {
    const { notificationId } = dto;
    const res = await this.notificationService.readNotification({
      posUserId: this.currentUser.id,
      notificationId
    });

    if (res.getSuccess()) {
      return true;
    }
    return false;
  }
}
