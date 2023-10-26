import { OrganizationUserBusinessModel } from '@wahyoo/wahyoo-shared';
import { OrganizationUserBusiness } from '../dto/organizationUserBusiness.dto';

export class OrganizationUserBusinessMapper {
  public static modelToDTO(
    model: OrganizationUserBusinessModel
  ): OrganizationUserBusiness {
    return new OrganizationUserBusiness(model);
  }

  public static modelsToDTOs(
    models: OrganizationUserBusinessModel[]
  ): OrganizationUserBusiness[] {
    return models.map(model =>
      OrganizationUserBusinessMapper.modelToDTO(model)
    );
  }
}
