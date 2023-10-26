import { XOrganizationUserWahyooUserModel } from '@wahyoo/wahyoo-shared';
import { XOrganizationUserWahyooUser } from '../dto/xOrganizationUserWahyooUser.dto';

export class XOrganizationUserWahyooUserMapper {
  public static modelToDTO(
    model: XOrganizationUserWahyooUserModel
  ): XOrganizationUserWahyooUser {
    return new XOrganizationUserWahyooUser(model);
  }

  public static modelsToDTOs(
    models: XOrganizationUserWahyooUserModel[]
  ): XOrganizationUserWahyooUser[] {
    return models.map(model =>
      XOrganizationUserWahyooUserMapper.modelToDTO(model)
    );
  }
}
