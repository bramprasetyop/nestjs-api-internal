import { Body, Controller, Post } from '@nestjs/common';
import { CancelHubsterOrderRequest } from './dto/cancelHubsterOrderRequest.dto';
import {
  DailyFinanceReportRequest,
  DailyFinanceReportUnprocessedRequest
} from './dto/dailyFinanceReportRequest.dto';
import { CancelHubsterOrderUseCase } from './useCases/cancelHubsterOrder.usecase';
import { DailyFinanceReportUseCase } from './useCases/dailyFinanceReport.usecase';
import { DailyFinanceReportUnprocessedUseCase } from './useCases/dailyFinanceReportUnprocessed.usecase';
import { ReconcileHubsterOrderUseCase } from './useCases/reconcileHubsterOrder.usecase';
import { ReconcileHubsterOrderUnprocessedUseCase } from './useCases/reconcileHubsterOrderUnprocessed.usecase';
import { ReconcileHubsterOrderRequest } from './dto/reconcileHubsterOrder.dto';
import { PublishDocusignCallbackUseCase } from './useCases/publishDocusignCallback.usecase';
import { CheckAndCreateSalesOrderUseCase } from './useCases/checkAndCreateSalesOrder.usecase';
import { TransferDailyFinanceReportUseCase } from './useCases/transferDailyFinanceReport.usecase';
import { TransferDailyFinanceReportUnprocessedUseCase } from './useCases/transferDailyFinanceReportUnprocessed.usecase';
import {
  TransferDailyFinanceReportRequest,
  TransferDailyFinanceReportUnprocessedRequest
} from './dto/transferDailyFinanceReportRequest.dto';
import { CheckAndCreateHubsterOrderUseCase } from './useCases/checkAndCreateHubsterOrder.usecase';
import { QualityControlExpiredReminderUseCase } from './useCases/qualityControlExpiredReminder.usecase';
import { CheckAndHardDeletesHubsterOrderUseCase } from './useCases/checkAndHardDeletesHubsterOrder.usecase';
import { BusinessOutletLeadExpiredReminderUseCase } from './useCases/businessOutletLeadExpiredReminder.usercase';
import { CheckAndCreateBusinessOutletQualityControlRequest } from './dto/checkAndCreateBusinessOutletQualityControlRequest.dto';
import { CheckAndCreateBusinessOutletQualityControlUseCase } from './useCases/checkAndCreateBusinessOutletQualityControl.usecase';
import { CheckAndSetBusinessOutletQualityControlExpiredUseCase } from './useCases/checkAndSetBusinessOutletQualityControlExpired.usecase';

@Controller('cron')
export class CronController {
  constructor(
    private businessOutletLeadExpiredReminderUseCase: BusinessOutletLeadExpiredReminderUseCase,
    private checkAndCreateSalesOrderUseCase: CheckAndCreateSalesOrderUseCase,
    private transferDailyFinanceReportUseCase: TransferDailyFinanceReportUseCase,
    private transferDailyFinanceReportUnprocessedUseCase: TransferDailyFinanceReportUnprocessedUseCase,
    private dailyFinanceReportUseCase: DailyFinanceReportUseCase,
    private dailyFinanceReportUnprocessedUseCase: DailyFinanceReportUnprocessedUseCase,
    private publishDocusignCallbackUseCase: PublishDocusignCallbackUseCase,
    private reconcileHubsterOrderUseCase: ReconcileHubsterOrderUseCase,
    private reconcileHubsterOrderUnprocessedUseCase: ReconcileHubsterOrderUnprocessedUseCase,
    private checkAndCreateBusinessOutletQualityControlUseCase: CheckAndCreateBusinessOutletQualityControlUseCase,
    private checkAndSetBusinessOutletQualityControlExpiredUseCase: CheckAndSetBusinessOutletQualityControlExpiredUseCase,
    private qualityControlExpiredReminderUseCase: QualityControlExpiredReminderUseCase,
    private cancelHubsterOrderUseCase: CancelHubsterOrderUseCase,
    private checkAndCreateHubsterOrderUseCase: CheckAndCreateHubsterOrderUseCase,
    private checkAndHardDeletesHubsterOrderUseCase: CheckAndHardDeletesHubsterOrderUseCase
  ) {}

