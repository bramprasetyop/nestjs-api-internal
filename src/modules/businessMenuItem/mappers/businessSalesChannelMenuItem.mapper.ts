import { BusinessSalesChannelMenuItemModel } from '@wahyoo/wahyoo-shared';
import { BusinessSalesChannelMenuItem } from '../dto/businessSalesChannelMenuItem.dto';

export class BusinessSalesChannelMenuItemMapper {
  public static modelToDTO(
    model: BusinessSalesChannelMenuItemModel
  ): BusinessSalesChannelMenuItem {
    return new BusinessSalesChannelMenuItem(model);
  }

  public static modelsToDTOs(
    models: BusinessSalesChannelMenuItemModel[]
  ): BusinessSalesChannelMenuItem[] {
    return models.map(model =>
      BusinessSalesChannelMenuItemMapper.modelToDTO(model)
    );
  }
}
