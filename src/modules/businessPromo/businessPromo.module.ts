import { Module } from '@nestjs/common';
import {
  BusinessPromosModel,
  BusinessPromoMenuItemsModel,
  BusinessPromoLogModel,
  InjectionKey
} from '@wahyoo/wahyoo-shared';
import { BusinessPromoResolver } from './businessPromo.resolver';
import { BusinessPromoMenuItemSingleByIdLoader } from './businessPromoMenuItem.singleById.loader';
import { BusinessPromoRepository } from './repositories/businessPromo.repository';
import { BusinessPromoCreateUseCase } from './useCases/businessPromo.create.usecase';
import { BusinessPromoGetByIdUseCase } from './useCases/businessPromo.getById.usecase';
import { BusinessPromoGetListUseCase } from './useCases/businessPromo.getList.usecase';
import { BusinessPromoUpdateUseCase } from './useCases/businessPromo.update.usecase';
import { BusinessPromoClosedUseCase } from './useCases/businessPromo.closed.usecase';
import { BusinessModule } from '../business/business.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [BusinessModule, UserModule],
  providers: [
    BusinessPromoResolver,
    BusinessPromoCreateUseCase,
    BusinessPromoGetByIdUseCase,
    BusinessPromoGetListUseCase,
    BusinessPromoUpdateUseCase,
    BusinessPromoClosedUseCase,
    BusinessPromoRepository,
    BusinessPromoMenuItemSingleByIdLoader,
    {
      provide: InjectionKey.BUSINESS_PROMOS_MODEL,
      useValue: BusinessPromosModel
    },
    {
      provide: InjectionKey.BUSINESS_PROMO_MENU_ITEMS_MODEL,
      useValue: BusinessPromoMenuItemsModel
    },
    {
      provide: InjectionKey.BUSINESS_PROMO_LOG_MODEL,
      useValue: BusinessPromoLogModel
    }
  ],
  exports: [BusinessPromoRepository, BusinessPromoMenuItemSingleByIdLoader]
})
export class BusinessPromoModule {}
