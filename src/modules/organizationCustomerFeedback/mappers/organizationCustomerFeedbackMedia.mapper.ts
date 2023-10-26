import { OrganizationCustomerFeedbackMediaModel } from '@wahyoo/wahyoo-shared';
import { OrganizationCustomerFeedbackMedia } from '../dto/organizationCustomerFeedbackMedia.dto';

export class OrganizationCustomerFeedbackMediaMapper {
  public static modelToDTO(
    model: OrganizationCustomerFeedbackMediaModel
  ): OrganizationCustomerFeedbackMedia {
    return new OrganizationCustomerFeedbackMedia(model);
  }

  public static modelsToDTOs(
    models: OrganizationCustomerFeedbackMediaModel[]
  ): OrganizationCustomerFeedbackMedia[] {
    return models.map(model =>
      OrganizationCustomerFeedbackMediaMapper.modelToDTO(model)
    );
  }
}
