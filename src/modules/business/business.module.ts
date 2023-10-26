import { Module } from '@nestjs/common';
import { BusinessResolver } from './business.resolver';
import { OrganizationModule } from '../organization/organization.module';
import { BusinessRepository } from './repositories/business.repository';
import { BusinessUpdateUseCase } from './useCases/business.update.usecase';
import { BusinessDeleteUseCase } from './useCases/business.delete.usecase';
import { BusinessCreateUseCase } from './useCases/business.create.usecase';
import { BusinessGetByIdUseCase } from './useCases/business.getById.usecase';
import { BusinessGetListUseCase } from './useCases/business.getList.usecase';
import { BusinessSingleByIdLoader } from './business.singleById.loader';
import { BusinessModel, InjectionKey } from '@wahyoo/wahyoo-shared';
import { BusinessGetListPublicUseCase } from './useCases/business.getList.public.usecase';
import { BusinessGetByIdPublicUseCase } from './useCases/business.getById.public.usecase';

@Module({
  imports: [OrganizationModule],
  providers: [
    BusinessResolver,
    BusinessCreateUseCase,
    BusinessGetByIdUseCase,
    BusinessGetListUseCase,
    BusinessUpdateUseCase,
    BusinessDeleteUseCase,
    BusinessGetListPublicUseCase,
    BusinessGetByIdPublicUseCase,
    BusinessRepository,
    BusinessSingleByIdLoader,
    { provide: InjectionKey.BUSINESS_MODEL, useValue: BusinessModel }
  ],
  exports: [BusinessRepository, BusinessSingleByIdLoader]
})
export class BusinessModule {}
