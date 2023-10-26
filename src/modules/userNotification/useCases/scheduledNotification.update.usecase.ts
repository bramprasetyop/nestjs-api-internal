import { Injectable, NotFoundException } from '@nestjs/common';
// import { NotificationTargetUser } from '@wahyoo/wahyoo-shared';
import { IUseCase } from 'src/commons/useCase.interface';
import { ScheduledNotification } from '../dto/scheduledNotification.dto';
import { ScheduledNotificationUpdateRequest } from '../dto/scheduledNotificationUpdateRequest.dto';
import { ScheduledNotificationMapper } from '../mappers/scheduledNotification.mapper';
import { ScheduledNotificationRepository } from '../repositories/scheduledNotification.repository';

@Injectable()
export class ScheduledNotificationUpdateUseCase implements IUseCase {
  constructor(
    private readonly scheduledNotificationRepository: ScheduledNotificationRepository
  ) {}
  async execute(
    dto: ScheduledNotificationUpdateRequest
  ): Promise<ScheduledNotification> {
    const { id } = dto;
    const existingScheduledNotification = await this.scheduledNotificationRepository.findById(
      id
    );

    if (!existingScheduledNotification) throw new NotFoundException(id);

    const scheduledNotificationUpdate = await this.scheduledNotificationRepository.update(
      dto
    );

    return ScheduledNotificationMapper.modelToDTO(scheduledNotificationUpdate);
  }
}
