import { Module } from '@nestjs/common';
import {
  BusinessOutletDailyFinanceReportModel,
  BusinessOutletPropertyModel,
  InjectionKey,
  OrganizationUserDailyFeeReportModel,
  OrganizationUserDailyFinanceReportModel,
  OrganizationUserModel,
  SalesOrderBusinessMenuItemModel,
  SalesOrderModel,
  XWahyooPaymentAdjustmentRequestDetailModel
} from '@wahyoo/wahyoo-shared';
import { BusinessOutletModule } from '../businessOutlet/businessOutlet.module';
import { UserModule } from '../user/user.module';
import { BusinessOutletDailyFinanceReportResolver } from './businessOutletDailyFinanceReport.resolver';
import { OrganizationUserDailyFeeAssignmentResolver } from './organizationUserDailyFeeAssignment.resolver';
import { OrganizationUserDailyFeeReportResolver } from './organizationUserDailyFeeReport.resolver';
import { OrganizationUserDailyFeeReportSingleByOrganizationUserDailyFinanceReportLoader } from './organizationUserDailyFeeReport.singleByOrganizationUserDailyFinanceReport.loader';
import { OrganizationUserDailyFinanceReportResolver } from './organizationUserDailyFinanceReport.resolver';
import { BusinessOutletDailyFinanceReportRepository } from './repositories/businessOutletDailyFinanceReport.repository';
import { OrganizationUserDailyFeeAssignmentRepository } from './repositories/organizationUserDailyFeeAssignment.repository';
import { OrganizationUserDailyFeeReportRepository } from './repositories/organizationUserDailyFeeReport.repository';
import { OrganizationUserDailyFinanceReportRepository } from './repositories/organizationUserDailyFinanceReport.repository';
import { XWahyooPaymentAdjustmentRequestDetailRepository } from './repositories/xWahyooPaymentAdjustmentRequestDetail.repository';
import { BusinessOutletDailyFinanceReportGetByIdUseCase } from './useCases/businessOutletDailyFinanceReport.getById.usecase';
import { BusinessOutletDailyFinanceReportGetListUseCase } from './useCases/businessOutletDailyFinanceReport.getList.usecase';
import { BusinessOutletDailyFinanceReportGetReportListBySalesChannelUseCase } from './useCases/businessOutletDailyFinanceReport.getReportListBySalesChannel.usecase';
import { BusinessOutletDailyFinanceReportGetReportListByMenuItemUseCase } from './useCases/businessOutletDailyFinanceReport.getReportListByMenuItem.usecase';
import { MyOrganizationUserDailyFinanceReportGetListUseCase } from './useCases/myOrganizationUserDailyFinanceReport.getList.usecase';
import { OrganizationUserDailyFeeAssignmentGetListUseCase } from './useCases/organizationUserDailyFeeAssignment.getList.usecase';
import { OrganizationUserDailyFeeAssignmentUpdateUseCase } from './useCases/organizationUserDailyFeeAssignment.update.usecase';
import { OrganizationUserDailyFeeReportGetByIdUseCase } from './useCases/organizationUserDailyFeeReport.getById.usecase';
import { OrganizationUserDailyFinanceReportGetByIdUseCase } from './useCases/organizationUserDailyFinanceReport.getById.usecase';
import { OrganizationUserDailyFinanceReportGetListUseCase } from './useCases/organizationUserDailyFinanceReport.getList.usecase';
import { XWahyooPaymentAdjustmentRequestDetailSingleByOrganizationUserDailyFeeReportIdLoader } from './xWahyooPaymentAdjustmentRequestDetail.singleByOrganizationUserDailyFeeReportId.loader';
import { XWahyooPaymentAdjustmentRequestDetailSingleByOrganizationUserDailyFinanceReportIdLoader } from './xWahyooPaymentAdjustmentRequestDetail.singleByOrganizationUserDailyFinanceReportId.loader';

@Module({
  imports: [UserModule, BusinessOutletModule],
  providers: [
    BusinessOutletDailyFinanceReportResolver,
    OrganizationUserDailyFeeReportResolver,
    OrganizationUserDailyFinanceReportResolver,
    OrganizationUserDailyFeeAssignmentResolver,
    BusinessOutletDailyFinanceReportGetByIdUseCase,
    BusinessOutletDailyFinanceReportGetListUseCase,
    BusinessOutletDailyFinanceReportGetReportListBySalesChannelUseCase,
    BusinessOutletDailyFinanceReportGetReportListByMenuItemUseCase,
    MyOrganizationUserDailyFinanceReportGetListUseCase,
    OrganizationUserDailyFeeReportGetByIdUseCase,
    OrganizationUserDailyFinanceReportGetByIdUseCase,
    OrganizationUserDailyFinanceReportGetListUseCase,
    OrganizationUserDailyFeeAssignmentGetListUseCase,
    OrganizationUserDailyFeeAssignmentUpdateUseCase,
    BusinessOutletDailyFinanceReportRepository,
    OrganizationUserDailyFeeReportRepository,
    OrganizationUserDailyFinanceReportRepository,
    XWahyooPaymentAdjustmentRequestDetailRepository,
    OrganizationUserDailyFeeAssignmentRepository,
    OrganizationUserDailyFeeReportSingleByOrganizationUserDailyFinanceReportLoader,
    XWahyooPaymentAdjustmentRequestDetailSingleByOrganizationUserDailyFeeReportIdLoader,
    XWahyooPaymentAdjustmentRequestDetailSingleByOrganizationUserDailyFinanceReportIdLoader,
    {
      provide: InjectionKey.BUSINESS_OUTLET_DAILY_FINANCE_REPORT_MODEL,
      useValue: BusinessOutletDailyFinanceReportModel
    },
    {
      provide: InjectionKey.ORGANIZATION_USER_DAILY_FEE_REPORT_MODEL,
      useValue: OrganizationUserDailyFeeReportModel
    },
    {
      provide: InjectionKey.ORGANIZATION_USER_DAILY_FINANCE_REPORT_MODEL,
      useValue: OrganizationUserDailyFinanceReportModel
    },
    {
      provide: InjectionKey.X_WAHYOO_PAYMENT_ADJUSTMENT_REQUEST_DETAIL_MODEL,
      useValue: XWahyooPaymentAdjustmentRequestDetailModel
    },
    {
      provide: InjectionKey.ORGANIZATION_USER_MODEL,
      useValue: OrganizationUserModel
    },
    {
      provide: InjectionKey.BUSINESS_OUTLET_PROPERTY_MODEL,
      useValue: BusinessOutletPropertyModel
    },
    {
      provide: InjectionKey.SALES_ORDER_MODEL,
      useValue: SalesOrderModel
    },
    {
      provide: InjectionKey.SALES_ORDER_BUSINESS_MENU_ITEM_MODEL,
      useValue: SalesOrderBusinessMenuItemModel
    }
  ],
  exports: [
    OrganizationUserDailyFeeReportRepository,
    XWahyooPaymentAdjustmentRequestDetailRepository,
    OrganizationUserDailyFeeReportSingleByOrganizationUserDailyFinanceReportLoader,
    XWahyooPaymentAdjustmentRequestDetailSingleByOrganizationUserDailyFeeReportIdLoader,
    XWahyooPaymentAdjustmentRequestDetailSingleByOrganizationUserDailyFinanceReportIdLoader
  ]
})
export class DailyFinanceReportModule {}
