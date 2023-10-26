import DataLoader from 'dataloader';
import { Loader } from 'src/commons/loader';
import { BusinessMenuCategory } from './dto/businessMenuCategory.dto';
import { BusinessSalesChannel } from '../businessSalesChannel/dto/businessSalesChannel.dto';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { BusinessSalesChannelMenuCategory } from './dto/businessSalesChannelMenuCategory.dto';
import { BusinessMenuCategorySingleByIdLoader } from './businessMenuCategory.singleById.loader';
import { BusinessSalesChannelSingleByIdLoader } from '../businessSalesChannel/businessSalesChannel.singleById.loader';

@Resolver(BusinessSalesChannelMenuCategory)
export class BusinessSalesChannelMenuCategoryResolver {
  // FIELD DATA LOADER
  @ResolveField(() => BusinessSalesChannel)
  async businessSalesChannel(
    @Parent()
    BusinessSalesChannelMenuCategory: BusinessSalesChannelMenuCategory,
    @Loader(BusinessSalesChannelSingleByIdLoader.name)
    businessSalesChannelSingleByIdLoader: DataLoader<
      String,
      BusinessSalesChannel
    >
  ): Promise<BusinessSalesChannel> {
    try {
      const response = await businessSalesChannelSingleByIdLoader.load(
        BusinessSalesChannelMenuCategory.businessSalesChannelId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // FIELD DATA LOADER
  @ResolveField(() => BusinessMenuCategory)
  async businessMenuCategory(
    @Parent()
    businessSalesChannelMenuCategory: BusinessSalesChannelMenuCategory,
    @Loader(BusinessMenuCategorySingleByIdLoader.name)
    businessMenuCategorySingleByIdLoader: DataLoader<
      String,
      BusinessMenuCategory
    >
  ): Promise<BusinessMenuCategory> {
    try {
      const response = await businessMenuCategorySingleByIdLoader.load(
        businessSalesChannelMenuCategory.businessMenuCategoryId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
