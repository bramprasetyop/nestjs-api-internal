import { forwardRef, Module } from '@nestjs/common';
import {
  BusinessMenuItemModifierModel,
  XHubsterItemModel,
  XKlikitItemModel
} from '@wahyoo/wahyoo-shared';
import { BusinessSalesChannelMenuItemModel } from '@wahyoo/wahyoo-shared';
import { BusinessMenuItemModel, InjectionKey } from '@wahyoo/wahyoo-shared';
import { BusinessModule } from '../business/business.module';
import { BusinessMenuCategoryModule } from '../businessMenuCategory/businessMenuCategory.module';
import { BusinessSalesChannelModule } from '../businessSalesChannel/businessSalesChannel.module';
import { UserModule } from '../user/user.module';
import { BusinessMenuItemBatchByMenuCategoryIdLoader } from './businessMenuItem.batchByMenuCategoryId.loader';
import { BusinessMenuItemResolver } from './businessMenuItem.resolver';
import { BusinessMenuItemSingleByIdLoader } from './businessMenuItem.singleById.loader';
import { BusinessMenuItemModifierBatchByMenuItemIdLoader } from './businessMenuItemModifier.batchByMenuItemId.loader';
import { BusinessMenuItemModifierResolver } from './businessMenuItemModifier.resolver';
import { BusinessSalesChannelMenuItemBatchTotalActiveChannelByMenuItemIdLoader } from './businessSalesChannelMenuCategory.batchTotalActiveChannelByMenuItemId';
import { BusinessSalesChannelMenuItemBatchByBusinessSalesChannelIdLoader } from './businessSalesChannelMenuItem.batchByBusinessSalesChannelId.loader';
import { BusinessSalesChannelMenuItemBatchByMenuItemIdLoader } from './businessSalesChannelMenuItem.batchByMenuItemId.loader';
import { BusinessSalesChannelMenuItemResolver } from './businessSalesChannelMenuItem.resolver';
import { BusinessMenuItemRepository } from './repositories/businessMenuItem.repository';
import { BusinessMenuItemModifierRepository } from './repositories/businessMenuItemModifier.repository';
import { BusinessSalesChannelMenuItemRepository } from './repositories/businessSalesChannelMenuItem.repository';
import { BusinessMenuItemCreateUseCase } from './useCases/businessMenuItem.create.usecase';
import { BusinessMenuItemDeleteUseCase } from './useCases/businessMenuItem.delete.usecase';
import { BusinessMenuItemGetByIdUseCase } from './useCases/businessMenuItem.getById.usecase';
import { BusinessMenuItemGetListUseCase } from './useCases/businessMenuItem.getList.usecase';
import { BusinessMenuItemUpdateUseCase } from './useCases/businessMenuItem.update.usecase';

@Module({
  imports: [
    forwardRef(() => BusinessMenuCategoryModule),
    BusinessModule,
    UserModule,
    BusinessSalesChannelModule
  ],
  providers: [
    BusinessMenuItemResolver,
    BusinessMenuItemModifierResolver,
    BusinessSalesChannelMenuItemResolver,
    BusinessMenuItemCreateUseCase,
    BusinessMenuItemGetByIdUseCase,
    BusinessMenuItemGetListUseCase,
    BusinessMenuItemUpdateUseCase,
    BusinessMenuItemDeleteUseCase,
    BusinessMenuItemRepository,
    BusinessSalesChannelMenuItemRepository,
    BusinessMenuItemModifierRepository,
    BusinessMenuItemBatchByMenuCategoryIdLoader,
    BusinessMenuItemSingleByIdLoader,
    BusinessMenuItemModifierBatchByMenuItemIdLoader,
    BusinessSalesChannelMenuItemBatchByMenuItemIdLoader,
    BusinessSalesChannelMenuItemBatchTotalActiveChannelByMenuItemIdLoader,
    BusinessSalesChannelMenuItemBatchByBusinessSalesChannelIdLoader,
    {
      provide: InjectionKey.BUSINESS_MENU_ITEM_MODEL,
      useValue: BusinessMenuItemModel
    },
    {
      provide: InjectionKey.BUSINESS_MENU_ITEM_MODIFIER_MODEL,
      useValue: BusinessMenuItemModifierModel
    },
    {
      provide: InjectionKey.BUSINESS_SALES_CHANNEL_MENU_ITEM_MODEL,
      useValue: BusinessSalesChannelMenuItemModel
    },
    {
      provide: InjectionKey.X_HUBSTER_ITEM_MODEL,
      useValue: XHubsterItemModel
    },
    {
      provide: InjectionKey.X_KLIKIT_ITEM_MODEL,
      useValue: XKlikitItemModel
    }
  ],
  exports: [
    BusinessMenuItemRepository,
    BusinessMenuItemModifierRepository,
    BusinessSalesChannelMenuItemRepository,
    BusinessMenuItemBatchByMenuCategoryIdLoader,
    BusinessMenuItemSingleByIdLoader,
    BusinessMenuItemModifierBatchByMenuItemIdLoader,
    BusinessSalesChannelMenuItemBatchByMenuItemIdLoader,
    BusinessSalesChannelMenuItemBatchTotalActiveChannelByMenuItemIdLoader,
    BusinessSalesChannelMenuItemBatchByBusinessSalesChannelIdLoader
  ]
})
export class BusinessMenuItemModule {}
