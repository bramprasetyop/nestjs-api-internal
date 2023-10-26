import { BusinessOutletQualityControlModel } from '@wahyoo/wahyoo-shared';
import { BusinessOutletQualityControl } from '../dto/businessOutletQualityControl.dto';

export class BusinessOutletQualityControlMapper {
  public static modelToDTO(
    model: BusinessOutletQualityControlModel
  ): BusinessOutletQualityControl {
    return new BusinessOutletQualityControl(model);
  }

  public static modelsToDTOs(
    models: BusinessOutletQualityControlModel[]
  ): BusinessOutletQualityControl[] {
    return models.map(model =>
      BusinessOutletQualityControlMapper.modelToDTO(model)
    );
  }
}
