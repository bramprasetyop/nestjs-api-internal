import { Module } from '@nestjs/common';
import { CronController } from './controllers/cron/cron.controller';
import { CancelHubsterOrderUseCase } from './controllers/cron/useCases/cancelHubsterOrder.usecase';
import { DailyFinanceReportUseCase } from './controllers/cron/useCases/dailyFinanceReport.usecase';
import { DailyFinanceReportUnprocessedUseCase } from './controllers/cron/useCases/dailyFinanceReportUnprocessed.usecase';
import { ReconcileHubsterOrderUseCase } from './controllers/cron/useCases/reconcileHubsterOrder.usecase';
import { ReconcileHubsterOrderUnprocessedUseCase } from './controllers/cron/useCases/reconcileHubsterOrderUnprocessed.usecase';
import { PublishDocusignCallbackUseCase } from './controllers/cron/useCases/publishDocusignCallback.usecase';
import { CheckAndCreateSalesOrderUseCase } from './controllers/cron/useCases/checkAndCreateSalesOrder.usecase';
import { CheckAndCreateHubsterOrderUseCase } from './controllers/cron/useCases/checkAndCreateHubsterOrder.usecase';
import { TransferDailyFinanceReportUseCase } from './controllers/cron/useCases/transferDailyFinanceReport.usecase';
import { TransferDailyFinanceReportUnprocessedUseCase } from './controllers/cron/useCases/transferDailyFinanceReportUnprocessed.usecase';
import { QualityControlExpiredReminderUseCase } from './controllers/cron/useCases/qualityControlExpiredReminder.usecase';
import { CheckAndHardDeletesHubsterOrderUseCase } from './controllers/cron/useCases/checkAndHardDeletesHubsterOrder.usecase';
import { BusinessOutletLeadExpiredReminderUseCase } from './controllers/cron/useCases/businessOutletLeadExpiredReminder.usercase';
import { CheckAndCreateBusinessOutletQualityControlUseCase } from './controllers/cron/useCases/checkAndCreateBusinessOutletQualityControl.usecase';
import { CheckAndSetBusinessOutletQualityControlExpiredUseCase } from './controllers/cron/useCases/checkAndSetBusinessOutletQualityControlExpired.usecase';
import {
  BusinessPropertyModel,
  BusinessOutletModel,
  BusinessOutletLeadModel,
  CommonModule,
  InjectionKey,
  BusinessOutletPropertyModel,
  XHubsterOrderModel,
  OrganizationUserDailyFinanceReportModel,
  XHubsterEventModel,
  OrganizationUserDailyFeeReportModel,
  BusinessOutletQualityControlModel,
  XHubsterStoreModel,
  BusinessOutletLeadLogModel
} from '@wahyoo/wahyoo-shared';

@Module({
  imports: [CommonModule],
  controllers: [CronController],
  providers: [
    BusinessOutletLeadExpiredReminderUseCase,
    CheckAndCreateSalesOrderUseCase,
    CheckAndCreateHubsterOrderUseCase,
    CancelHubsterOrderUseCase,
    PublishDocusignCallbackUseCase,
    ReconcileHubsterOrderUseCase,
    ReconcileHubsterOrderUnprocessedUseCase,
    TransferDailyFinanceReportUseCase,
    TransferDailyFinanceReportUnprocessedUseCase,
    QualityControlExpiredReminderUseCase,
    DailyFinanceReportUseCase,
    DailyFinanceReportUnprocessedUseCase,
    CheckAndCreateBusinessOutletQualityControlUseCase,
    CheckAndSetBusinessOutletQualityControlExpiredUseCase,
    CheckAndHardDeletesHubsterOrderUseCase,
    {
      provide: InjectionKey.BUSINESS_PROPERTY_MODEL,
      useValue: BusinessPropertyModel
    },
    {
      provide: InjectionKey.BUSINESS_OUTLET_MODEL,
      useValue: BusinessOutletModel
    },
    {
      provide: InjectionKey.BUSINESS_OUTLET_LEAD_MODEL,
      useValue: BusinessOutletLeadModel
    },
    {
      provide: InjectionKey.BUSINESS_OUTLET_LEAD_LOG_MODEL,
      useValue: BusinessOutletLeadLogModel
    },
    {
      provide: InjectionKey.X_HUBSTER_ORDER_MODEL,
      useValue: XHubsterOrderModel
    },
    {
      provide: InjectionKey.X_HUBSTER_STORE_MODEL,
      useValue: XHubsterStoreModel
    },
    {
      provide: InjectionKey.BUSINESS_OUTLET_PROPERTY_MODEL,
      useValue: BusinessOutletPropertyModel
    },
    {
      provide: InjectionKey.ORGANIZATION_USER_DAILY_FINANCE_REPORT_MODEL,
      useValue: OrganizationUserDailyFinanceReportModel
    },
    {
      provide: InjectionKey.ORGANIZATION_USER_DAILY_FEE_REPORT_MODEL,
      useValue: OrganizationUserDailyFeeReportModel
    },
    {
      provide: InjectionKey.X_HUBSTER_EVENT_MODEL,
      useValue: XHubsterEventModel
    },
    {
      provide: InjectionKey.BUSINESS_OUTLET_QUALITY_CONTROL_MODEL,
      useValue: BusinessOutletQualityControlModel
    }
  ],
  exports: []
})
export class RestModule {}
