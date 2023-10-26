import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { UserNotificationResolver } from './userNotification.resolver';
import { UserNotificationGetAllNotificationListUseCase } from './useCases/userNotification.getAllNotificationList.usecase';
import { UserNotificationReadAllNotificationUseCase } from './useCases/userNotification.readAllNotification.usecase';
import { UserNotificationReadNotificationUseCase } from './useCases/userNotification.readNotification.usecase';
import { UserNotificationRegisterDeviceNotificationUseCase } from './useCases/userNotification.registerDeviceNotification.usecase';
import { UserNotificationSendNotificationUseCase } from './useCases/userNotification.sendNotification.usecase';
import { UserNotificationUnregisterDeviceNotificationUseCase } from './useCases/userNotification.unregisterDeviceNotification.usecase';
import { UserNotificationUserNotificationListUseCase } from './useCases/userNotification.userNotificationList.usecase';
import { ScheduledNotificationResolver } from './scheduledNotification.resolver';
import { ScheduledNotificationGetByIdUseCase } from './useCases/scheduledNotification.getById.usecase';
import { ScheduledNotificationGetListUseCase } from './useCases/scheduledNotification.getList.usecase';
import { ScheduledNotificationRepository } from './repositories/scheduledNotification.repository';
import { ScheduledNotificationUpdateUseCase } from './useCases/scheduledNotification.update.usecase';
import { ScheduledNotificationCancelUseCase } from './useCases/scheduledNotification.cancel.usecase';
import {
  CommonModule,
  InjectionKey,
  ScheduledNotificationLogModel,
  ScheduledNotificationModel
} from '@wahyoo/wahyoo-shared';

@Module({
  imports: [UserModule, CommonModule],
  providers: [
    UserNotificationResolver,
    ScheduledNotificationResolver,
    UserNotificationUserNotificationListUseCase,
    UserNotificationReadNotificationUseCase,
    UserNotificationRegisterDeviceNotificationUseCase,
    UserNotificationUnregisterDeviceNotificationUseCase,
    UserNotificationSendNotificationUseCase,
    UserNotificationReadAllNotificationUseCase,
    UserNotificationGetAllNotificationListUseCase,
    ScheduledNotificationGetByIdUseCase,
    ScheduledNotificationGetListUseCase,
    ScheduledNotificationRepository,
    ScheduledNotificationUpdateUseCase,
    ScheduledNotificationCancelUseCase,
    {
      provide: InjectionKey.SCHEDULED_NOTIFICATION_MODEL,
      useValue: ScheduledNotificationModel
    },
    {
      provide: InjectionKey.SCHEDULED_NOTIFICATION_LOG_MODEL,
      useValue: ScheduledNotificationLogModel
    }
  ],
  exports: [ScheduledNotificationRepository]
})
export class UserNotificationModule {}
