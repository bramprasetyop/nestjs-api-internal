import { Inject, Injectable } from '@nestjs/common';
import { BusinessPropertyModel, InjectionKey } from '@wahyoo/wahyoo-shared';
import { IBusinessPropertyRepository } from './businessProperty.interface';
import { Op } from 'sequelize';

@Injectable()
export class BusinessPropertyRepository implements IBusinessPropertyRepository {
  constructor(
    @Inject(InjectionKey.BUSINESS_PROPERTY_MODEL)
    private readonly businessPropertyModel: typeof BusinessPropertyModel
  ) {}

  async findByBusinessId(businessId: string): Promise<BusinessPropertyModel> {
    return this.businessPropertyModel.findOne({
      where: { businessId }
    });
  }

  async findByBusinessIds(ids: string[]): Promise<BusinessPropertyModel[]> {
    return this.businessPropertyModel.findAll({
      where: {
        businessId: {
          [Op.in]: ids
        }
      }
    });
  }
}
