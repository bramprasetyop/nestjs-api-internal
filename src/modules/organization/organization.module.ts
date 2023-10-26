import { Module } from '@nestjs/common';
import { OrganizationModel, InjectionKey } from '@wahyoo/wahyoo-shared';
// import { OrganizationResolver } from './organization.resolver';
import { OrganizationSingleByIdLoader } from './organization.singleById.loader';
import { OrganizationRepository } from './repositories/organization.repository';
import { OrganizationCreateUseCase } from './useCases/organization.create.usecase';
import { OrganizationGetByIdUseCase } from './useCases/organization.getById.usecase';
import { OrganizationGetListUseCase } from './useCases/organization.getList.usercase';

@Module({
  imports: [],
  providers: [
    // OrganizationResolver,
    OrganizationCreateUseCase,
    OrganizationGetByIdUseCase,
    OrganizationGetListUseCase,
    OrganizationRepository,
    OrganizationSingleByIdLoader,
    { provide: InjectionKey.ORGANIZATION_MODEL, useValue: OrganizationModel }
  ],
  exports: [OrganizationRepository, OrganizationSingleByIdLoader]
})
export class OrganizationModule {}
