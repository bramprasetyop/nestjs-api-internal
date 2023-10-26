import { Module } from '@nestjs/common';
import {
  InjectionKey,
  XHubsterStoreModel,
  XHubsterItemModel,
  BusinessMenuItemModel
} from '@wahyoo/wahyoo-shared';
import { XHubsterStoreResolver } from './xHubsterStore.resolver';
import { XHubsterStoreRepository } from './repositories/xHubsterStore.repository';
import { XHubsterStoreAssignBusinessOutletUseCase } from './useCases/xHubsterStore.assignBusinessOutlet.usecase';
import { XHubsterStoreGetUnassignedListUseCase } from './useCases/xHubsterStore.getUnassignedList.usecase';
import { XHubsterItemResolver } from './xHubsterItem.resolver';
import { XHubsterItemRepository } from './repositories/xHubsterItem.repository';
import { XHubsterItemGetUnassignedListUseCase } from './useCases/xHubsterItem.getUnassignedList.usecase';
import { XHubsterItemAssignBusinessMenuItemUseCase } from './useCases/xHubsterItem.assignBusinessMenuItem.usecase';
import { XHubsterStoreSingleByBusinessOutletIdLoader } from './xHubsterStore.singleByBusinessOutletId.loader';
import { XHubsterItemBatchByBusinessMenuItemIdLoader } from './xHubsterItem.batchByBusinessMenuItemId.loader';
import { XHubsterStoreBatchByBusinessOutletIdLoader } from './xHubsterStore.batchByBusinessOutletId.loader';

@Module({
  imports: [],
  providers: [
    XHubsterStoreResolver,
    XHubsterItemResolver,
    XHubsterStoreGetUnassignedListUseCase,
    XHubsterStoreAssignBusinessOutletUseCase,
    XHubsterItemGetUnassignedListUseCase,
    XHubsterItemAssignBusinessMenuItemUseCase,
    XHubsterStoreRepository,
    XHubsterItemRepository,
    XHubsterStoreBatchByBusinessOutletIdLoader,
    XHubsterStoreSingleByBusinessOutletIdLoader,
    XHubsterItemBatchByBusinessMenuItemIdLoader,
    {
      provide: InjectionKey.X_HUBSTER_STORE_MODEL,
      useValue: XHubsterStoreModel
    },
    {
      provide: InjectionKey.X_HUBSTER_ITEM_MODEL,
      useValue: XHubsterItemModel
    },
    {
      provide: InjectionKey.BUSINESS_MENU_ITEM_MODEL,
      useValue: BusinessMenuItemModel
    }
  ],
  exports: [
    XHubsterItemRepository,
    XHubsterItemRepository,
    XHubsterStoreRepository,
    XHubsterStoreBatchByBusinessOutletIdLoader,
    XHubsterStoreSingleByBusinessOutletIdLoader
  ]
})
export class HubsterModule {}
