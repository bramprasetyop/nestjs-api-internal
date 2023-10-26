import { Injectable, Inject } from '@nestjs/common';
import { InjectionKey, XBusinessOutletKioskModel } from '@wahyoo/wahyoo-shared';
import { Op } from 'sequelize';
import { IXBusinessOutletKioskRepository } from './xBusinessOutletKiosk.interface';

@Injectable()
export class XBusinessOutletKioskRepository
  implements IXBusinessOutletKioskRepository {
  constructor(
    @Inject(InjectionKey.X_BUSINESS_OUTLET_KIOSK_MODEL)
    private readonly xBusinessOutletKioskModel: typeof XBusinessOutletKioskModel
  ) {}
  async findByBusinessOutletId(id: string): Promise<XBusinessOutletKioskModel> {
    return this.xBusinessOutletKioskModel.findOne({
      where: {
        businessOutletId: id
      }
    });
  }
  async findByByBusinessOutletIds(
    ids: string[]
  ): Promise<XBusinessOutletKioskModel[]> {
    return this.xBusinessOutletKioskModel.findAll({
      where: {
        businessOutletId: {
          [Op.in]: ids
        }
      }
    });
  }
}
