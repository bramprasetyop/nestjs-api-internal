import { BusinessOutletMediaModel } from '@wahyoo/wahyoo-shared';
import { BusinessOutletMedia } from '../dto/businessOutletMedia.dto';

export class BusinessOutletMediaMapper {
  public static modelToDTO(
    model: BusinessOutletMediaModel
  ): BusinessOutletMedia {
    return new BusinessOutletMedia(model);
  }

  public static modelsToDTOs(
    models: BusinessOutletMediaModel[]
  ): BusinessOutletMedia[] {
    return models.map(model => BusinessOutletMediaMapper.modelToDTO(model));
  }
}
