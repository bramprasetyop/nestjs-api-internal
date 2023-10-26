import {
  Parent,
  Args,
  Mutation,
  ResolveField,
  Query,
  Resolver
} from '@nestjs/graphql';
import { BusinessMenuItem } from './dto/businessMenuItem.dto';
import { Loader } from 'src/commons/loader';
import DataLoader = require('dataloader');
import { BusinessMenuItemSingleByIdLoader } from './businessMenuItem.singleById.loader';
import { BusinessSalesChannel } from '../businessSalesChannel/dto/businessSalesChannel.dto';
import { BusinessSalesChannelSingleByIdLoader } from '../businessSalesChannel/businessSalesChannel.singleById.loader';
import { BusinessSalesChannelMenuItem } from './dto/businessSalesChannelMenuItem.dto';

@Resolver(BusinessSalesChannelMenuItem)
export class BusinessSalesChannelMenuItemResolver {
  // FIELD DATA LOADER
  @ResolveField(() => BusinessMenuItem)
  async businessMenuItem(
    @Parent() businessSalesChannelMenuItem: BusinessSalesChannelMenuItem,
    @Loader(BusinessMenuItemSingleByIdLoader.name)
    businessMenuItemSingleByIdLoader: DataLoader<string, BusinessMenuItem>
  ): Promise<BusinessMenuItem> {
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

  @ResolveField(() => BusinessSalesChannel)
  async businessSalesChannel(
    @Parent() businessSalesChannelMenuItem: BusinessSalesChannelMenuItem,
    @Loader(BusinessSalesChannelSingleByIdLoader.name)
    businessMenuItemSingleByIdLoader: DataLoader<
      BusinessSalesChannel['id'],
      BusinessSalesChannel
    >
  ): Promise<BusinessSalesChannel> {
    try {
      const response = await businessMenuItemSingleByIdLoader.load(
        businessSalesChannelMenuItem.businessSalesChannelId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
