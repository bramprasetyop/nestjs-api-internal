import { SalesOrderBusinessMenuModifierItemModel } from '@wahyoo/wahyoo-shared';
import { SalesOrderBusinessMenuModifierItem } from '../dto/salesOrderBusinessMenuModifierItem.dto';

export interface ISalesOrderBusinessMenuModifierItemRepository {
  findById(id: string): Promise<SalesOrderBusinessMenuModifierItemModel>;
  findBySalesOrderBusinessMenuItemIds(
    ids: string[]
  ): Promise<SalesOrderBusinessMenuModifierItemModel[]>;
  create(
    dto: SalesOrderBusinessMenuModifierItem
  ): Promise<SalesOrderBusinessMenuModifierItemModel>;
}
