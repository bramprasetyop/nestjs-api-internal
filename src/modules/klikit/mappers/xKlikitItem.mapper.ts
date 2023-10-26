import { XKlikitItemModel } from '@wahyoo/wahyoo-shared';
import { XKlikitItem } from '../dto/xKlikitItem';

export class XKlikitItemMapper {
  public static modelToDTO(model: XKlikitItemModel): XKlikitItem {
    return new XKlikitItem(model);
  }

  public static modelsToDTOs(models: XKlikitItemModel[]): XKlikitItem[] {
    return models.map(model => XKlikitItemMapper.modelToDTO(model));
  }
}
