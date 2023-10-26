import { Injectable, Inject } from '@nestjs/common';
import {
  InjectionKey,
  OrganizationBlacklistedUserModel
} from '@wahyoo/wahyoo-shared';
import { IOrganizationBlacklistedUserRepository } from './organizationBlacklistedUser.interface';

@Injectable()
export class OrganizationBlacklistedUserRepository
  implements IOrganizationBlacklistedUserRepository {
  constructor(
    @Inject(InjectionKey.ORGANIZATION_BLACKLISTED_USER_MODEL)
    private readonly organizationBlacklistedUserModel: typeof OrganizationBlacklistedUserModel
  ) {}

  async isOrganizationBlacklistedUser(organizationUserId): Promise<boolean> {
    const result = await this.organizationBlacklistedUserModel.findOne({
      where: {
        organizationUserId
      }
    });
    return !!result;
  }
}
