import { BusinessOutletPropertyModel } from '@wahyoo/wahyoo-shared';
import { BusinessOutletPropertyCreateRequest } from '../dto/businessOutletPropertyCreateRequest.dto';

export interface IBusinessOutletPropertyRepository {
  findById(id: string): Promise<BusinessOutletPropertyModel>;
  findByBusinessOutletId(id: string): Promise<BusinessOutletPropertyModel>;
  create(
    dto: BusinessOutletPropertyCreateRequest
  ): Promise<BusinessOutletPropertyModel>;
}
