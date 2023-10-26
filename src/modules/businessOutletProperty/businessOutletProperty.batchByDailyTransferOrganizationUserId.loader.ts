import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'src/commons/loader';
import {
  BusinessOutletPropertyModel,
  BusinessSalesChannelMenuCategoryModel
} from '@wahyoo/wahyoo-shared';
import { BusinessOutletPropertyRepository } from './respositories/businessOutletProperty.repository';
import { BusinessOutletProperty } from './dto/businessOutletProperty.dto';
import { BusinessOutletPropertyMapper } from './mappers/businessOutletProperty.mapper';

@Injectable()
export class BusinessOutletPropertyBatchByDailyTransferOrganizationUserILoader
  implements NestDataLoader<string, BusinessOutletProperty[]> {
  constructor(private readonly repository: BusinessOutletPropertyRepository) {}
  generateDataLoader(): DataLoader<string, BusinessOutletProperty[]> {
    return new DataLoader<string, BusinessOutletProperty[]>(async keys => {
      const businessOutletProperties: BusinessOutletPropertyModel[] = await this.repository.findByDailyTransferOrganizationUserIds(
        keys as string[]
      );
      const businessOutletPropertyList = BusinessOutletPropertyMapper.modelsToDTOs(
        businessOutletProperties
      );
      return keys.map(key =>
        businessOutletPropertyList.filter(
          businessOutletProperty =>
            businessOutletProperty.dailyTransferOrganizationUserId === key
        )
      );
    });
  }
}
