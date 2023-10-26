import { SalesOrderBusinessMenuModifierItemModel } from '@wahyoo/wahyoo-shared';
import { SalesOrderBusinessMenuModifierItem } from '../dto/salesOrderBusinessMenuModifierItem.dto';

export class SalesOrderBusinessMenuModifierItemMapper {
  public static modelToDTO(
    model: SalesOrderBusinessMenuModifierItemModel
  ): SalesOrderBusinessMenuModifierItem {
    return new SalesOrderBusinessMenuModifierItem(model);
  }

  public static modelsToDTOs(
    models: SalesOrderBusinessMenuModifierItemModel[]
  ): SalesOrderBusinessMenuModifierItem[] {
    return models.map(model =>
      SalesOrderBusinessMenuModifierItemMapper.modelToDTO(model)
    );
  }
}
