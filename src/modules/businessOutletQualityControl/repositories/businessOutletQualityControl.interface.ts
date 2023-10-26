import { BusinessOutletQualityControlModel } from '@wahyoo/wahyoo-shared';
import { BusinessOutletQualityControlGetListRequest } from '../dto/businessOutletQualityControlGetListRequest.dto';
import { BusinessOutletQualityControlSubmitRequest } from '../dto/businessOutletQualityControlSubmitRequest.dto';
import { BusinessOutletQualityControlUpdateRequest } from '../dto/businessOutletQualityControlUpdateRequest.dto';

export class markAsReviewedInput {
  id: string;
  reviewedBy: string;
}

export class PagingBusinessOutletQualityControlModel {
  businessOutletQualityControls: BusinessOutletQualityControlModel[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}

export interface IBusinessOutletQualityControlRepository {
  findById(id: string): Promise<BusinessOutletQualityControlModel>;
  findAll(
    dto: BusinessOutletQualityControlGetListRequest
  ): Promise<PagingBusinessOutletQualityControlModel>;
  update(
    dto: BusinessOutletQualityControlUpdateRequest
  ): Promise<BusinessOutletQualityControlModel>;
  submit(
    dto: BusinessOutletQualityControlSubmitRequest
  ): Promise<BusinessOutletQualityControlModel>;
  markAsReviewed(
    dto: markAsReviewedInput
  ): Promise<BusinessOutletQualityControlModel>;
  countStatusAggregate(
    businessId: string
  ): Promise<BusinessOutletQualityControlModel[]>;
}
