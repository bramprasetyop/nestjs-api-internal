import { BusinessPropertyModel } from '@wahyoo/wahyoo-shared';
import { BusinessProperty } from '../dto/businessProperty.dto';

export class BusinessPropertyMapper {
  public static modelToDTO(model: BusinessPropertyModel): BusinessProperty {
    return new BusinessProperty(model);
  }

  public static modelsToDTOs(
    models: BusinessPropertyModel[]
  ): BusinessProperty[] {
    return models.map(model => BusinessPropertyMapper.modelToDTO(model));
  }
}
