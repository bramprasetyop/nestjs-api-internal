import { IUseCase } from 'src/commons/useCase.interface';
import { Sequelize } from 'sequelize';
import { Inject, Injectable } from '@nestjs/common';
import {
  BusinessModel,
  BusinessOutletLeadModel,
  BusinessOutletLeadNotificationService,
  InjectionKey
} from '@wahyoo/wahyoo-shared';

@Injectable()
export class BusinessOutletLeadExpiredReminderUseCase implements IUseCase {
  private sequelize: Sequelize;
  constructor(
    @Inject(InjectionKey.BUSINESS_OUTLET_LEAD_MODEL)
    private readonly businessOutletLeadModel: typeof BusinessOutletLeadModel,
    private businessOutletLeadNotification: BusinessOutletLeadNotificationService
  ) {
    this.sequelize = this.businessOutletLeadModel.sequelize;
  }

  async execute() {
    this.notifyUserReminderByDay(3);
    this.notifyUserReminderByDay(1);
  }

  private async notifyUserReminderByDay(dayUntil: number) {
    try {
      const businessOutletLead = await this.businessOutletLeadModel.findAll({
        where: this.sequelize.Sequelize.literal(`
          ongoing_status IN ('location_approved')
          AND rejected_reason IS NULL
          AND DATE(expired_schedule) = DATE(NOW() +  interval '${dayUntil}' day)
        `),
        include: [
          {
            model: BusinessModel
          }
        ]
      });
      this.businessOutletLeadNotification.notifyUserReminder(
        businessOutletLead,
        dayUntil
      );
    } catch (error) {
      console.log(error);
    }
  }
}
