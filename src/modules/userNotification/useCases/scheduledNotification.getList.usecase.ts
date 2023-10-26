import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { ScheduledNotificationGetListResponse } from '../dto/scheduledNotificationGetListResponse.dto';
import { ScheduledNotificationListRequest } from '../dto/scheduledNotificationListRequest.dto';
import { ScheduledNotificationRepository } from '../repositories/scheduledNotification.repository';
import { ScheduledNotificationMapper } from '../mappers/scheduledNotification.mapper';

@Injectable()
export class ScheduledNotificationGetListUseCase implements IUseCase {
  constructor(private readonly repository: ScheduledNotificationRepository) {}
  async execute(
    dto: ScheduledNotificationListRequest
  ): Promise<ScheduledNotificationGetListResponse> {
    const result = await this.repository.findAll(dto);

    const response: ScheduledNotificationGetListResponse = {
      scheduledNotifications: ScheduledNotificationMapper.modelsToDTOs(
        result.scheduledNotifications
      ),
      meta: { ...result.meta }
    };
    return response;
  }
}
