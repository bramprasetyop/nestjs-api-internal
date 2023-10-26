import { XHubsterStoreModel } from '@wahyoo/wahyoo-shared';
import { XHubsterStore } from '../dto/xHubsterStore';

export class XHubsterStoreMapper {
  public static modelToDTO(model: XHubsterStoreModel): XHubsterStore {
    return new XHubsterStore(model);
  }

  public static modelsToDTOs(models: XHubsterStoreModel[]): XHubsterStore[] {
    return models.map(model => XHubsterStoreMapper.modelToDTO(model));
  }
}
