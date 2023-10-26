import { Module } from '@nestjs/common';
import {
  BusinessMenuModifierItemModel,
  BusinessMenuModifierModel,
  InjectionKey
} from '@wahyoo/wahyoo-shared';
import { BusinessMenuModifierResolver } from './businessMenuModifier.resolver';
import { BusinessMenuModifierSingleByIdLoader } from './businessMenuModifier.singleById.loader';
import { BusinessMenuModifierRepository } from './repositories/businessMenuModifier.repository';
import { BusinessMenuModifierCreateUseCase } from './useCases/businessMenuModifier.create.usecase';
import { BusinessMenuModifierGetByIdUseCase } from './useCases/businessMenuModifier.getById.usecase';
import { BusinessMenuModifierGetListUseCase } from './useCases/businessMenuModifier.getList.usecase';
import { BusinessMenuModifierUpdateUseCase } from './useCases/businessMenuModifier.update.usecase';
import { BusinessMenuModifierDeleteUseCase } from './useCases/businessMenuModifier.delete.usecase';
import { BusinessModule } from '../business/business.module';
import { OrganizationModule } from '../organization/organization.module';
import { BusinessMenuItemModifierItemBatchByMenuModifierIdLoader } from './businessMenuItemModifier.batchByMenuModifierId.loader';
import { UserModule } from '../user/user.module';
import { BusinessMenuItemModule } from '../businessMenuItem/businessMenuItem.module';
import { BusinessMenuModifierItemResolver } from './businessMenuModifierItem.resolver';

@Module({
  imports: [
    BusinessModule,
    OrganizationModule,
    UserModule,
    BusinessMenuItemModule
  ],
  providers: [
    BusinessMenuModifierResolver,
    BusinessMenuModifierItemResolver,
    BusinessMenuModifierCreateUseCase,
    BusinessMenuModifierGetByIdUseCase,
    BusinessMenuModifierGetListUseCase,
    BusinessMenuModifierUpdateUseCase,
    BusinessMenuModifierDeleteUseCase,
    BusinessMenuModifierRepository,
    BusinessMenuModifierSingleByIdLoader,
    BusinessMenuItemModifierItemBatchByMenuModifierIdLoader,
    {
      provide: InjectionKey.BUSINESS_MENU_MODIFIER_MODEL,
      useValue: BusinessMenuModifierModel
    },
    {
      provide: InjectionKey.BUSINESS_MENU_MODIFIER_ITEM_MODEL,
      useValue: BusinessMenuModifierItemModel
    }
  ],
  exports: [
    BusinessMenuModifierRepository,
    BusinessMenuModifierSingleByIdLoader,
    BusinessMenuItemModifierItemBatchByMenuModifierIdLoader
  ]
})
export class BusinessMenuModifierModule {}
