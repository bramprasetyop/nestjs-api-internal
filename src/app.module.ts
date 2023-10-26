import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {
  config,
  EmailModule,
  NotificationModule,
  GCloudStorageModule,
  LoggerModule,
  MessagingModule,
  DocusignModule,
  HubsterPosModule,
  DatabaseModule,
  RabbitMQModule
} from '@wahyoo/wahyoo-shared';
import { GraphQLModule } from '@nestjs/graphql';
import { OrganizationModule } from './modules/organization/organization.module';
import { BusinessMenuCategoryModule } from './modules/businessMenuCategory/businessMenuCategory.module';
import { BusinessPromoModule } from './modules/businessPromo/businessPromo.module';
import { BusinessLeadModule } from './modules/businessLead/businessLead.module';
import { BusinessLeadBatchByBusinessIdLoader } from './modules/businessLead/businessLead.batchByBusinessId.loader';
import { BusinessPromoMenuItemSingleByIdLoader } from './modules/businessPromo/businessPromoMenuItem.singleById.loader';
import { OrganizationCustomerFeedbackModule } from './modules/organizationCustomerFeedback/organizationCustomerFeedback.module';
import { BusinessOutletModule } from './modules/businessOutlet/businessOutlet.module';
import { OrganizationLoyaltyMessageModule } from './modules/organizationLoyaltyMessage/organizationLoyaltyMessage.module';
import { UploadModule } from './modules/upload/upload.module';
import { graphqlUploadExpress } from 'graphql-upload';
import { DateTimeScalar } from './commons/scalars/dateTime.scalar';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from './commons/loader';
import { OrganizationSingleByIdLoader } from './modules/organization/organization.singleById.loader';
import { BusinessSingleByIdLoader } from './modules/business/business.singleById.loader';
import { BusinessModule } from './modules/business/business.module';
import { BusinessPaymentTypeModule } from './modules/businessPaymentType/businessPaymentType.module';
import { BusinessSalesChannelCategoryModule } from './modules/businessSalesChannelCategory/businessSalesChannelCategory.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { OrganizationUserSingleByIdLoader } from './modules/user/user.singleById.loader';
import { BusinessMenuModifierModule } from './modules/businessMenuModifier/businessMenuModifier.module';
import { BusinessMenuItemModifierItemBatchByMenuModifierIdLoader } from './modules/businessMenuModifier/businessMenuItemModifier.batchByMenuModifierId.loader';
import { BusinessSalesChannelModule } from './modules/businessSalesChannel/businessSalesChannel.module';
import { BusinessSalesChannelSingleByIdLoader } from './modules/businessSalesChannel/businessSalesChannel.singleById.loader';
import { BusinessMenuItemModule } from './modules/businessMenuItem/businessMenuItem.module';
import { BusinessSalesChannelCategorySingleByIdLoader } from './modules/businessSalesChannelCategory/businessSalesChannelCategory.singleById.loader';
import { BusinessMenuItemBatchByMenuCategoryIdLoader } from './modules/businessMenuItem/businessMenuItem.batchByMenuCategoryId.loader';
import { BusinessMenuItemSingleByIdLoader } from './modules/businessMenuItem/businessMenuItem.singleById.loader';
import { BusinessMenuItemModifierBatchByMenuItemIdLoader } from './modules/businessMenuItem/businessMenuItemModifier.batchByMenuItemId.loader';
import { BusinessSalesChannelMenuItemBatchByMenuItemIdLoader } from './modules/businessMenuItem/businessSalesChannelMenuItem.batchByMenuItemId.loader';
import { BusinessMenuCategorySingleByIdLoader } from './modules/businessMenuCategory/businessMenuCategory.singleById.loader';
import { BusinessMenuModifierSingleByIdLoader } from './modules/businessMenuModifier/businessMenuModifier.singleById.loader';
import { BusinessSalesChannelPaymentTypeBatchByBusinessSalesChannelIdLoader } from './modules/businessSalesChannel/businessSalesChannelPaymentType.batchBySalesChannelId.loader';
import { BusinessPaymentTypeSingleByIdLoader } from './modules/businessPaymentType/businessPaymentType.singleById.loader';
import { BusinessSyncModule } from './modules/businessSync/businessSync.module';
import { BusinessSalesChannelMenuItemBatchByBusinessSalesChannelIdLoader } from './modules/businessMenuItem/businessSalesChannelMenuItem.batchByBusinessSalesChannelId.loader';
import { BusinessSalesChannelMenuCategoryBatchByBusinessSalesChannelIdLoader } from './modules/businessMenuCategory/BusinessSalesChannelMenuCategory.batchByBusinessSalesChannelId.loader';
import { BusinessSalesChannelMenuCategoryBatchTotalActiveChannelByMenuCategoryId } from './modules/businessMenuCategory/businessSalesChannelMenuCategory.batchTotalActiveChannelByMenuCategoryId';
import { BusinessSalesChannelPaymentTypeBatchByPaymentTypeIdLoader } from './modules/businessSalesChannel/businessSalesChannelPaymentType.batchByPaymentId.loader';
import { BusinessSalesChannelMenuCategoryItemBatchByBusinessMenuCategoryIdLoader } from './modules/businessMenuCategory/businessSalesChannelMenuCategory.batchByBusinessMenuCategoryId.loader';
import { SalesOrderModule } from './modules/salesOrder/salesOrder.module';
import { XBusinessOutletKioskSingleByBusinessOutletIdLoader } from './modules/businessOutlet/xBusinessOutletKiosk.singleBybusinessOutletId.loader';
import { SalesOrderBusinessMenuItemBatchBySalesOrderIdLoader } from './modules/salesOrder/salesOrderBusinessMenuItem.batchBySalesOrderId.loader';
import { SalesOrderBusinessMenuModifierItemBatchBySalesOrderBusinessMenuItemIdLoader } from './modules/salesOrder/salesOrderBusinessMenuModifierItem.batchBySalesOrderBusinessMenuItemId.loader';
import { BusinessSalesChannelMenuItemBatchTotalActiveChannelByMenuItemIdLoader } from './modules/businessMenuItem/businessSalesChannelMenuCategory.batchTotalActiveChannelByMenuItemId';
import { LoggingInterceptor } from './commons/Interceptors/logging.interceptor';
import { BusinessOutletSingleByIdLoader } from './modules/businessOutlet/businessOutlet.singleById.loader';
import { OrganizationUserBusinessOutletBatchByBusinessOutletIdLoader } from './modules/user/organizationUserBusinessOutlet.batchByBusinessOutletId.loader';
import { OrganizationUserBusinessOutletBatchByOrganizationUserIdLoader } from './modules/user/organizationUserBusinessOutlet.batchByOrganizationUserId.loader';
import { XOrganizationUserWahyooUserSingleByOrganizationUserIdLoader } from './modules/user/xOrganizationUserWahyooUser.singleByOrganizationUserId.loader';
import { UserNotificationModule } from './modules/userNotification/userNotification.module';
import { BusinessOutletLeadModule } from './modules/businessOutletLead/businessOutletLead.module';
import { BusinessOutletLeadSingleByIdLoader } from './modules/businessOutletLead/businessOutletLead.singleById.loader';
import { ProvinceModule } from './modules/region/province.module';
import { ProvinceSingleByIdLoader } from './modules/region/province.singleById.loader';
import { CitySingleByIdLoader } from './modules/region/city.singleById.loader';
import { DistrictSingleByIdLoader } from './modules/region/district.singleById.loader';
import { VillageSingleByIdLoader } from './modules/region/village.singleById.loader';
import { CityModule } from './modules/region/city.module';
import { DistrictModule } from './modules/region/district.module';
import { VillageModule } from './modules/region/village.module';
import { BusinessMerchantOrderModule } from './modules/businessMerchantOrder/businessMerchantOrder.module';
import { BusinessMerchantOrderSingleByIdLoader } from './modules/businessMerchantOrder/businessMerchantOrder.singleById.loader';
import { BusinessMerchantOrderItemBatchByBusinessMerchantOrderIdLoader } from './modules/businessMerchantOrder/businessMerchantOrderItem.batchByBusinessMerchantOrderId.loader';
import { BusinessMerchantOrderPaymentSingleByBusinessMerchantOrderIdLoader } from './modules/businessMerchantOrder/businessMerchantOrderPayment.singleByBusinessMerchantOrderId.loader';
import { BusinessMerchantProductSingleByIdLoader } from './modules/businessMerchantOrder/businessMerchantProduct.singleById.loader';
import { BusinessMerchantProductBatchByBusinessIdLoader } from './modules/businessMerchantOrder/businessMerchantProduct.batchByBusinessId.loader';
import { XXenditPaymentSingleByBusinessMerchantOrderPaymentIdLoader } from './modules/businessMerchantOrder/xXenditPayment.singleByBusinessMerchantOrderPaymentId.loader';
import { BusinessMerchantOrderBatchByBusinessOutletLeadIdLoader } from './modules/businessMerchantOrder/businessMerchantOrder.batchByBusinessOutletLeadId.loader';
import { BusinessPropertyModule } from './modules/businessProperty/businessProperty.module';
import { BusinessPropertySingleByBusinessIdLoader } from './modules/businessProperty/businessProperty.singleByBusinessId.loader';
import { BusinessOutletMediaBatchByBusinessOutletLeadIdLoader } from './modules/businessOutletLead/businessOutletLeadMedia.batchByBusinessOutletLeadId.loader';
import { RestModule } from './modules/rest/rest.module';
import { BusinessOutletPropertyModule } from './modules/businessOutletProperty/businessOutletProperty.module';
import { HubsterModule } from './modules/hubster/hubster.module';
import { KlikitModule } from './modules/klikit/klikit.module';
import { XKlikitItemBatchByBusinessMenuItemIdLoader } from './modules/klikit/xKlikitItem.batchByBusinessMenuItemId.loader';
import { XHubsterStoreSingleByBusinessOutletIdLoader } from './modules/hubster/xHubsterStore.singleByBusinessOutletId.loader';
import { XHubsterItemBatchByBusinessMenuItemIdLoader } from './modules/hubster/xHubsterItem.batchByBusinessMenuItemId.loader';
import { XHubsterStoreBatchByBusinessOutletIdLoader } from './modules/hubster/xHubsterStore.batchByBusinessOutletId.loader';
import { DailyFinanceReportModule } from './modules/dailyFinanceReport/dailyFinanceReport.module';
import { XWahyooPaymentAdjustmentRequestDetailSingleByOrganizationUserDailyFinanceReportIdLoader } from './modules/dailyFinanceReport/xWahyooPaymentAdjustmentRequestDetail.singleByOrganizationUserDailyFinanceReportId.loader';
import { OrganizationUserDailyFeeReportSingleByOrganizationUserDailyFinanceReportLoader } from './modules/dailyFinanceReport/organizationUserDailyFeeReport.singleByOrganizationUserDailyFinanceReport.loader';
import { XWahyooPaymentAdjustmentRequestDetailSingleByOrganizationUserDailyFeeReportIdLoader } from './modules/dailyFinanceReport/xWahyooPaymentAdjustmentRequestDetail.singleByOrganizationUserDailyFeeReportId.loader';
import { BusinessOutletPropertyBatchByDailyTransferOrganizationUserILoader } from './modules/businessOutletProperty/businessOutletProperty.batchByDailyTransferOrganizationUserId.loader';
import { BusinessOutletQualityControlModule } from './modules/businessOutletQualityControl/businessOutletQualityControl.module';
import { BusinessOutletMediaBatchByBusinessOutletIdLoader } from './modules/businessOutlet/businessOutletMedia.batchByBusinessOutletId.loader';
import { BusinessOutletPropertySingleByOutletIdLoader } from './modules/businessOutletProperty/businessOutletProperty.singleByOutletId';
import { BusinessOutletLeadSingleByBusinessOutletIdLoader } from './modules/businessOutletLead/businessOutletLead.singleByBusinessOutletId.loader';
import { AppVersionModule } from './modules/appVersion/appVersion.module';
import { XMenuItemModule } from './modules/xMenuItem/xMenuItem.module';
import { AppVersionSingleByIdLoader } from './modules/appVersion/appVersion.singleByid.loader';

