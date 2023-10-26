import { Injectable, Inject } from '@nestjs/common';
import {
  BusinessMenuItemModel,
  InjectionKey,
  XHubsterItemModel
} from '@wahyoo/wahyoo-shared';
import { Op } from 'sequelize';
import { XHubsterItemAssignBusinessMenuItemRequest } from '../dto/xHubsterItemAssignBusinessMenuItemRequest.dto';
import { XHubsterStoreGetUnassignListRequest } from '../dto/xHubsterStoreGetUnassignListRequest.dto';
import { IXHubsterItemRepository } from './xHubsterItem.interface';

@Injectable()
export class XHubsterItemRepository implements IXHubsterItemRepository {
  constructor(
    @Inject(InjectionKey.X_HUBSTER_ITEM_MODEL)
    private readonly xHubsterItemModel: typeof XHubsterItemModel,
    @Inject(InjectionKey.BUSINESS_MENU_ITEM_MODEL)
    private readonly businessMenuItemModel: typeof BusinessMenuItemModel
  ) {}
  async getAllUnassignedBusinessMenuItem(
    dto: XHubsterStoreGetUnassignListRequest
  ): Promise<XHubsterItemModel[]> {
    const { search } = dto;
    const whereClause: any = {
      businessMenuItemId: {
        [Op.eq]: null
      }
    };

    if (search) {
      whereClause.name = { [Op.iLike]: `%${search}%` };
    }
    return this.xHubsterItemModel.findAll({
      where: whereClause
    });
  }
  async findByBusinessMenuItemIds(ids: string[]): Promise<XHubsterItemModel[]> {
    return this.xHubsterItemModel.findAll({
      where: {
        businessMenuItemId: {
          [Op.in]: ids
        }
      }
    });
  }
  async update(
    dto: XHubsterItemAssignBusinessMenuItemRequest
  ): Promise<XHubsterItemModel[]> {
    const { businessMenuItemId, xHubsterItemId } = dto;
    const businessMenuItem = await this.businessMenuItemModel.findByPk(
      businessMenuItemId
    );
    if (businessMenuItem) {
      const updatedData = await this.xHubsterItemModel.update(
        {
          businessMenuItemId,
          businessId: businessMenuItem.businessId
        },
        {
          where: {
            id: xHubsterItemId
          },
          returning: true
        }
      );
      return updatedData[1];
    }
    return null;
  }
}
