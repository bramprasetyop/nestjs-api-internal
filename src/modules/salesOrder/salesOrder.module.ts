import { HttpModule, Module } from '@nestjs/common';
import {
  InjectionKey,
  SalesOrderBusinessMenuItemModel,
  SalesOrderBusinessMenuModifierItemModel,
  SalesOrderModel
} from '@wahyoo/wahyoo-shared';
import { BusinessMenuItemModule } from '../businessMenuItem/businessMenuItem.module';
import { BusinessOutletModule } from '../businessOutlet/businessOutlet.module';
import { InternalAPIService } from '../external/internalAPI.service';
import { JWTService } from '../external/jwt.service';
import { UserModule } from '../user/user.module';
import { SalesOrderRepository } from './repositories/salesOrder.repository';
import { SalesOrderBusinessMenuItemRepository } from './repositories/salesOrderBusinessMenuItem.repository';
import { SalesOrderBusinessMenuModifierItemRepository } from './repositories/salesOrderBusinessMenuModifierItem.repository';
import { SalesOrderReportRepository } from './repositories/salesOrderReport.repository';
import { SalesOrderResolver } from './salesOrder.resolver';
import { SalesOrderBusinessMenuItemBatchBySalesOrderIdLoader } from './salesOrderBusinessMenuItem.batchBySalesOrderId.loader';
import { SalesOrderBusinessMenuItemResolver } from './salesOrderBusinessMenuItem.resolver';
import { SalesOrderBusinessMenuModifierItemBatchBySalesOrderBusinessMenuItemIdLoader } from './salesOrderBusinessMenuModifierItem.batchBySalesOrderBusinessMenuItemId.loader';
import { SalesOrderReportResolver } from './salesOrderReport.resolver';
import { OrderDeliveryTimeWindowGetListUseCase } from './useCases/orderDeliveryTimeWindow.getList';
import { SalesOrderGetByIdUseCase } from './useCases/salesOrder.getById.usecase';
import { SalesOrderGetListUseCase } from './useCases/salesOrder.getList.usecase';
import { SalesOrderGetSummaryListUseCase } from './useCases/salesOrder.getSummaryList.usecase';
import { SalesOrderGetSyncStatusUseCase } from './useCases/salesOrder.getSyncStatus.usecase';
import { SalesOrderSyncUseCase } from './useCases/salesOrder.sync.usecase';
import { SalesOrderUpdateUserInfoUseCase } from './useCases/salesOrder.updateUserInfo.usecase';
import { SalesOrderReportGetReportListUseCase } from './useCases/salesOrderReport.getReportList.usecase';
import { SalesOrderReportGetReportListByMenuItemUseCase } from './useCases/salesOrderReport.getReportListByMenuItem.usecase';
import { SalesOrderReportGetReportListByChannelUseCase } from './useCases/salesOrderReport.getReportListBySalesChannel.usecase';

@Module({
  imports: [
    HttpModule,
    BusinessOutletModule,
    UserModule,
    BusinessMenuItemModule
  ],
  providers: [
    SalesOrderRepository,
    SalesOrderReportRepository,
    SalesOrderBusinessMenuItemRepository,
    SalesOrderBusinessMenuModifierItemRepository,
    SalesOrderResolver,
    SalesOrderReportResolver,
    SalesOrderBusinessMenuItemResolver,
    SalesOrderGetSyncStatusUseCase,
    OrderDeliveryTimeWindowGetListUseCase,
    SalesOrderGetListUseCase,
    SalesOrderGetByIdUseCase,
    SalesOrderGetSummaryListUseCase,
    SalesOrderSyncUseCase,
    SalesOrderUpdateUserInfoUseCase,
    SalesOrderReportGetReportListUseCase,
    SalesOrderReportGetReportListByMenuItemUseCase,
    SalesOrderReportGetReportListByChannelUseCase,
    SalesOrderBusinessMenuItemBatchBySalesOrderIdLoader,
    SalesOrderBusinessMenuModifierItemBatchBySalesOrderBusinessMenuItemIdLoader,
    InternalAPIService,
    JWTService,
    { provide: InjectionKey.SALES_ORDER_MODEL, useValue: SalesOrderModel },
    {
      provide: InjectionKey.SALES_ORDER_BUSINESS_MENU_ITEM_MODEL,
      useValue: SalesOrderBusinessMenuItemModel
    },
    {
      provide: InjectionKey.SALES_ORDER_BUSINESS_MENU_MODIFIER_ITEM_MODEL,
      useValue: SalesOrderBusinessMenuModifierItemModel
    }
  ],
  exports: [
    SalesOrderRepository,
    SalesOrderReportRepository,
    SalesOrderBusinessMenuItemRepository,
    SalesOrderBusinessMenuModifierItemRepository,
    SalesOrderBusinessMenuItemBatchBySalesOrderIdLoader,
    SalesOrderBusinessMenuModifierItemBatchBySalesOrderBusinessMenuItemIdLoader
  ]
})
export class SalesOrderModule {}
