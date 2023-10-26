import { Injectable, Inject } from '@nestjs/common';
import { BusinessOutletMediaModel, InjectionKey } from '@wahyoo/wahyoo-shared';
import { Op } from 'sequelize';
import { IBusinessOutletMediaRepository } from './businessOutletMedia.interface';

@Injectable()
export class BusinessOutletMediaRepository
  implements IBusinessOutletMediaRepository {
  constructor(
    @Inject(InjectionKey.BUSINESS_OUTLET_MEDIA_MODEL)
    private readonly businessOutletMediaModel: typeof BusinessOutletMediaModel
  ) {}

  async findByBusinessOutletIds(
    businessOutletIds: string[]
  ): Promise<BusinessOutletMediaModel[]> {
    return this.businessOutletMediaModel.findAll({
      where: {
        businessOutletId: {
          [Op.in]: businessOutletIds
        }
      }
    });
  }
}
