import { forwardRef, HttpModule, Module } from '@nestjs/common';
import {
  InjectionKey,
  BusinessOutletModel,
  XBusinessOutletKioskModel,
  XHubsterStoreModel,
  BusinessOutletMediaModel,
  BusinessOutletPropertyModel,
  BusinessOutletLeadModel
} from '@wahyoo/wahyoo-shared';
import { BusinessModule } from '../business/business.module';
import { InternalAPIService } from '../external/internalAPI.service';
import { JWTService } from '../external/jwt.service';
import { UserModule } from '../user/user.module';
import { HubsterModule } from '../hubster/hubster.module';
import { BusinessOutletResolver } from './businessOutlet.resolver';
import { BusinessOutletSingleByIdLoader } from './businessOutlet.singleById.loader';
import { BusinessOutletRepository } from './repositories/businessOutlet.repository';
import { XBusinessOutletKioskRepository } from './repositories/xBusinessOutletKiosk.repository';
import { BusinessOutletCreateUseCase } from './useCases/businessOutlet.create.usecase';
import { BusinessOutletDeleteUseCase } from './useCases/businessOutlet.delete.usecase';
import { BusinessOutletGetByIdUseCase } from './useCases/businessOutlet.getById.usercase';
import { BusinessOutletGetListUseCase } from './useCases/businessOutlet.getList.usercase';
import { BusinessOutletGetNearestListUseCase } from './useCases/businessOutlet.getNearestList.usercase';
import { BusinessOutletCheckInUseCase } from './useCases/businessOutlet.checkIn.usecase';
import { BusinessOutletUpdateUseCase } from './useCases/businessOutlet.update.usecase';
import { KioskGetListUseCase } from './useCases/kiosk.getList';
import { MyBusinessOutletListUseCase } from './useCases/businessOutlet.myBusinessOutletList.usercase';
import { XBusinessOutletKioskSingleByBusinessOutletIdLoader } from './xBusinessOutletKiosk.singleBybusinessOutletId.loader';
import { BusinessOutletMediaBatchByBusinessOutletIdLoader } from './businessOutletMedia.batchByBusinessOutletId.loader';
import { BusinessOutletMediaRepository } from './repositories/businessOutletMedia.repository';
import { BusinessOutletAndPropertyUpdateUseCase } from './useCases/businessOutlet.outletAndPropertyUpdate.usecase';
import { BusinessOutletPropertyModule } from '../businessOutletProperty/businessOutletProperty.module';
import { BusinessOutletLeadModule } from '../businessOutletLead/businessOutletLead.module';

@Module({
  imports: [
    HttpModule,
    BusinessModule,
    forwardRef(() => BusinessOutletPropertyModule),
    forwardRef(() => UserModule),
    forwardRef(() => BusinessOutletLeadModule),
    HubsterModule
  ],
  providers: [
    BusinessOutletResolver,
    BusinessOutletGetNearestListUseCase,
    BusinessOutletCheckInUseCase,
    BusinessOutletGetByIdUseCase,
    BusinessOutletGetListUseCase,
    BusinessOutletCreateUseCase,
    BusinessOutletUpdateUseCase,
    BusinessOutletAndPropertyUpdateUseCase,
    BusinessOutletDeleteUseCase,
    KioskGetListUseCase,
    MyBusinessOutletListUseCase,
    BusinessOutletRepository,
    BusinessOutletMediaRepository,
    XBusinessOutletKioskRepository,
    InternalAPIService,
    JWTService,
    XBusinessOutletKioskSingleByBusinessOutletIdLoader,
    BusinessOutletMediaBatchByBusinessOutletIdLoader,
    BusinessOutletSingleByIdLoader,
    {
      provide: InjectionKey.BUSINESS_OUTLET_PROPERTY_MODEL,
      useValue: BusinessOutletPropertyModel
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
      provide: InjectionKey.BUSINESS_OUTLET_MEDIA_MODEL,
      useValue: BusinessOutletMediaModel
    },
    {
      provide: InjectionKey.X_BUSINESS_OUTLET_KIOSK_MODEL,
      useValue: XBusinessOutletKioskModel
    },
    {
      provide: InjectionKey.X_HUBSTER_STORE_MODEL,
      useValue: XHubsterStoreModel
    }
  ],
  exports: [
    BusinessOutletRepository,
    XBusinessOutletKioskRepository,
    BusinessOutletMediaRepository,
    XBusinessOutletKioskSingleByBusinessOutletIdLoader,
    BusinessOutletMediaBatchByBusinessOutletIdLoader,
    BusinessOutletSingleByIdLoader
  ]
})
export class BusinessOutletModule {}
