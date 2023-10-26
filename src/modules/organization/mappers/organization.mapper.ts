import { OrganizationModel } from '@wahyoo/wahyoo-shared';
import { Organization } from '../dto/organization.dto';

export class OrganizationMapper {
  public static modelToDTO(model: OrganizationModel): Organization {
    return new Organization(model);
  }

  public static modelsToDTOs(models: OrganizationModel[]): Organization[] {
    return models.map(model => OrganizationMapper.modelToDTO(model));
  }
}
