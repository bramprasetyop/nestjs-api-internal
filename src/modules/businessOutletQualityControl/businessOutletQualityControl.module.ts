import { Module } from '@nestjs/common';
import {
  BusinessOutletQualityControlLogModel,
  BusinessOutletQualityControlModel,
  InjectionKey
} from '@wahyoo/wahyoo-shared';
import { BusinessOutletModule } from '../businessOutlet/businessOutlet.module';
import { UserModule } from '../user/user.module';
import { BusinessOutletQualityControlResolver } from './businessOutletQualityControl.resolver';
import { BusinessOutletQualityControlRepository } from './repositories/businessOutletQualityControl.repository';
import { BusinessOutletQualityControlGetByIdUseCase } from './useCases/businessOutletQualityControl.getById.usecase';
import { BusinessOutletQualityControlGetListUseCase } from './useCases/businessOutletQualityControl.getList.usecase';
import { BusinessOutletQualityControlGetSummaryUseCase } from './useCases/businessOutletQualityControl.getSummary.usecase';
import { BusinessOutletQualityControlMarksAsReviewedUseCase } from './useCases/businessOutletQualityControl.markAsReviewed.usecase';
import { BusinessOutletQualityControlSubmitUseCase } from './useCases/businessOutletQualityControl.submit.usecase';
import { MyBusinessOutletQualityControlGetListUseCase } from './useCases/myBusinessOutletQualityControl.getList.usecase';

@Module({
  imports: [BusinessOutletModule, UserModule],
  providers: [
    BusinessOutletQualityControlResolver,
    BusinessOutletQualityControlGetByIdUseCase,
    BusinessOutletQualityControlGetListUseCase,
    BusinessOutletQualityControlGetSummaryUseCase,
    BusinessOutletQualityControlMarksAsReviewedUseCase,
    BusinessOutletQualityControlSubmitUseCase,
    MyBusinessOutletQualityControlGetListUseCase,
    BusinessOutletQualityControlRepository,
    {
      provide: InjectionKey.BUSINESS_OUTLET_QUALITY_CONTROL_MODEL,
      useValue: BusinessOutletQualityControlModel
    },
    {
      provide: InjectionKey.BUSINESS_OUTLET_QUALITY_CONTROL_LOG_MODEL,
      useValue: BusinessOutletQualityControlLogModel
    }
  ],
  exports: [BusinessOutletQualityControlRepository]
})
export class BusinessOutletQualityControlModule {}
