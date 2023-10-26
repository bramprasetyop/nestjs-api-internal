import {
  OrganizationCustomerFeedbackModel,
  OrganizationModel
} from '@wahyoo/wahyoo-shared';
import { OrganizationCustomerFeedbackCreateRequest } from '../dto/organizationCustomerFeedbackCreateRequest.dto';

export interface ArgsFindByPhoneNumberAndBusinessOutletId {
  phoneNumber: string;
  businessOutletId: string;
}

export interface IOrganizationCustomerFeedbackRepository {
  findById(id: string): Promise<OrganizationCustomerFeedbackModel>;
  findByPhoneNumberAndBusinessOutletId(
    args: ArgsFindByPhoneNumberAndBusinessOutletId
  ): Promise<OrganizationCustomerFeedbackModel>;
  create(
    dto: OrganizationCustomerFeedbackCreateRequest
  ): Promise<OrganizationCustomerFeedbackModel>;
}
