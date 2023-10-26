import { Injectable, Inject } from '@nestjs/common';
import { BusinessSyncLogModel, InjectionKey } from '@wahyoo/wahyoo-shared';
import { BusinessSyncLogStatusRequest } from '../dto/businessSyncLogStatusRequest.dto';
import { IBusinessSyncLogRepository } from './businessSyncLog.interface';

@Injectable()
export class BusinessSyncLogRepository implements IBusinessSyncLogRepository {
  constructor(
    @Inject(InjectionKey.BUSINESS_SYNC_LOG_MODEL)
    private readonly businessSyncLogModel: typeof BusinessSyncLogModel
  ) {}
  async findById(id: string): Promise<BusinessSyncLogModel> {
    return this.businessSyncLogModel.findByPk(id);
  }
  async findLast(
    dto: BusinessSyncLogStatusRequest
  ): Promise<BusinessSyncLogModel> {
    return this.businessSyncLogModel.findOne({
      where: {
        businessId: dto.businessId
      },
      order: [['createdAt', 'DESC']]
    });
  }
}
