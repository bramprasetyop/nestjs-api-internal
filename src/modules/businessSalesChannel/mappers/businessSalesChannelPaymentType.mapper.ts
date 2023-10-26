import { BusinessSalesChannelPaymentTypeModel } from '@wahyoo/wahyoo-shared';
import { BusinessSalesChannelPaymentType } from '../dto/businessSalesChannelPaymentType.dto';

export class BusinessSalesChannelPaymentTypeMapper {
  public static modelToDTO(
    model: BusinessSalesChannelPaymentTypeModel
  ): BusinessSalesChannelPaymentType {
    return new BusinessSalesChannelPaymentType(model);
  }

  public static modelsToDTOs(
    models: BusinessSalesChannelPaymentTypeModel[]
  ): BusinessSalesChannelPaymentType[] {
    return models.map(model =>
      BusinessSalesChannelPaymentTypeMapper.modelToDTO(model)
    );
  }
}
