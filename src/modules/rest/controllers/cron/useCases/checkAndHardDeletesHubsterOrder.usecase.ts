import moment from 'moment';
import { Op } from 'sequelize';
import { IUseCase } from 'src/commons/useCase.interface';
import { Inject, Injectable } from '@nestjs/common';
import { InjectionKey, XHubsterEventModel } from '@wahyoo/wahyoo-shared';

@Injectable()
export class CheckAndHardDeletesHubsterOrderUseCase implements IUseCase {
  constructor(
    @Inject(InjectionKey.X_HUBSTER_EVENT_MODEL)
    private readonly xHubsterEventModel: typeof XHubsterEventModel
  ) {}

  async execute() {
    try {
      const fourteenDayAgoMoment = moment().subtract(14, 'days');
      await this.xHubsterEventModel.destroy({
        where: {
          createdAt: {
            [Op.lt]: fourteenDayAgoMoment.toDate()
          }
        },
        force: true
      });
    } catch (error) {
      console.log(error);
    }
  }
}
