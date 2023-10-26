import { Module } from '@nestjs/common';
import {
  InjectionKey,
  BusinessSalesChannelCategoryModel,
  BusinessPaymentTypeModel,
  BusinessSyncLogModel
} from '@wahyoo/wahyoo-shared';
// import { BusinessSyncResolver } from './businessSync.resolver';
import { BusinessSyncRepository } from './repositories/businessSync.repository';
import { BusinessSyncLogRepository } from './repositories/businessSyncLog.repository';
import { BusinessSyncUseCase } from './useCases/businessSync.useCase';
import { BusinessSyncStatusUseCase } from './useCases/businessSyncStatus.useCase';

@Module({
  imports: [],
  providers: [
    // BusinessSyncResolver,
    BusinessSyncUseCase,
    BusinessSyncStatusUseCase,
    BusinessSyncLogRepository,
    BusinessSyncRepository,
    {
      provide: InjectionKey.BUSINESS_SYNC_LOG_MODEL,
      useValue: BusinessSyncLogModel
    },
    {
      provide: InjectionKey.BUSINESS_SALES_CHANNEL_CATEGORY_MODEL,
      useValue: BusinessSalesChannelCategoryModel
    },
    {
      provide: InjectionKey.BUSINESS_PAYMENT_TYPE_MODEL,
      useValue: BusinessPaymentTypeModel
    }
  ],
  exports: [BusinessSyncLogRepository]
})
export class BusinessSyncModule {}
