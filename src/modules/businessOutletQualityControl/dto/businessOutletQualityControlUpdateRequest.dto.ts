import { BusinessOutletQualityControlStatus } from '@wahyoo/wahyoo-shared';

export class BusinessOutletQualityControlUpdateRequest {
  id: string;
  qcResponseJson?: JSON;
  status: BusinessOutletQualityControlStatus;
  reviewedBy?: string;
}
