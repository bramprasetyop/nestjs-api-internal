import { UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Loader } from 'src/commons/loader';
import { BusinessMerchantOrder } from './dto/businessMerchantOrder.dto';
import { BusinessMerchantOrderItem } from './dto/businessMerchantOrderItem.dto';
import { BusinessMerchantOrderSingleByIdLoader } from './businessMerchantOrder.singleById.loader';
import { BusinessMerchantProductSingleByIdLoader } from './businessMerchantProduct.singleById.loader';
import { BusinessMerchantProduct } from './dto/businessMerchantProduct.dto';

@Resolver(BusinessMerchantOrderItem)
export class BusinessMerchantOrderItemResolver {
  //  FIELD DATA LOADER
  @ResolveField(() => BusinessMerchantOrder)
  async businessMerchantOrder(
    @Parent() businessMerchantOrderItem: BusinessMerchantOrderItem,
    @Loader(BusinessMerchantOrderSingleByIdLoader.name)
    businessMerchantOrderSingleByIdLoader: DataLoader<
      string,
      BusinessMerchantOrder
    >
  ): Promise<BusinessMerchantOrder> {
    try {
      const response = await businessMerchantOrderSingleByIdLoader.load(
        businessMerchantOrderItem.businessMerchantOrderId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //  FIELD DATA LOADER
  @ResolveField(() => BusinessMerchantProduct)
  async businessMerchantProduct(
    @Parent() businessMerchantOrderItem: BusinessMerchantOrderItem,
    @Loader(BusinessMerchantProductSingleByIdLoader.name)
    businessMerchantProductSingleByIdLoader: DataLoader<
      string,
      BusinessMerchantProduct
    >
  ): Promise<BusinessMerchantProduct> {
    try {
      const response = await businessMerchantProductSingleByIdLoader.load(
        businessMerchantOrderItem.businessMerchantProductId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
