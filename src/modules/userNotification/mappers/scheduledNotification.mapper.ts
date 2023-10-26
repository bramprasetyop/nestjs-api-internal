import { ScheduledNotificationModel } from '@wahyoo/wahyoo-shared';
import { ScheduledNotification } from '../dto/scheduledNotification.dto';

export class ScheduledNotificationMapper {
  public static modelToDTO(
    model: ScheduledNotificationModel
  ): ScheduledNotification {
    return new ScheduledNotification(model);
  }

  public static modelsToDTOs(
    models: ScheduledNotificationModel[]
  ): ScheduledNotification[] {
    return models.map(model => ScheduledNotificationMapper.modelToDTO(model));
  }
}
