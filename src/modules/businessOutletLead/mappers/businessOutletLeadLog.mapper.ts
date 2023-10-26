import {
  BusinessOutletLeadLogModel,
  BusinessOutletLeadModel
} from '@wahyoo/wahyoo-shared';
import { BusinessOutletLead } from '../dto/businessOutletLead.dto';
import { BusinessOutletLeadLog } from '../dto/businessOutletLeadLog.dto';

export class BusinessOutletLeadLogMapper {
  public static modelToDTO(
    model: BusinessOutletLeadLogModel
  ): BusinessOutletLeadLog {
    return new BusinessOutletLeadLog(model);
  }

  public static modelsToDTOs(
    models: BusinessOutletLeadLogModel[]
  ): BusinessOutletLeadLog[] {
    return models.map(model => BusinessOutletLeadLogMapper.modelToDTO(model));
  }
}
