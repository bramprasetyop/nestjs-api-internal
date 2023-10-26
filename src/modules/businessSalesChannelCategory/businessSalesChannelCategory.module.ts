import { Module } from '@nestjs/common';
import {
  BusinessSalesChannelCategoryModel,
  InjectionKey
} from '@wahyoo/wahyoo-shared';
// import { BusinessSalesChannelCategoryResolver } from './businessSalesChannelCategory.resolver';
import { BusinessSalesChannelCategorySingleByIdLoader } from './businessSalesChannelCategory.singleById.loader';
import { BusinessSalesChannelCategoryRepository } from './repositories/businessSalesChannelCategory.repository';
import { BusinessSalesChannelCategoryCreateUseCase } from './useCases/businessSalesChannelCategory.create.usecase';
import { BusinessSalesChannelCategoryGetByIdUseCase } from './useCases/businessSalesChannelCategory.getById.usecase';
import { BusinessSalesChannelCategoryGetListUseCase } from './useCases/businessSalesChannelCategory.getList.usecase';
import { BusinessSalesChannelCategoryUpdateUseCase } from './useCases/businessSalesChannelCategory.update.usecase';
import { BusinessSalesChannelCategoryDeleteUseCase } from './useCases/businessSalesChannelCategory.delete.usecase';
import { BusinessModule } from '../business/business.module';
import { BusinessPaymentTypeModule } from '../businessPaymentType/businessPaymentType.module';

@Module({
  imports: [BusinessModule, BusinessPaymentTypeModule],
  providers: [
    // BusinessSalesChannelCategoryResolver,
    BusinessSalesChannelCategoryCreateUseCase,
    BusinessSalesChannelCategoryGetByIdUseCase,
    BusinessSalesChannelCategoryGetListUseCase,
    BusinessSalesChannelCategoryUpdateUseCase,
    BusinessSalesChannelCategoryDeleteUseCase,
    BusinessSalesChannelCategoryRepository,
    BusinessSalesChannelCategorySingleByIdLoader,
    {
      provide: InjectionKey.BUSINESS_SALES_CHANNEL_CATEGORY_MODEL,
      useValue: BusinessSalesChannelCategoryModel
    }
  ],
  exports: [
    BusinessSalesChannelCategoryRepository,
    BusinessSalesChannelCategorySingleByIdLoader
  ]
})
export class BusinessSalesChannelCategoryModule {}
