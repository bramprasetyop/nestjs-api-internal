import { Injectable, NotFoundException } from '@nestjs/common';
import { ScheduledNotificationModel } from '@wahyoo/wahyoo-shared';
import { IUseCase } from 'src/commons/useCase.interface';
import { ScheduledNotificationRepository } from '../repositories/scheduledNotification.repository';
import { ScheduledNotificationMapper } from '../mappers/scheduledNotification.mapper';
import { ScheduledNotification } from '../dto/scheduledNotification.dto';

@Injectable()
export class ScheduledNotificationGetByIdUseCase implements IUseCase {
  constructor(private readonly repository: ScheduledNotificationRepository) {}
  async execute(id: string): Promise<ScheduledNotification> {
    const scheduledNotificationModel: ScheduledNotificationModel = await this.repository.findById(
      id
    );
    if (!scheduledNotificationModel) throw new NotFoundException(id);
    return ScheduledNotificationMapper.modelToDTO(scheduledNotificationModel);
  }
}
