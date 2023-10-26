import { Injectable, Inject } from '@nestjs/common';
import { Op, QueryTypes } from 'sequelize';
import {
  BusinessOutletModel,
  BusinessOutletPropertyModel,
  InjectionKey
} from '@wahyoo/wahyoo-shared';
import { IBusinessOutletPropertyRepository } from './businessOutletProperty.interface';
import { BusinessOutletPropertyCreateRequest } from '../dto/businessOutletPropertyCreateRequest.dto';
import { BusinessOutletPropertyUpdateRequest } from 'src/modules/businessOutlet/dto/businessOutletPropertyUpdateRequest.dto';

@Injectable()
export class BusinessOutletPropertyRepository
  implements IBusinessOutletPropertyRepository {
  constructor(
    @Inject(InjectionKey.BUSINESS_OUTLET_MODEL)
    private readonly businessOutletModel: typeof BusinessOutletModel,
    @Inject(InjectionKey.BUSINESS_OUTLET_PROPERTY_MODEL)
    private readonly businessOutletPropertyModel: typeof BusinessOutletPropertyModel
  ) {}

  public async findById(id: string): Promise<BusinessOutletPropertyModel> {
    return this.businessOutletPropertyModel.findByPk(id);
  }

  async findByOutletIds(ids: string[]): Promise<BusinessOutletPropertyModel[]> {
    return this.businessOutletPropertyModel.findAll({
      where: {
        businessOutletId: {
          [Op.in]: ids
        }
      }
    });
  }

  public async findByDailyTransferOrganizationUserIds(
    ids: string[]
  ): Promise<BusinessOutletPropertyModel[]> {
    return await this.businessOutletPropertyModel.findAll({
      where: {
        dailyTransferOrganizationUserId: {
          [Op.in]: ids
        }
      }
    });
  }

  public async findByBusinessOutletId(
    id: string
  ): Promise<BusinessOutletPropertyModel> {
    return this.businessOutletPropertyModel.findOne({
      where: { businessOutletId: id }
    });
  }

  public async create(
    dto: BusinessOutletPropertyCreateRequest
  ): Promise<BusinessOutletPropertyModel> {
    const businessOutlet = await this.businessOutletModel.findByPk(
      dto.businessOutletId
    );
    if (!businessOutlet) {
      throw new Error(`Business Outlet ${dto.businessOutletId} not found`);
    }
    return this.businessOutletPropertyModel.create(dto);
  }
}
