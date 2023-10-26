import { OrganizationLoyaltyMessageModel } from '@wahyoo/wahyoo-shared';
import { OrganizationLoyaltyMessage } from '../dto/organizationLoyaltyMessage.dto';

export class OrganizationLoyaltyMessageMapper {
  public static modelToDTO(
    model: OrganizationLoyaltyMessageModel
  ): OrganizationLoyaltyMessage {
    return new OrganizationLoyaltyMessage(model);
  }

  public static modelsToDTOs(
    models: OrganizationLoyaltyMessageModel[]
  ): OrganizationLoyaltyMessage[] {
    return models.map(model =>
      OrganizationLoyaltyMessageMapper.modelToDTO(model)
    );
  }
}
