import { Module } from '@nestjs/common';
import {
  InjectionKey,
  OrganizationLoyaltyMessageModel
} from '@wahyoo/wahyoo-shared';
import { OrganizationSingleByIdLoader } from '../organization/organization.singleById.loader';
// import { OrganizationLoyaltyMessageResolver } from './organizationLoyaltyMessage.resolver';
import { OrganizationLoyaltyMessageRepository } from './repositories/organizationLoyaltyMessage.repository';
import { OrganizationLoyaltyMessageGetRandomMessageUseCase } from './userCases/organizationLoyaltyMessage.getRandomMessage.usecase';

@Module({
  imports: [],
  providers: [
    // OrganizationLoyaltyMessageResolver,
    OrganizationLoyaltyMessageGetRandomMessageUseCase,
    OrganizationLoyaltyMessageRepository,
    {
      provide: InjectionKey.ORGANIZATION_LOYALTY_MESSAGE_MODEL,
      useValue: OrganizationLoyaltyMessageModel
    }
  ]
})
export class OrganizationLoyaltyMessageModule {}
