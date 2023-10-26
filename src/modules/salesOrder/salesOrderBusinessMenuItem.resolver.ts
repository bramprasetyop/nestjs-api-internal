import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Loader } from 'src/commons/loader';
import { SalesOrderBusinessMenuItem } from './dto/salesOrderBusinessMenuItem.dto';
import { SalesOrderBusinessMenuModifierItemBatchBySalesOrderBusinessMenuItemIdLoader } from './salesOrderBusinessMenuModifierItem.batchBySalesOrderBusinessMenuItemId.loader';
import { SalesOrderBusinessMenuModifierItem } from './dto/salesOrderBusinessMenuModifierItem.dto';
import { BusinessMenuItem } from '../businessMenuItem/dto/businessMenuItem.dto';
import { BusinessMenuItemSingleByIdLoader } from '../businessMenuItem/businessMenuItem.singleById.loader';

@Resolver(SalesOrderBusinessMenuItem)
export class SalesOrderBusinessMenuItemResolver {
  constructor() {}

  // RESOLVER FIELD
  @ResolveField(() => [SalesOrderBusinessMenuModifierItem])
  async salesOrderBusinessMenuModifierItems(
    @Parent() salesOrderBusinessMenuItem: SalesOrderBusinessMenuItem,
    @Loader(
      SalesOrderBusinessMenuModifierItemBatchBySalesOrderBusinessMenuItemIdLoader.name
    )
    salesOrderBusinessMenuModifierItemBatchBySalesOrderBusinessMenuItemIdLoader: DataLoader<
      string,
      SalesOrderBusinessMenuModifierItem[]
    >
  ): Promise<SalesOrderBusinessMenuModifierItem[]> {
    try {
      const response = await salesOrderBusinessMenuModifierItemBatchBySalesOrderBusinessMenuItemIdLoader.load(
        salesOrderBusinessMenuItem.id
      );
      return response;
    } catch (err) {
      throw err;
    }
  }

  @ResolveField(() => BusinessMenuItem)
  async businessMenuItem(
    @Parent() salesOrderBusinessMenuItem: SalesOrderBusinessMenuItem,
    @Loader(BusinessMenuItemSingleByIdLoader.name)
    businessMenuItemSingleByIdLoader: DataLoader<string, BusinessMenuItem>
  ): Promise<BusinessMenuItem> {
    try {
      const response = await businessMenuItemSingleByIdLoader.load(
        salesOrderBusinessMenuItem.businessMenuItemId
      );
      return response;
    } catch (err) {
      throw err;
    }
  }
}
