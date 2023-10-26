import { Module } from '@nestjs/common';
import {
  BusinessModel,
  BusinessInformationCategoriesModel,
  BusinessLeadModel,
  BusinessLeadLogModel,
  InjectionKey
} from '@wahyoo/wahyoo-shared';
import { BusinessLeadResolver } from './businessLead.resolver';
import { BusinessLeadRepository } from './repositories/businessLead.repository';
import { BusinessLeadCreateUseCase } from './useCases/businessLead.create.usecase';
import { BusinessLeadGetByIdUseCase } from './useCases/businessLead.getById.usecase';
import { BusinessLeadGetListUseCase } from './useCases/businessLead.getList.usecase';
import { BusinessLeadUpdateAsDraftUseCase } from './useCases/businessLead.updateAsDraft.usecase';
import { BusinessLeadUpdateAsPublishedUseCase } from './useCases/businessLead.updateAsPublished.usecase';
import { BusinessLeadClosedUseCase } from './useCases/businessLead.closed.usecase';
import { BusinessLeadBatchByBusinessIdLoader } from './businessLead.batchByBusinessId.loader';
import { BusinessModule } from '../business/business.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [BusinessModule, UserModule],
  providers: [
    BusinessLeadResolver,
    BusinessLeadCreateUseCase,
    BusinessLeadGetByIdUseCase,
    BusinessLeadGetListUseCase,
    BusinessLeadUpdateAsDraftUseCase,
    BusinessLeadUpdateAsPublishedUseCase,
    BusinessLeadClosedUseCase,
    BusinessLeadRepository,
    BusinessLeadBatchByBusinessIdLoader,
    {
      provide: InjectionKey.BUSINESS_MODEL,
      useValue: BusinessModel
    },
    {
      provide: InjectionKey.BUSINESS_INFORMATION_CATEGORIES_MODEL,
      useValue: BusinessInformationCategoriesModel
    },
    {
      provide: InjectionKey.BUSINESS_LEAD_MODEL,
      useValue: BusinessLeadModel
    },
    {
      provide: InjectionKey.BUSINESS_LEAD_LOG_MODEL,
      useValue: BusinessLeadLogModel
    }
  ],
  exports: [BusinessLeadRepository]
})
export class BusinessLeadModule {}
