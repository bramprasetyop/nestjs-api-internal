import { OrganizationLoyaltyMessageModel } from '@wahyoo/wahyoo-shared';
export interface IOrganizationLoyaltyMessageRepository {
  findOneRandom(): Promise<OrganizationLoyaltyMessageModel>;
}
