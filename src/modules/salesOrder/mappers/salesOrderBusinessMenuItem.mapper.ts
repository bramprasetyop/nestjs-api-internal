import { SalesOrderBusinessMenuItemModel } from '@wahyoo/wahyoo-shared';
import { SalesOrderBusinessMenuItem } from '../dto/salesOrderBusinessMenuItem.dto';

export class SalesOrderBusinessMenuItemMapper {
  public static modelToDTO(
    model: SalesOrderBusinessMenuItemModel
  ): SalesOrderBusinessMenuItem {
    return new SalesOrderBusinessMenuItem(model);
  }

  public static modelsToDTOs(
    models: SalesOrderBusinessMenuItemModel[]
  ): SalesOrderBusinessMenuItem[] {
    return models.map(model =>
      SalesOrderBusinessMenuItemMapper.modelToDTO(model)
    );
  }
}
