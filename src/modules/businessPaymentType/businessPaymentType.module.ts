import { Module } from '@nestjs/common';
import { BusinessPaymentTypeModel, InjectionKey } from '@wahyoo/wahyoo-shared';
// import { BusinessPaymentTypeResolver } from './businessPaymentType.resolver';
import { BusinessPaymentTypeSingleByIdLoader } from './businessPaymentType.singleById.loader';
import { BusinessPaymentTypeRepository } from './repositories/businessPaymentType.repository';
import { BusinessPaymentTypeCreateUseCase } from './useCases/businessPaymentType.create.usecase';
import { BusinessPaymentTypeGetByIdUseCase } from './useCases/businessPaymentType.getById.usecase';
import { BusinessPaymentTypeGetListUseCase } from './useCases/businessPaymentType.getList.usecase';
import { BusinessPaymentTypeUpdateUseCase } from './useCases/businessPaymentType.update.usecase';
import { BusinessPaymentTypeDeleteUseCase } from './useCases/businessPaymentType.delete.usecase';
import { BusinessModule } from '../business/business.module';
import { OrganizationModule } from '../organization/organization.module';

@Module({
  imports: [BusinessModule, OrganizationModule],
  providers: [
    // BusinessPaymentTypeResolver,
    BusinessPaymentTypeCreateUseCase,
    BusinessPaymentTypeGetByIdUseCase,
    BusinessPaymentTypeGetListUseCase,
    BusinessPaymentTypeUpdateUseCase,
    BusinessPaymentTypeDeleteUseCase,
    BusinessPaymentTypeRepository,
    BusinessPaymentTypeSingleByIdLoader,
    {
      provide: InjectionKey.BUSINESS_PAYMENT_TYPE_MODEL,
      useValue: BusinessPaymentTypeModel
    }
  ],
  exports: [BusinessPaymentTypeRepository, BusinessPaymentTypeSingleByIdLoader]
})
export class BusinessPaymentTypeModule {}
