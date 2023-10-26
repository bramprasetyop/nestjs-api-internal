import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import {
  InjectionKey,
  OrganizationUserDailyFeeReportModel,
  XWahyooPaymentAdjustmentRequestDetailModel
} from '@wahyoo/wahyoo-shared';
import { IXWahyooPaymentAdjustmentRequestDetailRepository } from './xWahyooPaymentAdjustmentRequestDetail.interface';

@Injectable()
export class XWahyooPaymentAdjustmentRequestDetailRepository
  implements IXWahyooPaymentAdjustmentRequestDetailRepository {
  constructor(
    @Inject(InjectionKey.X_WAHYOO_PAYMENT_ADJUSTMENT_REQUEST_DETAIL_MODEL)
    private readonly xWahyooPaymentAdjustmentRequestDetailModel: typeof XWahyooPaymentAdjustmentRequestDetailModel
  ) {}
  findByIds(
    ids: string[]
  ): Promise<XWahyooPaymentAdjustmentRequestDetailModel[]> {
    return this.xWahyooPaymentAdjustmentRequestDetailModel.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    });
  }
  findByOrganizationUserDailyFinanceReportIds(
    ids: string[]
  ): Promise<XWahyooPaymentAdjustmentRequestDetailModel[]> {
    return this.xWahyooPaymentAdjustmentRequestDetailModel.findAll({
      where: {
        organizationUserDailyFinanceReportId: {
          [Op.in]: ids
        }
      }
    });
  }
  findByOrganizationUserDailyFeeReportIds(
    ids: string[]
  ): Promise<XWahyooPaymentAdjustmentRequestDetailModel[]> {
    return this.xWahyooPaymentAdjustmentRequestDetailModel.findAll({
      where: {
        organizationUserDailyFeeReportId: {
          [Op.in]: ids
        }
      }
    });
  }
  findLastStatusByOrganizationUserByOrganizationUserDailyFeeReportId(
    id: string
  ): Promise<XWahyooPaymentAdjustmentRequestDetailModel> {
    return this.xWahyooPaymentAdjustmentRequestDetailModel.findOne({
      // attributes:['status'],
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: OrganizationUserDailyFeeReportModel,
          where: {
            organizationUserId: id
          }
        }
      ]
    });
  }
}
