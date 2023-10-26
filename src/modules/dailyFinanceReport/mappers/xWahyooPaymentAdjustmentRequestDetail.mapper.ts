import { XWahyooPaymentAdjustmentRequestDetailModel } from '@wahyoo/wahyoo-shared';
import { XWahyooPaymentAdjustmentRequestDetail } from '../dto/xWahyooPaymentAdjustmentRequestDetail.dto';

export class XWahyooPaymentAdjustmentRequestDetailMapper {
  public static modelToDTO(
    model: XWahyooPaymentAdjustmentRequestDetailModel
  ): XWahyooPaymentAdjustmentRequestDetail {
    return new XWahyooPaymentAdjustmentRequestDetail(model);
  }

  public static modelsToDTOs(
    models: XWahyooPaymentAdjustmentRequestDetailModel[]
  ): XWahyooPaymentAdjustmentRequestDetail[] {
    return models.map(model =>
      XWahyooPaymentAdjustmentRequestDetailMapper.modelToDTO(model)
    );
  }
}
