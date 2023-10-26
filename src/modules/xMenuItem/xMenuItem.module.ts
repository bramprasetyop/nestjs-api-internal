import { Module } from '@nestjs/common';
import {
  InjectionKey,
  XHubsterItemModel,
  XKlikitItemModel,
  BusinessMenuItemModel
} from '@wahyoo/wahyoo-shared';
import { BusinessMenuItemModule } from '../businessMenuItem/businessMenuItem.module';
import { XMenuItemResolver } from './xMenuItem.resolver';
import { XMenuItemRepository } from './repositories/xMenuItem.repository';
import { XMenuItemGetUnassignedListUseCase } from './useCases/xMenuItem.getUnassignedList.usecase';
import { XMenuItemAssignBusinessMenuItemUseCase } from './useCases/xMenuItem.assignBusinessMenuItem.usecase';

@Module({
  imports: [BusinessMenuItemModule],
  providers: [
    XMenuItemResolver,
    XMenuItemRepository,
    XMenuItemGetUnassignedListUseCase,
    XMenuItemAssignBusinessMenuItemUseCase,
    {
      provide: InjectionKey.X_HUBSTER_ITEM_MODEL,
      useValue: XHubsterItemModel
    },
    {
      provide: InjectionKey.X_KLIKIT_ITEM_MODEL,
      useValue: XKlikitItemModel
    },
    {
      provide: InjectionKey.BUSINESS_MENU_ITEM_MODEL,
      useValue: BusinessMenuItemModel
    }
  ],
  exports: [XMenuItemRepository, XMenuItemRepository]
})
export class XMenuItemModule {}
