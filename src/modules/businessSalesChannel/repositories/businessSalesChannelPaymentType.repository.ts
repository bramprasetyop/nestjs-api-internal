import { Injectable, Inject } from '@nestjs/common';
import {
  InjectionKey,
  BusinessSalesChannelModel,
  BusinessSalesChannelPaymentTypeModel
} from '@wahyoo/wahyoo-shared';
import { Op } from 'sequelize';
import { IBusinessSalesChannelPaymentTypeRepository } from './businessSalesChannelPaymentType.interface';

@Injectable()
export class BusinessSalesChannelPaymentTypeRepository
  implements IBusinessSalesChannelPaymentTypeRepository {
  constructor(
    @Inject(InjectionKey.BUSINESS_SALES_CHANNEL_PAYMENT_TYPE_MODEL)
    private readonly businessSalesChannelPaymentTypeModel: typeof BusinessSalesChannelPaymentTypeModel
  ) {}

  public async findBySalesChannelIds(
    ids: string[]
  ): Promise<BusinessSalesChannelPaymentTypeModel[]> {
    const data = await this.businessSalesChannelPaymentTypeModel.findAll({
      where: {
        businessSalesChannelId: {
          [Op.in]: ids
        }
      }
    });
    return data;
  }
  public async findByPaymentTypeIds(
    ids: string[]
  ): Promise<BusinessSalesChannelPaymentTypeModel[]> {
    const data = await this.businessSalesChannelPaymentTypeModel.findAll({
      where: {
        businessPaymentTypeId: {
          [Op.in]: ids
        }
      }
    });
    return data;
  }
}
