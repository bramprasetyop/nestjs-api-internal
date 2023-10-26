import { Injectable, Inject } from '@nestjs/common';
import {
  BusinessOutletLeadLogModel,
  BusinessOutletLeadMediaModel,
  BusinessOutletLeadModel,
  InjectionKey
} from '@wahyoo/wahyoo-shared';
import {
  IBusinessOutletLeadLogRepository,
  PagingBusinessOutletLeadLog
} from './businessOutletLeadLog.interface';
import { BusinessOutletLeadLogGetListRequest } from '../dto/businessOutletLeadLogGetListRequest.dto';
import { BusinessOutletLeadLogMapper } from '../mappers/businessOutletLeadLog.mapper';

@Injectable()
export class BusinessOutletLeadLogRepository
  implements IBusinessOutletLeadLogRepository {
  constructor(
    @Inject(InjectionKey.BUSINESS_OUTLET_LEAD_MODEL)
    private readonly businessOutletLeadModel: typeof BusinessOutletLeadModel,
    @Inject(InjectionKey.BUSINESS_OUTLET_LEAD_LOG_MODEL)
    private readonly businessOutletLeadLogModel: typeof BusinessOutletLeadLogModel,
    @Inject(InjectionKey.BUSINESS_OUTLET_LEAD_MEDIA_MODEL)
    private readonly businessOutletLeadMediaModel: typeof BusinessOutletLeadMediaModel
  ) {}

  async findByBusinessOutletLeadId(
    dto: BusinessOutletLeadLogGetListRequest
  ): Promise<PagingBusinessOutletLeadLog> {
    const { sortBy, page, pageSize, businessOutletLeadId } = dto;
    const whereClause: any = {
      businessOutletLeadId
    };
    const result = await this.businessOutletLeadLogModel.findAndCountAll({
      where: whereClause,
      order: [[sortBy.columnName, sortBy.sortOrder]],
      limit: pageSize,
      offset: pageSize * page
    });
    return {
      businessOutletLeadLogs: BusinessOutletLeadLogMapper.modelsToDTOs(
        result.rows
      ),
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }
}
