import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { ScheduledNotification } from '../dto/scheduledNotification.dto';
import { ScheduledNotificationMapper } from '../mappers/scheduledNotification.mapper';
import { ScheduledNotificationRepository } from '../repositories/scheduledNotification.repository';

@Injectable()
export class ScheduledNotificationCancelUseCase implements IUseCase {
  constructor(
    private readonly scheduledNotificationRepository: ScheduledNotificationRepository
  ) {}

  async execute(id: string): Promise<ScheduledNotification> {
    const existingScheduledNotification = await this.scheduledNotificationRepository.findById(
      id
    );

    if (!existingScheduledNotification) throw new NotFoundException(id);

    const scheduledNotificationCancel = await this.scheduledNotificationRepository.cancel(
      id
    );

    return ScheduledNotificationMapper.modelToDTO(scheduledNotificationCancel);
  }
}
