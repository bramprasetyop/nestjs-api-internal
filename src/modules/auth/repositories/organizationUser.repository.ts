import { Inject } from '@nestjs/common';
import {
  BusinessOutletModel,
  InjectionKey,
  OrganizationUserBusinessModel,
  OrganizationUserBusinessOutletModel,
  OrganizationUserModel
} from '@wahyoo/wahyoo-shared';
import {
  FindByIdArgs,
  FindByPhoneNumberArgs,
  IOrganizationUserRepository
} from './organizationUser.interface';

export class OrganizationUserRepository implements IOrganizationUserRepository {
  constructor(
    @Inject(InjectionKey.ORGANIZATION_USER_MODEL)
    private readonly organizationUserModel: typeof OrganizationUserModel
  ) {}
  async findByPhoneNumber({
    phoneNumber,
    countryCode
  }: FindByPhoneNumberArgs): Promise<any> {
    const organizationUser = await this.organizationUserModel.findOne({
      where: {
        phoneNumber,
        countryCode
      }
    });
    return organizationUser;
  }
  async findById({ id }: FindByIdArgs): Promise<any> {
    const organizationUser = await this.organizationUserModel.findOne({
      where: {
        id
      },
      include: [
        {
          model: OrganizationUserBusinessModel
        },
        {
          model: OrganizationUserBusinessOutletModel,
          include: [BusinessOutletModel]
        }
      ]
    });
    return organizationUser;
  }
}
