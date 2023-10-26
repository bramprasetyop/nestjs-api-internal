import { BusinessSalesChannelModel } from '@wahyoo/wahyoo-shared';
import { BusinessSalesChannel } from '../dto/businessSalesChannel.dto';

export class BusinessSalesChannelMapper {
  public static modelToDTO(
    model: BusinessSalesChannelModel
  ): BusinessSalesChannel {
    return new BusinessSalesChannel(model);
  }

  public static modelsToDTOs(
    models: BusinessSalesChannelModel[]
  ): BusinessSalesChannel[] {
    return models.map(model => BusinessSalesChannelMapper.modelToDTO(model));
  }
}
