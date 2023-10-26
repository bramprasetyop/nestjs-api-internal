import { SalesOrderModel } from '@wahyoo/wahyoo-shared';
import { SalesOrder } from '../dto/salesOrder.dto';

export class SalesOrderMapper {
  public static modelToDTO(model: SalesOrderModel): SalesOrder {
    return new SalesOrder(model);
  }

  public static modelsToDTOs(models: SalesOrderModel[]): SalesOrder[] {
    return models.map(model => SalesOrderMapper.modelToDTO(model));
  }
}
