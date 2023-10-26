import { Injectable, Inject } from '@nestjs/common';
import {
  InjectionKey,
  XBusinessOutletKioskModel,
  XHubsterStoreModel
} from '@wahyoo/wahyoo-shared';
import { Op } from 'sequelize';
import { XHubsterStoreGetUnassignListRequest } from '../dto/xHubsterStoreGetUnassignListRequest.dto';
import { IXHubsterStoreRepository } from './xHubsterStore.interface';

@Injectable()
export class XHubsterStoreRepository implements IXHubsterStoreRepository {
  constructor(
    @Inject(InjectionKey.X_HUBSTER_STORE_MODEL)
    private readonly xHubsterStoreModel: typeof XHubsterStoreModel
  ) {}
  async getAllUnassignedBusinessOutlet(
    dto: XHubsterStoreGetUnassignListRequest
  ): Promise<XHubsterStoreModel[]> {
    const { search } = dto;
    const whereClause: any = {
      businessOutletId: {
        [Op.eq]: null
      }
    };

    if (search) {
      whereClause.name = { [Op.iLike]: `%${search}%` };
    }

    return this.xHubsterStoreModel.findAll({
      where: whereClause
    });
  }
  async findByByBusinessOutletIds(
    ids: string[]
  ): Promise<XHubsterStoreModel[]> {
    return this.xHubsterStoreModel.findAll({
      where: {
        businessOutletId: {
          [Op.in]: ids
        }
      }
    });
  }
  async update(id: string, data: any): Promise<XHubsterStoreModel[]> {
    const updatedData = await this.xHubsterStoreModel.update(data, {
      where: {
        id
      },
      returning: true
    });
    return updatedData[1];
  }
}
