import { BusinessPaymentTypeModel } from '@wahyoo/wahyoo-shared';
import { BusinessPaymentType } from '../dto/businessPaymentType.dto';

export class BusinessPaymentTypeMapper {
  public static modelToDTO(
    model: BusinessPaymentTypeModel
  ): BusinessPaymentType {
    return new BusinessPaymentType(model);
  }

  public static modelsToDTOs(
    models: BusinessPaymentTypeModel[]
  ): BusinessPaymentType[] {
    return models.map(model => BusinessPaymentTypeMapper.modelToDTO(model));
  }
}
