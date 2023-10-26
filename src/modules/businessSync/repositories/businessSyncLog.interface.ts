import { BusinessSyncLogModel } from '@wahyoo/wahyoo-shared';
import { BusinessSyncLogStatusRequest } from '../dto/businessSyncLogStatusRequest.dto';

export interface IBusinessSyncLogRepository {
  findById(id: string): Promise<BusinessSyncLogModel>;
  findLast(dto: BusinessSyncLogStatusRequest): Promise<BusinessSyncLogModel>;
}
