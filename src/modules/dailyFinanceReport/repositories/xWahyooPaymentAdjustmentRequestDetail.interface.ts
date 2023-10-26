import { XWahyooPaymentAdjustmentRequestDetailModel } from '@wahyoo/wahyoo-shared';

export interface IXWahyooPaymentAdjustmentRequestDetailRepository {
  findByIds(
    ids: string[]
  ): Promise<XWahyooPaymentAdjustmentRequestDetailModel[]>;
  findByOrganizationUserDailyFinanceReportIds(
    ids: string[]
  ): Promise<XWahyooPaymentAdjustmentRequestDetailModel[]>;
  findByOrganizationUserDailyFeeReportIds(
    ids: string[]
  ): Promise<XWahyooPaymentAdjustmentRequestDetailModel[]>;
}
