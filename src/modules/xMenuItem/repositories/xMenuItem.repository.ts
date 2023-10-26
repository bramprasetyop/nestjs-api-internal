import { Injectable, Inject } from '@nestjs/common';
import { Op, QueryTypes } from 'sequelize';
import {
  InjectionKey,
  XHubsterItemModel,
  XKlikitItemModel,
  BusinessMenuItemModel
} from '@wahyoo/wahyoo-shared';
import { XMenuItem } from '../dto/xMenuItem.dto';
import { XMenuItemGetUnassignListRequest } from '../dto/xMenuItemUnassignedListRequest.dto';
import { IXMenuItemRepository } from './xMenuItem.interface';
import { XMenuItemAssignBusinessMenuItemRequest } from '../dto/xMenuItemAssignBusinessMenuItemRequest.dto';

@Injectable()
export class XMenuItemRepository implements IXMenuItemRepository {
  constructor(
    @Inject(InjectionKey.X_HUBSTER_ITEM_MODEL)
    private readonly xHubsterItemModel: typeof XHubsterItemModel,
    @Inject(InjectionKey.X_KLIKIT_ITEM_MODEL)
    private readonly xKlikitItemModel: typeof XKlikitItemModel,
    @Inject(InjectionKey.BUSINESS_MENU_ITEM_MODEL)
    private readonly businessMenuItemModel: typeof BusinessMenuItemModel
  ) {}
  async getAllUnassignedBusinessMenuItem(
    dto: XMenuItemGetUnassignListRequest
  ): Promise<XMenuItem[]> {
    const { filter, search } = dto;

    let result: any[] = await this.xHubsterItemModel.sequelize.query(
      `
      SELECT id as x_hubster_item_id, null as x_klikit_item_id, business_menu_item_id, business_id, name, 'Hubster' as source
      FROM x_hubster_items
        where business_menu_item_id isnull and deleted_at isnull

      union

      SELECT null as x_hubster_item_id, id as x_klikit_item_id, business_menu_item_id, business_id, name, 'Klikit' as source
      FROM x_klikit_items 
        where business_menu_item_id isnull and deleted_at isnull
    `,
      {
        type: QueryTypes.SELECT
      }
    );

    if (search) {
      result = await this.xHubsterItemModel.sequelize.query(
        `
        SELECT id as x_hubster_item_id, null as x_klikit_item_id, business_menu_item_id, business_id, name, 'Hubster' as source
        FROM x_hubster_items
          where business_menu_item_id isnull and deleted_at isnull and LOWER(name) ilike LOWER('%${search}%')
  
        union
  
        SELECT null as x_hubster_item_id, id as x_klikit_item_id, business_menu_item_id, business_id, name, 'Klikit' as source
        FROM x_klikit_items 
          where business_menu_item_id isnull and deleted_at isnull and LOWER(name) ilike LOWER('%${search}%')
      `,
        {
          type: QueryTypes.SELECT
        }
      );
    }

    if (filter) {
      if (filter.businessId) {
        result = await this.xHubsterItemModel.sequelize.query(
          `
          SELECT id as x_hubster_item_id, null as x_klikit_item_id, business_menu_item_id, business_id, name, 'Hubster' as source
          FROM x_hubster_items
            where business_id = '${filter.businessId}' and business_menu_item_id isnull and deleted_at isnull
    
          union
    
          SELECT null as x_hubster_item_id, id as x_klikit_item_id, business_menu_item_id, business_id, name, 'Klikit' as source
          FROM x_klikit_items 
            where business_id = '${filter.businessId}' and business_menu_item_id isnull and deleted_at isnull
        `,
          {
            type: QueryTypes.SELECT
          }
        );
      }
      if (filter.source === 'hubster') {
        result = await this.xHubsterItemModel.sequelize.query(
          `
          SELECT id as x_hubster_item_id, null as x_klikit_item_id, business_menu_item_id, business_id, name, 'Hubster' as source
          FROM x_hubster_items
            where business_menu_item_id isnull and deleted_at isnull
        `,
          {
            type: QueryTypes.SELECT
          }
        );
      }

      if (filter.source === 'klikit') {
        result = await this.xHubsterItemModel.sequelize.query(
          `
          SELECT null as x_hubster_item_id, id as x_klikit_item_id, business_menu_item_id, business_id, name, 'Klikit' as source
          FROM x_klikit_items 
            where business_menu_item_id isnull and deleted_at isnull
        `,
          {
            type: QueryTypes.SELECT
          }
        );
      }
      if (filter.businessId && filter.source === 'hubster') {
        result = await this.xHubsterItemModel.sequelize.query(
          `
          SELECT id as x_hubster_item_id, null as x_klikit_item_id, business_menu_item_id, business_id, name, 'Hubster' as source
          FROM x_hubster_items
            where business_id = '${filter.businessId}' and business_menu_item_id isnull and deleted_at isnull
        `,
          {
            type: QueryTypes.SELECT
          }
        );
      }

      if (filter.businessId && filter.source === 'klikit') {
        result = await this.xHubsterItemModel.sequelize.query(
          `
          SELECT null as x_hubster_item_id, id as x_klikit_item_id, business_menu_item_id, business_id, name, 'Klikit' as source
          FROM x_klikit_items 
            where business_id = '${filter.businessId}' and business_menu_item_id isnull and deleted_at isnull
        `,
          {
            type: QueryTypes.SELECT
          }
        );
      }
    }

    return result.map(x => {
      return new XMenuItem({
        xHubsterItemId: x.x_hubster_item_id,
        xKlikitItemId: x.x_klikit_item_id,
        name: x.name,
        source: x.source,
        businessId: x.business_id,
        businessMenuItemId: x.business_menu_item_id
      });
    });
  }

  async update(
    dto: XMenuItemAssignBusinessMenuItemRequest
  ): Promise<XMenuItem[]> {
    const { businessMenuItemId, xHubsterItemId, xKlikitItemId } = dto;
    const businessMenuItem = await this.businessMenuItemModel.findByPk(
      businessMenuItemId
    );
    if (businessMenuItem) {
      if (xHubsterItemId) {
        await this.xHubsterItemModel.update(
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
      }

      if (xKlikitItemId) {
        await this.xKlikitItemModel.update(
          {
            businessMenuItemId,
            businessId: businessMenuItem.businessId
          },
          {
            where: {
              id: xKlikitItemId
            },
            returning: true
          }
        );
      }

      const result: any[] = await this.xHubsterItemModel.sequelize.query(
        `
        SELECT id as x_hubster_item_id, null as x_klikit_item_id, business_menu_item_id, business_id, name, 'Hubster' as source
        FROM x_hubster_items
          where business_menu_item_id = '${businessMenuItemId}' and deleted_at isnull
  
        union
  
        SELECT null as x_hubster_item_id, id as x_klikit_item_id, business_menu_item_id, business_id, name, 'Klikit' as source
        FROM x_klikit_items 
          where business_menu_item_id = '${businessMenuItemId}' and deleted_at isnull
      `,
        {
          type: QueryTypes.SELECT
        }
      );

      return result.map(x => {
        return new XMenuItem({
          xHubsterItemId: x.x_hubster_item_id,
          xKlikitItemId: x.x_klikit_item_id,
          name: x.name,
          source: x.source,
          businessId: x.business_id,
          businessMenuItemId: x.business_menu_item_id
        });
      });
    }
    return null;
  }
}