  //notification cron
  @Post('notification/business-outlet-lead-expired-reminder')
  public async notificationBusinessOutletLeadExpiredReminder() {
    try {
      this.businessOutletLeadExpiredReminderUseCase.execute();
      return { success: true };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Post('notification/business-outlet-quality-control-expired-reminder')
  public async notificationBusinessOutletQualityControlExpiredReminder() {
    try {
      this.qualityControlExpiredReminderUseCase.execute();
      return { success: true };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Post('hubster-order/check-and-create-hubster-order')
  public async checkAndCreateHubsterOrder() {
    try {
      this.checkAndCreateHubsterOrderUseCase.execute();
      return { success: true };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Post('sales-order/check-and-create-sales-order')
  public async checkAndCreateSalesOrder() {
    try {
      this.checkAndCreateSalesOrderUseCase.execute();
      return { success: true };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Post('sales-order/cancel-hubster-order')
  public async cancelHubsterOrder(@Body() dto: CancelHubsterOrderRequest) {
    try {
      this.cancelHubsterOrderUseCase.execute(dto);
      return { success: true };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Post('sales-order/daily-finance-report')
  public async dailyFinanceReport(@Body() dto: DailyFinanceReportRequest) {
    try {
      this.dailyFinanceReportUseCase.execute(dto);
      return { success: true };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Post('sales-order/daily-finance-report-unprocessed')
  public async dailyFinanceReportUnprocessed(
    @Body() dto: DailyFinanceReportUnprocessedRequest
  ) {
    try {
      this.dailyFinanceReportUnprocessedUseCase.execute(dto);
      return { success: true };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Post('sales-order/transfer-daily-finance-report')
  public async transferDailyFinanceReport(
    @Body() dto: TransferDailyFinanceReportRequest
  ) {
    try {
      this.transferDailyFinanceReportUseCase.execute(dto);
      return { success: true };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Post('sales-order/transfer-daily-finance-report-unprocessed')
  public async transferDailyFinanceReportUnprocessed(
    @Body() dto: TransferDailyFinanceReportUnprocessedRequest
  ) {
    try {
      this.transferDailyFinanceReportUnprocessedUseCase.execute(dto);
      return { success: true };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Post('docusign/publish-event')
  public async publishDocusignCallback() {
    try {
      this.publishDocusignCallbackUseCase.execute();
      return { success: true };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Post('hubster/reconcile-hubster-order')
  public async reconcileHubsterOrder(
    @Body() dto: ReconcileHubsterOrderRequest
  ) {
    try {
      this.reconcileHubsterOrderUseCase.execute(dto);
      return { success: true };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Post('hubster/reconcile-hubster-order-unprocessed')
  public async reconcileHubsterOrderUnprocessed(
    @Body() dto: ReconcileHubsterOrderRequest
  ) {
    try {
      this.reconcileHubsterOrderUnprocessedUseCase.execute(dto);
      return { success: true };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Post(
    'business-outlet-quality-control/check-and-create-business-outlet-quality-control'
  )
  public async checkAndCreateBusinessOutletQualityControl(
    @Body() dto: CheckAndCreateBusinessOutletQualityControlRequest
  ) {
    try {
      await this.checkAndCreateBusinessOutletQualityControlUseCase.execute(dto);
      return { success: true };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Post(
    'business-outlet-quality-control/check-and-set-business-outlet-quality-control-expired'
  )
  public async checkAndSetBusinessOutletQualityControlExpired() {
    try {
      await this.checkAndSetBusinessOutletQualityControlExpiredUseCase.execute();
      return { success: true };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Post('hubster-order/check-and-hard-deletes-hubster-order')
  public async checkAndHardDeletesHubsterOrder() {
    try {
      this.checkAndHardDeletesHubsterOrderUseCase.execute();
      return { success: true };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
