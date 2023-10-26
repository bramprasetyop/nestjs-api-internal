import { BusinessOutletLeadMediaModel } from '@wahyoo/wahyoo-shared';
import { BusinessOutletLeadLog } from '../dto/businessOutletLeadLog.dto';
import { BusinessOutletLeadLogGetListRequest } from '../dto/businessOutletLeadLogGetListRequest.dto';

export interface IBusinessOutletLeadMediaRepository {
  findByBusinessOutletLeadIds(
    ids: string[]
  ): Promise<BusinessOutletLeadMediaModel[]>;
}
