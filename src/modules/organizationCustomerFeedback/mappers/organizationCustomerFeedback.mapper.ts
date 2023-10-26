import { OrganizationCustomerFeedbackModel } from '@wahyoo/wahyoo-shared';
import { OrganizationCustomerFeedback } from '../dto/organizationCustomerFeedback.dto';

export class OrganizationCustomerFeedbackMapper {
  public static modelToDTO(
    model: OrganizationCustomerFeedbackModel
  ): OrganizationCustomerFeedback {
    return new OrganizationCustomerFeedback(model);
  }

  public static modelsToDTOs(
    models: OrganizationCustomerFeedbackModel[]
  ): OrganizationCustomerFeedback[] {
    return models.map(model =>
      OrganizationCustomerFeedbackMapper.modelToDTO(model)
    );
  }
}
