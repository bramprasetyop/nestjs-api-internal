import { forwardRef, HttpModule, Module } from '@nestjs/common';
import {
  InjectionKey,
  BusinessModel,
  BusinessOutletLeadModel,
  BusinessOutletLeadLogModel,
  BusinessOutletLeadMediaModel,
  OrganizationBlacklistedUserModel,
  BusinessPropertyModel,
  BusinessMerchantOrderModel,
  BusinessMerchantOrderStatusLogModel,
  BusinessMerchantOrderItemModel,
  BusinessMerchantProductModel,
  CommonModule,
  CityModel,
  DistrictModel,
  VillageModel
} from '@wahyoo/wahyoo-shared';
import { BusinessRepository } from '../business/repositories/business.repository';
import { BusinessOutletLeadResolver } from './businessOutletLead.resolver';
import { BusinessOutletLeadSingleByIdLoader } from './businessOutletLead.singleById.loader';
import { BusinessOutletLeadLogResolver } from './businessOutletLeadLog.resolver';
import { BusinessOutletLeadRepository } from './repositories/businessOutletLead.repository';
import { OrganizationBlacklistedUserRepository } from './repositories/organizationBlacklistedUser.repository';
import { BusinessOutletLeadLogRepository } from './repositories/businessOutletLeadLog.repository';
import { BusinessOutletLeadApprovalLocationUseCase } from './useCases/businessOutletLead.approvalLocation.usecase';
import { BusinessOutletLeadGetByIdUseCase } from './useCases/businessOutletLead.getById.usecase';
import { BusinessOutletLeadGetListUseCase } from './useCases/businessOutletLead.getList.usecase';
import { MyBusinessOutletLeadListUseCase } from './useCases/businessOutletLead.myBusinessOutlet.usecase';
import { BusinessOutletLeadLogGetListUseCase } from './useCases/businessOutletLeadLog.getList.usecase';
import { BusinessOutletLeadInterviewUseCase } from './useCases/businessOutletLead.interview.usecase';
import { BusinessOutletLeadSurveyUseCase } from './useCases/businessOutletLead.survey.usecase';
import { BusinessOutletLeadMapLocationUseCase } from './useCases/businessOutletLead.mapLocation.usecase';
import { BusinessOutletLeadRegisterUsecase } from './useCases/businessOutletLead.register.usecase';
import { BusinessOutletLeadTrainingUseCase } from './useCases/businessOutletLead.training.usecase';
import { BusinessOutletLeadValidateCoordinateUseCase } from './useCases/businessOutletLead.validateCoordinate.usecase';
import { BusinessOutletModule } from '../businessOutlet/businessOutlet.module';
import { BusinessPropertyRepository } from '../businessProperty/repositories/businessProperty.repository';
import { BusinessOutletMediaBatchByBusinessOutletLeadIdLoader } from './businessOutletLeadMedia.batchByBusinessOutletLeadId.loader';
import { BusinessOutletLeadMediaRepository } from './repositories/businessOutletLeadMedia.repository';
import { BusinessOutletLeadUpdateUseCase } from './useCases/businessOutletLead.update.useCase';
import { BusinessOutletLeadSingleByBusinessOutletIdLoader } from './businessOutletLead.singleByBusinessOutletId.loader';
import { BusinessOutletLeadCalculateLocationIntersectionUseCase } from './useCases/businessOutletLead.calculateLocationIntersection.usecase';
import { InternalAPIService } from '../external/internalAPI.service';
import { JWTService } from '../external/jwt.service';
import { BusinessOutletLeadGenerateNameUseCase } from './useCases/businessOutletLead.generateName.usecase';
import { VillageRepository } from '../region/repositories/village.repository';

@Module({
  imports: [forwardRef(() => BusinessOutletModule), CommonModule, HttpModule],
  providers: [
    InternalAPIService,
    JWTService,
    BusinessRepository,
    BusinessOutletLeadResolver,
    BusinessOutletLeadLogResolver,
    MyBusinessOutletLeadListUseCase,
    BusinessOutletLeadGetListUseCase,
    BusinessOutletLeadGetByIdUseCase,
    BusinessOutletLeadLogGetListUseCase,
    BusinessOutletLeadApprovalLocationUseCase,
    BusinessOutletLeadTrainingUseCase,
    BusinessOutletLeadInterviewUseCase,
    BusinessOutletLeadSurveyUseCase,
    BusinessOutletLeadMapLocationUseCase,
    BusinessOutletLeadRegisterUsecase,
    BusinessOutletLeadUpdateUseCase,
    BusinessOutletLeadValidateCoordinateUseCase,
    BusinessOutletLeadCalculateLocationIntersectionUseCase,
    BusinessOutletLeadRepository,
    BusinessOutletLeadLogRepository,
    BusinessPropertyRepository,
    OrganizationBlacklistedUserRepository,
    BusinessOutletLeadMediaRepository,
    BusinessOutletLeadSingleByIdLoader,
    BusinessOutletMediaBatchByBusinessOutletLeadIdLoader,
    BusinessOutletLeadGenerateNameUseCase,
    BusinessOutletLeadSingleByBusinessOutletIdLoader,
    VillageRepository,
    {
      provide: InjectionKey.BUSINESS_MODEL,
      useValue: BusinessModel
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
      provide: InjectionKey.BUSINESS_OUTLET_LEAD_MEDIA_MODEL,
      useValue: BusinessOutletLeadMediaModel
    },
    {
      provide: InjectionKey.BUSINESS_PROPERTY_MODEL,
      useValue: BusinessPropertyModel
    },
    {
      provide: InjectionKey.ORGANIZATION_BLACKLISTED_USER_MODEL,
      useValue: OrganizationBlacklistedUserModel
    },
    {
      provide: InjectionKey.BUSINESS_MERCHANT_ORDER_MODEL,
      useValue: BusinessMerchantOrderModel
    },
    {
      provide: InjectionKey.BUSINESS_MERCHANT_ORDER_STATUS_LOG_MODEL,
      useValue: BusinessMerchantOrderStatusLogModel
    },
    {
      provide: InjectionKey.BUSINESS_MERCHANT_ORDER_ITEM_MODEL,
      useValue: BusinessMerchantOrderItemModel
    },
    {
      provide: InjectionKey.BUSINESS_MERCHANT_PRODUCT_MODEL,
      useValue: BusinessMerchantProductModel
    },
    {
      provide: InjectionKey.CITY_MODEL,
      useValue: CityModel
    },
    {
      provide: InjectionKey.DISTRICT_MODEL,
      useValue: DistrictModel
    },
    {
      provide: InjectionKey.VILLAGE_MODEL,
      useValue: VillageModel
    }
  ],
  exports: [
    BusinessOutletLeadSingleByIdLoader,
    BusinessOutletLeadRepository,
    BusinessOutletMediaBatchByBusinessOutletLeadIdLoader,
    BusinessOutletLeadSingleByBusinessOutletIdLoader,
    BusinessOutletLeadMediaRepository
  ]
})
export class BusinessOutletLeadModule {}
