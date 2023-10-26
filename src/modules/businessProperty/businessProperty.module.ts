import { Module } from '@nestjs/common';
import { BusinessPropertyModel, InjectionKey } from '@wahyoo/wahyoo-shared';
import { OrganizationModule } from '../organization/organization.module';
import { BusinessPropertyRepository } from './repositories/businessProperty.repository';
import { BusinessPropertySingleByBusinessIdLoader } from './businessProperty.singleByBusinessId.loader';
import { BusinessPropertyResolver } from './businessProperty.resolver';
import { BusinessPropertyByBusinessIdUseCase } from './useCases/businessProperty.ByBusinessId.usecase';

@Module({
  imports: [OrganizationModule],
  providers: [
    BusinessPropertyResolver,
    BusinessPropertyRepository,
    BusinessPropertyByBusinessIdUseCase,
    BusinessPropertySingleByBusinessIdLoader,
    {
      provide: InjectionKey.BUSINESS_PROPERTY_MODEL,
      useValue: BusinessPropertyModel
    }
  ],
  exports: [
    BusinessPropertyRepository,
    BusinessPropertySingleByBusinessIdLoader
  ]
})
export class BusinessPropertyModule {}
