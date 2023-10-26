import { Module } from '@nestjs/common';
import {
  InjectionKey,
  BusinessMerchantOrderModel,
  BusinessMerchantOrderItemModel,
  BusinessMerchantOrderPaymentModel,
  BusinessMerchantProductModel,
  XXenditPaymentModel
} from '@wahyoo/wahyoo-shared';
import { BusinessMerchantOrderBatchByBusinessOutletLeadIdLoader } from './businessMerchantOrder.batchByBusinessOutletLeadId.loader';
import { BusinessMerchantOrderResolver } from './businessMerchantOrder.resolver';
import { BusinessMerchantOrderSingleByIdLoader } from './businessMerchantOrder.singleById.loader';
import { BusinessMerchantOrderItemBatchByBusinessMerchantOrderIdLoader } from './businessMerchantOrderItem.batchByBusinessMerchantOrderId.loader';
import { BusinessMerchantOrderItemResolver } from './businessMerchantOrderItem.resolver';
import { BusinessMerchantOrderPaymentResolver } from './businessMerchantOrderPayment.resolver';
import { BusinessMerchantOrderPaymentSingleByBusinessMerchantOrderIdLoader } from './businessMerchantOrderPayment.singleByBusinessMerchantOrderId.loader';
import { BusinessMerchantProductResolver } from './businessMerchantProduct.resolver';
import { BusinessMerchantProductGetListUseCase } from './useCases/businessMerchantProduct.getList.usecase';
import { BusinessMerchantProductSingleByIdLoader } from './businessMerchantProduct.singleById.loader';
import { BusinessMerchantProductBatchByBusinessIdLoader } from './businessMerchantProduct.batchByBusinessId.loader';
import { BusinessMerchantOrderRepository } from './repositories/businessMerchantOrder.repository';
import { BusinessMerchantOrderItemRepository } from './repositories/businessMerchantOrderItem.repository';
import { BusinessMerchantOrderPaymentRepository } from './repositories/businessMerchantOrderPayment.repository';
import { BusinessMerchantProductRepository } from './repositories/businessMerchantProduct.repository';
import { XXenditPaymentRepository } from './repositories/xXenditPayment.repository';
import { XXenditPaymentSingleByBusinessMerchantOrderPaymentIdLoader } from './xXenditPayment.singleByBusinessMerchantOrderPaymentId.loader';

@Module({
  providers: [
    BusinessMerchantOrderResolver,
    BusinessMerchantOrderItemResolver,
    BusinessMerchantOrderPaymentResolver,
    BusinessMerchantProductResolver,
    BusinessMerchantProductGetListUseCase,
    BusinessMerchantOrderRepository,
    BusinessMerchantOrderItemRepository,
    BusinessMerchantOrderPaymentRepository,
    BusinessMerchantProductRepository,
    XXenditPaymentRepository,
    BusinessMerchantOrderSingleByIdLoader,
    BusinessMerchantOrderBatchByBusinessOutletLeadIdLoader,
    BusinessMerchantOrderItemBatchByBusinessMerchantOrderIdLoader,
    BusinessMerchantOrderPaymentSingleByBusinessMerchantOrderIdLoader,
    BusinessMerchantProductSingleByIdLoader,
    BusinessMerchantProductBatchByBusinessIdLoader,
    XXenditPaymentSingleByBusinessMerchantOrderPaymentIdLoader,
    {
      provide: InjectionKey.BUSINESS_MERCHANT_ORDER_MODEL,
      useValue: BusinessMerchantOrderModel
    },
    {
      provide: InjectionKey.BUSINESS_MERCHANT_ORDER_ITEM_MODEL,
      useValue: BusinessMerchantOrderItemModel
    },
    {
      provide: InjectionKey.BUSINESS_MERCHANT_ORDER_PAYMENT_MODEL,
      useValue: BusinessMerchantOrderPaymentModel
    },
    {
      provide: InjectionKey.BUSINESS_MERCHANT_PRODUCT_MODEL,
      useValue: BusinessMerchantProductModel
    },
    {
      provide: InjectionKey.X_XENDIT_PAYMENT_MODEL,
      useValue: XXenditPaymentModel
    }
  ],
  exports: [
    BusinessMerchantOrderRepository,
    BusinessMerchantOrderItemRepository,
    BusinessMerchantOrderPaymentRepository,
    BusinessMerchantProductRepository,
    XXenditPaymentRepository,
    BusinessMerchantOrderSingleByIdLoader,
    BusinessMerchantOrderBatchByBusinessOutletLeadIdLoader,
    BusinessMerchantOrderItemBatchByBusinessMerchantOrderIdLoader,
    BusinessMerchantOrderPaymentSingleByBusinessMerchantOrderIdLoader,
    BusinessMerchantProductSingleByIdLoader,
    BusinessMerchantProductBatchByBusinessIdLoader,
    XXenditPaymentSingleByBusinessMerchantOrderPaymentIdLoader
  ]
})
export class BusinessMerchantOrderModule {}
