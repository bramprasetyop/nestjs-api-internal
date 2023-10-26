import { forwardRef, HttpModule, Module } from '@nestjs/common';
import {
  BusinessOutletModel,
  BusinessOutletPropertyModel,
  CommonModule,
  InjectionKey
} from '@wahyoo/wahyoo-shared';
import { BusinessOutletModule } from '../businessOutlet/businessOutlet.module';
import { BusinessOutletPropertyBatchByDailyTransferOrganizationUserILoader } from './businessOutletProperty.batchByDailyTransferOrganizationUserId.loader';
import { BusinessOutletPropertyResolver } from './businessOutletProperty.resolver';
import { BusinessOutletPropertySingleByOutletIdLoader } from './businessOutletProperty.singleByOutletId';
import { BusinessOutletPropertyRepository } from './respositories/businessOutletProperty.repository';
import { BusinessOutletPropertyCreateUseCase } from './useCases/businessOutletProperty.create.usecase';
import { BusinessOutletPropertyGetByBusinessOutletIdUseCase } from './useCases/businessOutletProperty.getByBusinessOutletId.usecase';

@Module({
  imports: [forwardRef(() => BusinessOutletModule), CommonModule],
  providers: [
    BusinessOutletPropertyResolver,
    BusinessOutletPropertyGetByBusinessOutletIdUseCase,
    BusinessOutletPropertyCreateUseCase,
    BusinessOutletPropertyRepository,
    BusinessOutletPropertyBatchByDailyTransferOrganizationUserILoader,
    BusinessOutletPropertySingleByOutletIdLoader,
    {
      provide: InjectionKey.BUSINESS_OUTLET_PROPERTY_MODEL,
      useValue: BusinessOutletPropertyModel
    },
    {
      provide: InjectionKey.BUSINESS_OUTLET_MODEL,
      useValue: BusinessOutletModel
    }
  ],
  exports: [
    BusinessOutletPropertyRepository,
    BusinessOutletPropertyBatchByDailyTransferOrganizationUserILoader,
    BusinessOutletPropertySingleByOutletIdLoader
  ]
})
export class BusinessOutletPropertyModule {}