@Module({
  imports: [
    LoggerModule.forRoot(config.loggerConfig),
    GraphQLModule.forRoot({
      debug: false,
      playground: process.env.NODE_ENV === 'production' ? false : true,
      autoSchemaFile: true,
      uploads: false
    }),

    // SYSTEM MODULE

    NotificationModule.forRoot(config.notificationSvc),
    GCloudStorageModule.forRoot(config.gCloudStorage),
    DatabaseModule.forRoot(config.databasePrimary),
    RabbitMQModule.forRoot(config.rabbitMQConfig),
    DocusignModule.forRoot(config.docusignConfig),
    HubsterPosModule.forRoot(config.hubsterPosConfig),
    MessagingModule.forRoot(config.messaging),
    EmailModule.forRoot(config.emailConfig),

    // USE CASE MODULE
    AuthModule,
    UploadModule,
    OrganizationModule,
    OrganizationCustomerFeedbackModule,
    OrganizationLoyaltyMessageModule,
    BusinessOutletModule,
    BusinessOutletPropertyModule,
    UserNotificationModule,
    UserModule,
    BusinessMenuCategoryModule,
    BusinessPromoModule,
    BusinessLeadModule,
    BusinessModule,
    BusinessSyncModule,
    BusinessPaymentTypeModule,
    BusinessSalesChannelModule,
    BusinessSalesChannelCategoryModule,
    BusinessMenuModifierModule,
    BusinessMenuItemModule,
    UserModule,
    SalesOrderModule,
    ProvinceModule,
    CityModule,
    DistrictModule,
    VillageModule,
    BusinessOutletLeadModule,
    BusinessMerchantOrderModule,
    BusinessPropertyModule,
    RestModule,
    HubsterModule,
    KlikitModule,
    BusinessOutletQualityControlModule,
    DailyFinanceReportModule,
    XMenuItemModule,
    AppVersionModule
  ],
  providers: [
    DateTimeScalar,
    // APP_INTERCEPTOR for loaders
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor
    },
    // APP_INTERCEPTOR for Logging
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    },
    // LOADERS
    // Include loader from OrganizationModule
    OrganizationSingleByIdLoader,
    OrganizationUserSingleByIdLoader,
    OrganizationUserBusinessOutletBatchByBusinessOutletIdLoader,
    OrganizationUserBusinessOutletBatchByOrganizationUserIdLoader,
    BusinessSingleByIdLoader,
    BusinessOutletPropertySingleByOutletIdLoader,
    XBusinessOutletKioskSingleByBusinessOutletIdLoader,
    XOrganizationUserWahyooUserSingleByOrganizationUserIdLoader,
    BusinessMenuItemModifierItemBatchByMenuModifierIdLoader,
    BusinessSalesChannelSingleByIdLoader,
    BusinessSalesChannelCategorySingleByIdLoader,
    BusinessMenuItemBatchByMenuCategoryIdLoader,
    BusinessMenuItemSingleByIdLoader,
    BusinessMenuItemModifierBatchByMenuItemIdLoader,
    BusinessOutletSingleByIdLoader,
    BusinessOutletMediaBatchByBusinessOutletIdLoader,
    BusinessPromoMenuItemSingleByIdLoader,
    BusinessSalesChannelMenuItemBatchByMenuItemIdLoader,
    BusinessSalesChannelMenuItemBatchByBusinessSalesChannelIdLoader,
    BusinessSalesChannelMenuCategoryBatchByBusinessSalesChannelIdLoader,
    SalesOrderBusinessMenuItemBatchBySalesOrderIdLoader,
    SalesOrderBusinessMenuModifierItemBatchBySalesOrderBusinessMenuItemIdLoader,
    BusinessMenuCategorySingleByIdLoader,
    BusinessMenuModifierSingleByIdLoader,
    BusinessSalesChannelPaymentTypeBatchByBusinessSalesChannelIdLoader,
    BusinessPaymentTypeSingleByIdLoader,
    BusinessSalesChannelPaymentTypeBatchByPaymentTypeIdLoader,
    BusinessSalesChannelMenuItemBatchTotalActiveChannelByMenuItemIdLoader,
    BusinessSalesChannelMenuCategoryItemBatchByBusinessMenuCategoryIdLoader,
    BusinessSalesChannelMenuCategoryBatchTotalActiveChannelByMenuCategoryId,
    OrganizationUserSingleByIdLoader,
    ProvinceSingleByIdLoader,
    CitySingleByIdLoader,
    DistrictSingleByIdLoader,
    VillageSingleByIdLoader,
    BusinessOutletLeadSingleByIdLoader,
    BusinessMerchantOrderSingleByIdLoader,
    BusinessMerchantOrderBatchByBusinessOutletLeadIdLoader,
    BusinessMerchantOrderItemBatchByBusinessMerchantOrderIdLoader,
    BusinessMerchantOrderPaymentSingleByBusinessMerchantOrderIdLoader,
    BusinessMerchantProductSingleByIdLoader,
    BusinessMerchantProductBatchByBusinessIdLoader,
    XXenditPaymentSingleByBusinessMerchantOrderPaymentIdLoader,
    BusinessPropertySingleByBusinessIdLoader,
    BusinessOutletMediaBatchByBusinessOutletLeadIdLoader,
    BusinessOutletLeadSingleByBusinessOutletIdLoader,
    XHubsterStoreBatchByBusinessOutletIdLoader,
    XHubsterStoreSingleByBusinessOutletIdLoader,
    XHubsterItemBatchByBusinessMenuItemIdLoader,
    XKlikitItemBatchByBusinessMenuItemIdLoader,
    OrganizationUserDailyFeeReportSingleByOrganizationUserDailyFinanceReportLoader,
    XWahyooPaymentAdjustmentRequestDetailSingleByOrganizationUserDailyFeeReportIdLoader,
    XWahyooPaymentAdjustmentRequestDetailSingleByOrganizationUserDailyFinanceReportIdLoader,
    BusinessOutletPropertyBatchByDailyTransferOrganizationUserILoader,
    BusinessLeadBatchByBusinessIdLoader,
    AppVersionSingleByIdLoader
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress()).forRoutes('graphql');
  }
}
