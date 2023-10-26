import { SalesOrderBusinessMenuItemModel } from '@wahyoo/wahyoo-shared';
import { SalesOrderBusinessMenuItemInput } from '../dto/salesOrderSyncRequest.dto';

export interface ISalesOrderBusinessMenuItemRepository {
  findById(id: string): Promise<SalesOrderBusinessMenuItemModel>;
  findBySalesOrderIds(
    ids: string[]
  ): Promise<SalesOrderBusinessMenuItemModel[]>;
  create(
    dto: SalesOrderBusinessMenuItemInput
  ): Promise<SalesOrderBusinessMenuItemModel>;
}
