import { Module } from '@nestjs/common';
import {
  InjectionKey,
  XKlikitItemModel,
  BusinessMenuItemModel
} from '@wahyoo/wahyoo-shared';
import { BusinessMenuItemModule } from '../businessMenuItem/businessMenuItem.module';
import { XKlikitItemResolver } from './xKlikitItem.resolver';
import { XKlikitItemRepository } from './repositories/xKlikitItem.repository';
import { XKlikitItemBatchByBusinessMenuItemIdLoader } from './xKlikitItem.batchByBusinessMenuItemId.loader';

@Module({
  imports: [BusinessMenuItemModule],
  providers: [
    XKlikitItemResolver,
    XKlikitItemRepository,
    XKlikitItemBatchByBusinessMenuItemIdLoader,
    {
      provide: InjectionKey.X_KLIKIT_ITEM_MODEL,
      useValue: XKlikitItemModel
    },
    {
      provide: InjectionKey.BUSINESS_MENU_ITEM_MODEL,
      useValue: BusinessMenuItemModel
    }
  ],
  exports: [XKlikitItemRepository]
})
export class KlikitModule {}
