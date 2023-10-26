import { XHubsterOrderModel } from '@wahyoo/wahyoo-shared';
import { XHubsterOrder } from '../dto/xHubsterOrder.dto';

export class XHubsterOrderMapper {
  public static modelToDTO(model: XHubsterOrderModel): XHubsterOrder {
    return new XHubsterOrder(model);
  }

  public static modelsToDTOs(models: XHubsterOrderModel[]): XHubsterOrder[] {
    return models.map(model => XHubsterOrderMapper.modelToDTO(model));
  }
}
