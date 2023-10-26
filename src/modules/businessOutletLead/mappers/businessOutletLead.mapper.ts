import { BusinessOutletLeadModel } from '@wahyoo/wahyoo-shared';
import { BusinessOutletLead } from '../dto/businessOutletLead.dto';

export class BusinessOutletLeadMapper {
  public static modelToDTO(model: BusinessOutletLeadModel): BusinessOutletLead {
    return new BusinessOutletLead(model);
  }

  public static modelsToDTOs(
    models: BusinessOutletLeadModel[]
  ): BusinessOutletLead[] {
    return models.map(model => BusinessOutletLeadMapper.modelToDTO(model));
  }
}
