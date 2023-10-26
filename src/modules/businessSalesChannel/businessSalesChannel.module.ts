import { Module } from '@nestjs/common';
import {
  BusinessSalesChannelModel,
  BusinessSalesChannelPaymentTypeModel,
  InjectionKey
} from '@wahyoo/wahyoo-shared';
import { BusinessSalesChannelResolver } from './businessSalesChannel.resolver';
import { BusinessSalesChannelSingleByIdLoader } from './businessSalesChannel.singleById.loader';
import { BusinessSalesChannelRepository } from './repositories/businessSalesChannel.repository';
import { BusinessSalesChannelCreateUseCase } from './useCases/businessSalesChannel.create.usecase';
import { BusinessSalesChannelGetByIdUseCase } from './useCases/businessSalesChannel.getById.usecase';
import { BusinessSalesChannelGetListUseCase } from './useCases/businessSalesChannel.getList.usecase';
import { BusinessSalesChannelUpdateUseCase } from './useCases/businessSalesChannel.update.usecase';
import { BusinessSalesChannelDeleteUseCase } from './useCases/businessSalesChannel.delete.usecase';
import { BusinessModule } from '../business/business.module';
import { OrganizationModule } from '../organization/organization.module';
import { BusinessSalesChannelCategoryModule } from '../businessSalesChannelCategory/businessSalesChannelCategory.module';
import { BusinessSalesChannelPaymentTypeBatchByBusinessSalesChannelIdLoader } from './businessSalesChannelPaymentType.batchBySalesChannelId.loader';
import { BusinessPaymentTypeModule } from '../businessPaymentType/businessPaymentType.module';
import { BusinessSalesChannelPaymentTypeResolver } from './businessSalesChannelPaymentType.resolver';
import { BusinessSalesChannelMenuItemResolver } from './businessSalesChannelMenuItem.resolver';
import { BusinessSalesChannelPaymentTypeBatchByPaymentTypeIdLoader } from './businessSalesChannelPaymentType.batchByPaymentId.loader';
import { BusinessSalesChannelPaymentTypeRepository } from './repositories/businessSalesChannelPaymentType.repository';

@Module({
  imports: [
    BusinessSalesChannelCategoryModule,
    BusinessModule,
    OrganizationModule,
    BusinessPaymentTypeModule
  ],
  providers: [
    BusinessSalesChannelResolver,
    BusinessSalesChannelPaymentTypeResolver,
    BusinessSalesChannelMenuItemResolver,
    BusinessSalesChannelCreateUseCase,
    BusinessSalesChannelGetByIdUseCase,
    BusinessSalesChannelGetListUseCase,
    BusinessSalesChannelUpdateUseCase,
    BusinessSalesChannelDeleteUseCase,
    BusinessSalesChannelRepository,
    BusinessSalesChannelPaymentTypeRepository,
    BusinessSalesChannelSingleByIdLoader,
    BusinessSalesChannelPaymentTypeBatchByBusinessSalesChannelIdLoader,
    BusinessSalesChannelPaymentTypeBatchByPaymentTypeIdLoader,

    {
      provide: InjectionKey.BUSINESS_SALES_CHANNEL_MODEL,
      useValue: BusinessSalesChannelModel
    },
    {
      provide: InjectionKey.BUSINESS_SALES_CHANNEL_PAYMENT_TYPE_MODEL,
      useValue: BusinessSalesChannelPaymentTypeModel
    }
  ],
  exports: [
    BusinessSalesChannelRepository,
    BusinessSalesChannelPaymentTypeRepository,
    BusinessSalesChannelSingleByIdLoader,
    BusinessSalesChannelPaymentTypeBatchByBusinessSalesChannelIdLoader,
    BusinessSalesChannelPaymentTypeBatchByPaymentTypeIdLoader
  ]
})
export class BusinessSalesChannelModule {}
