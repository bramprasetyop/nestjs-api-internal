import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Loader } from 'src/commons/loader';
import DataLoader = require('dataloader');
import { BusinessSalesChannelMenuItem } from '../businessMenuItem/dto/businessSalesChannelMenuItem.dto';
import { BusinessMenuItem } from '../businessMenuItem/dto/businessMenuItem.dto';
import { BusinessMenuItemSingleByIdLoader } from '../businessMenuItem/businessMenuItem.singleById.loader';

@Resolver(BusinessSalesChannelMenuItem)
export class BusinessSalesChannelMenuItemResolver {
  // FIELD DATA LOADER
  @ResolveField(() => [BusinessMenuItem])
  async businessMenuItem(
    @Parent() businessSalesChannelMenuItem: BusinessSalesChannelMenuItem,
    @Loader(BusinessMenuItemSingleByIdLoader.name)
    businessMenuItemSingleByIdLoader: DataLoader<string, BusinessMenuItem[]>
  ): Promise<BusinessMenuItem[]> {
    try {
      const response = await businessMenuItemSingleByIdLoader.load(
        businessSalesChannelMenuItem.businessMenuItemId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
