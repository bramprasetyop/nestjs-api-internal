import { IUseCase } from 'src/commons/useCase.interface';
import { Op, Sequelize } from 'sequelize';
import { Inject, Injectable } from '@nestjs/common';
import {
  BusinessOutletQualityControlStatus,
  InjectionKey,
  BusinessOutletQualityControlModel,
  QualityControlNotificationService
} from '@wahyoo/wahyoo-shared';

@Injectable()
export class CheckAndSetBusinessOutletQualityControlExpiredUseCase
  implements IUseCase {
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
      const expiredBusinessOutletQcs = await this.businessOutletQualityControlModel.findAll(
        {
          where: this.sequelize.Sequelize.literal(
            `expired_at <= now() and status = '${BusinessOutletQualityControlStatus.new}' `
          )
        }
      );

      if (expiredBusinessOutletQcs.length > 0) {
        await this.businessOutletQualityControlModel.update(
          { status: BusinessOutletQualityControlStatus.expired },
          {
            where: {
              id: { [Op.in]: expiredBusinessOutletQcs.map(data => data.id) }
            }
          }
        );

        // send notification
        expiredBusinessOutletQcs.forEach(expiredBusinessOutletQc => {
          expiredBusinessOutletQc.status =
            BusinessOutletQualityControlStatus.expired;
          this.qualityControlNotification.notifyUser(expiredBusinessOutletQc);
        });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
