import { BusinessOutletPropertyModel } from '@wahyoo/wahyoo-shared';
import { BusinessOutletProperty } from '../dto/businessOutletProperty.dto';

export class BusinessOutletPropertyMapper {
  public static modelToDTO(
    model: BusinessOutletPropertyModel
  ): BusinessOutletProperty {
    return new BusinessOutletProperty(model);
  }

  public static modelsToDTOs(
    models: BusinessOutletPropertyModel[]
  ): BusinessOutletProperty[] {
    return models.map(model => BusinessOutletPropertyMapper.modelToDTO(model));
  }
}
