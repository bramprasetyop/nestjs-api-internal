import { OrganizationUserModel } from '@wahyoo/wahyoo-shared';
import { OrganizationUser } from '../dto/user.dto';

export class UserMapper {
  public static modelToDTO(model: OrganizationUserModel): OrganizationUser {
    return new OrganizationUser(model);
  }

  public static modelsToDTOs(
    models: OrganizationUserModel[]
  ): OrganizationUser[] {
    return models.map(model => UserMapper.modelToDTO(model));
  }
}
