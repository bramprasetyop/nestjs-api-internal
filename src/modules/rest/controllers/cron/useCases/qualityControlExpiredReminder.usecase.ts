import { IUseCase } from 'src/commons/useCase.interface';
import { Sequelize } from 'sequelize';
import { Inject, Injectable } from '@nestjs/common';
import {
  BusinessOutletQualityControlModel,
  QualityControlNotificationService,
  InjectionKey
} from '@wahyoo/wahyoo-shared';

@Injectable()
export class QualityControlExpiredReminderUseCase implements IUseCase {
  private sequelize: Sequelize;
  constructor(
    @Inject(InjectionKey.BUSINESS_OUTLET_QUALITY_CONTROL_MODEL)
    private readonly businessOutletQualityControlModel: typeof BusinessOutletQualityControlModel,
    private qualityControlNotification: QualityControlNotificationService
  ) {
    this.sequelize = this.businessOutletQualityControlModel.sequelize;
  }

  async execute() {
    try {
      const businessOutletQualityControls = await this.businessOutletQualityControlModel.findAll(
        {
          where: this.sequelize.Sequelize.literal(`
          status = 'new'
          AND deleted_at IS NULL`)
        }
      );
      console.log(businessOutletQualityControls);

      this.qualityControlNotification.notifyUserQCReminder(
        businessOutletQualityControls
      );
    } catch (error) {
      console.log(error);
    }
  }
}
