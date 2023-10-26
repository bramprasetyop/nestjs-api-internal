import { BusinessOutletLeadMediaModel } from '@wahyoo/wahyoo-shared';
import { BusinessOutletLeadMedia } from '../dto/businessOutletLeadMedia.dto';

export class BusinessOutletLeadMediaMapper {
  public static modelToDTO(
    model: BusinessOutletLeadMediaModel
  ): BusinessOutletLeadMedia {
    return new BusinessOutletLeadMedia(model);
  }

  public static modelsToDTOs(
    models: BusinessOutletLeadMediaModel[]
  ): BusinessOutletLeadMedia[] {
    return models.map(model => BusinessOutletLeadMediaMapper.modelToDTO(model));
  }
}
