import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { XKlikitItem } from './dto/xKlikitItem';
import DataLoader from 'dataloader';
import { Loader } from 'src/commons/loader';
import { BusinessSingleByIdLoader } from '../business/business.singleById.loader';
import { Business } from '../business/dto/business.dto';
import { BusinessMenuItem } from '../businessMenuItem/dto/businessMenuItem.dto';
import { BusinessMenuItemSingleByIdLoader } from '../businessMenuItem/businessMenuItem.singleById.loader';

@Resolver(XKlikitItem)
export class XKlikitItemResolver {
  constructor() {}

  // RESOLVER FIELD
  @ResolveField(() => Business)
  async business(
    @Parent() xKlikitItem: XKlikitItem,
    @Loader(BusinessSingleByIdLoader.name)
    businessSingleByIdLoader: DataLoader<string, Business>
  ): Promise<Business> {
    try {
      if (!xKlikitItem.businessId) return null;
      const response = await businessSingleByIdLoader.load(
        xKlikitItem.businessId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // FIELD DATA LOADER
  @ResolveField(() => BusinessMenuItem)
  async businessMenuItem(
    @Parent() xKlikitItem: XKlikitItem,
    @Loader(BusinessMenuItemSingleByIdLoader.name)
    businessMenuItemSingleByIdLoader: DataLoader<string, BusinessMenuItem>
  ): Promise<BusinessMenuItem> {
    try {
      if (!xKlikitItem.businessMenuItemId) return null;
      const response = await businessMenuItemSingleByIdLoader.load(
        xKlikitItem.businessMenuItemId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
