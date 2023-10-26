import { UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Loader } from 'src/commons/loader';
import { BusinessMerchantOrder } from './dto/businessMerchantOrder.dto';
import { BusinessMerchantOrderItem } from './dto/businessMerchantOrderItem.dto';
import { BusinessMerchantOrderSingleByIdLoader } from './businessMerchantOrder.singleById.loader';
import { BusinessMerchantProductSingleByIdLoader } from './businessMerchantProduct.singleById.loader';
import { BusinessMerchantProduct } from './dto/businessMerchantProduct.dto';
import { BusinessMerchantOrderPayment } from './dto/businessMerchantOrderPayment.dto';
import { XXenditPayment } from './dto/XXenditPayment.dto';
import { XXenditPaymentSingleByBusinessMerchantOrderPaymentIdLoader } from './xXenditPayment.singleByBusinessMerchantOrderPaymentId.loader';

@Resolver(BusinessMerchantOrderPayment)
export class BusinessMerchantOrderPaymentResolver {
  //  FIELD DATA LOADER
  @ResolveField(() => BusinessMerchantOrder)
  async businessMerchantOrder(
    @Parent() businessMerchantOrderPayment: BusinessMerchantOrderPayment,
    @Loader(BusinessMerchantOrderSingleByIdLoader.name)
    businessMerchantOrderSingleByIdLoader: DataLoader<
      string,
      BusinessMerchantOrder
    >
  ): Promise<BusinessMerchantOrder> {
    try {
      const response = await businessMerchantOrderSingleByIdLoader.load(
        businessMerchantOrderPayment.businessMerchantOrderId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //  FIELD DATA LOADER
  @ResolveField(() => XXenditPayment)
  async xXenditPayment(
    @Parent() businessMerchantOrderPayment: BusinessMerchantOrderPayment,
    @Loader(XXenditPaymentSingleByBusinessMerchantOrderPaymentIdLoader.name)
    xXenditPaymentSingleByBusinessMerchantOrderPaymentIdLoader: DataLoader<
      string,
      XXenditPayment
    >
  ): Promise<XXenditPayment> {
    try {
      const response = await xXenditPaymentSingleByBusinessMerchantOrderPaymentIdLoader.load(
        businessMerchantOrderPayment.id
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
