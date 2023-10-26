import { BusinessSyncLogModel } from '@wahyoo/wahyoo-shared';
import { BusinessSyncLog } from '../dto/businessSyncLog.dto';

export class BusinessSyncLogMapper {
  public static modelToDTO(model: BusinessSyncLogModel): BusinessSyncLog {
    return new BusinessSyncLog(model);
  }

  public static modelsToDTOs(
    models: BusinessSyncLogModel[]
  ): BusinessSyncLog[] {
    return models.map(model => BusinessSyncLogMapper.modelToDTO(model));
  }
}
