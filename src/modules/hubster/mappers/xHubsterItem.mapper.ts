import { XHubsterItemModel } from '@wahyoo/wahyoo-shared';
import { XHubsterItem } from '../dto/xHubsterItem';

export class XHubsterItemMapper {
  public static modelToDTO(model: XHubsterItemModel): XHubsterItem {
    return new XHubsterItem(model);
  }

  public static modelsToDTOs(models: XHubsterItemModel[]): XHubsterItem[] {
    return models.map(model => XHubsterItemMapper.modelToDTO(model));
  }
}
