import { OrganizationUserBusinessOutletModel } from '@wahyoo/wahyoo-shared';
import { OrganizationUserBusinessOutlet } from '../dto/organizationUserBusinessOutlet.dto';

export class OrganizationUserBusinessOutletMapper {
  public static modelToDTO(
    model: OrganizationUserBusinessOutletModel
  ): OrganizationUserBusinessOutlet {
    return new OrganizationUserBusinessOutlet(model);
  }

  public static modelsToDTOs(
    models: OrganizationUserBusinessOutletModel[]
  ): OrganizationUserBusinessOutlet[] {
    return models.map(model =>
      OrganizationUserBusinessOutletMapper.modelToDTO(model)
    );
  }
}
