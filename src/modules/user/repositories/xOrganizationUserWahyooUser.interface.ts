import { XOrganizationUserWahyooUserModel } from '@wahyoo/wahyoo-shared';
export interface IXOrganizationUserWahyooUserRepository {
  findByOrganizationUserIds(
    ids: string[]
  ): Promise<XOrganizationUserWahyooUserModel[]>;
}
