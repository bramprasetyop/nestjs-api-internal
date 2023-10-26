import { UserModule } from '../user/user.module';
import { BusinessModule } from '../business/business.module';
import { forwardRef, Module } from '@nestjs/common';
import { BusinessMenuItemModule } from '../businessMenuItem/businessMenuItem.module';
import { BusinessMenuCategoryResolver } from './businessMenuCategory.resolver';
import { BusinessMenuCategoryRepository } from './repositories/businessMenuCategory.repository';
import { BusinessMenuCategoryCreateUseCase } from './useCases/businessMenuCategory.create.usecase';
import { BusinessMenuCategoryUpdateUseCase } from './useCases/businessMenuCategory.update.usecase';
import { BusinessMenuCategoryDeleteUseCase } from './useCases/businessMenuCategory.delete.usecase';
import { BusinessMenuCategoryGetByIdUseCase } from './useCases/businessMenuCategory.getById.usecase';
import { BusinessMenuCategoryGetListUseCase } from './useCases/businessMenuCategory.getList.usercase';
import { BusinessMenuCategorySingleByIdLoader } from './businessMenuCategory.singleById.loader';
import { BusinessSalesChannelMenuCategoryResolver } from './businessSalesChannelMenuCategory.resolver';
import { BusinessSalesChannelMenuCategoryRepository } from './repositories/businessSalesChannelMenuCategory.repository';
import { BusinessSalesChannelMenuCategoryBatchByBusinessSalesChannelIdLoader } from './BusinessSalesChannelMenuCategory.batchByBusinessSalesChannelId.loader';
import { BusinessSalesChannelMenuCategoryItemBatchByBusinessMenuCategoryIdLoader } from './businessSalesChannelMenuCategory.batchByBusinessMenuCategoryId.loader';
import { BusinessSalesChannelMenuCategoryBatchTotalActiveChannelByMenuCategoryId } from './businessSalesChannelMenuCategory.batchTotalActiveChannelByMenuCategoryId';
import {
  BusinessMenuCategoryModel,
  BusinessSalesChannelMenuCategoryModel,
  InjectionKey
} from '@wahyoo/wahyoo-shared';

@Module({
  imports: [
    BusinessModule,
    UserModule,
    forwardRef(() => BusinessMenuItemModule)
  ],
  providers: [
    BusinessMenuCategoryResolver,
    BusinessSalesChannelMenuCategoryResolver,
    BusinessMenuCategoryGetByIdUseCase,
    BusinessMenuCategoryGetListUseCase,
    BusinessMenuCategoryCreateUseCase,
    BusinessMenuCategoryUpdateUseCase,
    BusinessMenuCategoryDeleteUseCase,
    BusinessMenuCategoryRepository,
    BusinessSalesChannelMenuCategoryRepository,
    BusinessSalesChannelMenuCategoryBatchByBusinessSalesChannelIdLoader,
    BusinessSalesChannelMenuCategoryItemBatchByBusinessMenuCategoryIdLoader,
    BusinessSalesChannelMenuCategoryBatchTotalActiveChannelByMenuCategoryId,
    BusinessMenuCategorySingleByIdLoader,
    {
      provide: InjectionKey.BUSINESS_MENU_CATEGORY_MODEL,
      useValue: BusinessMenuCategoryModel
    },
    {
      provide: InjectionKey.BUSINESS_SALES_CHANNEL_MENU_CATEGORY_MODEL,
      useValue: BusinessSalesChannelMenuCategoryModel
    }
  ],
  exports: [
    BusinessMenuCategoryRepository,
    BusinessSalesChannelMenuCategoryRepository,
    BusinessSalesChannelMenuCategoryBatchByBusinessSalesChannelIdLoader,
    BusinessSalesChannelMenuCategoryItemBatchByBusinessMenuCategoryIdLoader,
    BusinessMenuCategorySingleByIdLoader
  ]
})
export class BusinessMenuCategoryModule {}
