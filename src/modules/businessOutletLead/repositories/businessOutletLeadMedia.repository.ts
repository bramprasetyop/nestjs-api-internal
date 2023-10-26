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
import { Op } from 'sequelize';
import { BusinessOutletLeadLogGetListRequest } from '../dto/businessOutletLeadLogGetListRequest.dto';
import { BusinessOutletLeadLogMapper } from '../mappers/businessOutletLeadLog.mapper';
import { IBusinessOutletLeadMediaRepository } from './businessOutletLeadMedia.interface';

@Injectable()
export class BusinessOutletLeadMediaRepository
  implements IBusinessOutletLeadMediaRepository {
  constructor(
    @Inject(InjectionKey.BUSINESS_OUTLET_LEAD_MEDIA_MODEL)
    private readonly businessOutletLeadMediaModel: typeof BusinessOutletLeadMediaModel
  ) {}

  async findByBusinessOutletLeadIds(
    businessOutletLeadIds: string[]
  ): Promise<BusinessOutletLeadMediaModel[]> {
    return this.businessOutletLeadMediaModel.findAll({
      where: {
        businessOutletLeadId: {
          [Op.in]: businessOutletLeadIds
        }
      }
    });
  }
}
