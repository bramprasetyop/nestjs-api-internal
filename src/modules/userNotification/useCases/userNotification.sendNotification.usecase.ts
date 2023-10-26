import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import {
  NotificationService,
  UserNotificationService
} from '@wahyoo/wahyoo-shared';
import { SendNotificationRequest } from '../dto/sendNotificationRequest.dto';
import { ScheduledNotificationRepository } from '../repositories/scheduledNotification.repository';

@Injectable()
export class UserNotificationSendNotificationUseCase implements IUseCase {
  constructor(
    private notificationService: NotificationService,
    private userNotificationService: UserNotificationService,
    private scheduledNotificationRepository: ScheduledNotificationRepository
  ) {}

  async execute(dto: SendNotificationRequest): Promise<Boolean> {
    const {
      title,
      description,
      actionLink,
      actionData,
      imageUrl,
      category,
      type,
      checkUniqueNotification,
      scheduleDatetime
    } = dto;

    if (scheduleDatetime) {
      const scheduledNotification = await this.scheduledNotificationRepository.create(
        dto
      );
      return true;
    }

    if (checkUniqueNotification) {
      const isNotificationExist = await this.notificationService.isNotificationAlreadyExist(
        {
          title,
          description,
          type,
          category,
          actionLink,
          actionData: actionData ? JSON.stringify(actionData) : null,
          imageUrl
        }
      );

      if (isNotificationExist && isNotificationExist.array[0]) {
        throw new Error('Notification Already Exist');
      }
    }

    await this.userNotificationService.notifyPosUsers(dto);

    return true;
  }
}
