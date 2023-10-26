import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessOutletProperty } from './dto/businessOutletProperty.dto';
import { BusinessOutletPropertyRepository } from './respositories/businessOutletProperty.repository';
import { BusinessOutletPropertyModel } from '@wahyoo/wahyoo-shared';
import { BusinessOutletPropertyMapper } from './mappers/businessOutletProperty.mapper';

@Injectable()
export class BusinessOutletPropertySingleByOutletIdLoader
  implements NestDataLoader<string, BusinessOutletProperty> {
  constructor(private readonly repository: BusinessOutletPropertyRepository) {}
  generateDataLoader(): DataLoader<string, BusinessOutletProperty> {
    return new DataLoader<string, BusinessOutletProperty>(async keys => {
      const businessOutlets: BusinessOutletPropertyModel[] = await this.repository.findByOutletIds(
        keys as string[]
      );
      const businessOutletPropertyList = BusinessOutletPropertyMapper.modelsToDTOs(
        businessOutlets
      );
      return keys.map(key =>
        businessOutletPropertyList.find(
          businessOutletProperty =>
            businessOutletProperty.businessOutletId === key
        )
      );
    });
  }
}
