import { Injectable, Inject } from '@nestjs/common';
import {
  InjectionKey,
  OrganizationLoyaltyMessageModel,
  OrganizationLoyaltyMessageStatus
} from '@wahyoo/wahyoo-shared';
import { IOrganizationLoyaltyMessageRepository } from './organizationLoyaltyMessage.interface';

@Injectable()
export class OrganizationLoyaltyMessageRepository
  implements IOrganizationLoyaltyMessageRepository {
  constructor(
    @Inject(InjectionKey.ORGANIZATION_LOYALTY_MESSAGE_MODEL)
    private readonly organizationLoyaltyMessageModel: typeof OrganizationLoyaltyMessageModel
  ) {}
  async findOneRandom(): Promise<OrganizationLoyaltyMessageModel> {
    const { sequelize } = this.organizationLoyaltyMessageModel;
    const model = await this.organizationLoyaltyMessageModel.findOne({
      where: {
        status: OrganizationLoyaltyMessageStatus.active
      },
      order: sequelize.random()
    });
    return model;
  }
}
