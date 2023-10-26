import { BusinessLeadModel } from '@wahyoo/wahyoo-shared';
import { BusinessLead } from '../dto/businessLead.dto';

export class BusinessLeadMapper {
  public static modelToDTO(model: BusinessLeadModel): BusinessLead {
    return new BusinessLead(model);
  }

  public static modelsToDTOs(models: BusinessLeadModel[]): BusinessLead[] {
    return models.map(model => BusinessLeadMapper.modelToDTO(model));
  }
}
