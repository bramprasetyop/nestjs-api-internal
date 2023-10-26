import { BusinessOutletLeadLog } from '../dto/businessOutletLeadLog.dto';
import { BusinessOutletLeadLogGetListRequest } from '../dto/businessOutletLeadLogGetListRequest.dto';

export class PagingBusinessOutletLeadLog {
  businessOutletLeadLogs: BusinessOutletLeadLog[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}

export interface IBusinessOutletLeadLogRepository {
  findByBusinessOutletLeadId(
    dto: BusinessOutletLeadLogGetListRequest
  ): Promise<PagingBusinessOutletLeadLog>;
}
