import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { Business } from '../business/dto/business.dto';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessRepository } from '../business/repositories/business.repository';
import { BusinessModel, BusinessPropertyModel } from '@wahyoo/wahyoo-shared';
import { BusinessMapper } from '../business/mappers/business.mapper';
import { BusinessProperty } from './dto/businessProperty.dto';
import { BusinessPropertyRepository } from './repositories/businessProperty.repository';
import { BusinessPropertyMapper } from './mappers/businessProperty.mapper';

@Injectable()
export class BusinessPropertySingleByBusinessIdLoader
  implements NestDataLoader<string, BusinessProperty> {
  constructor(private readonly repository: BusinessPropertyRepository) {}
  generateDataLoader(): DataLoader<string, BusinessProperty> {
    return new DataLoader<string, BusinessProperty>(async keys => {
      const businessProperties: BusinessPropertyModel[] = await this.repository.findByBusinessIds(
        keys as string[]
      );
      const businessPropertyList = BusinessPropertyMapper.modelsToDTOs(
        businessProperties
      );
      return keys.map(key =>
        businessPropertyList.find(
          businessProperty => businessProperty.businessId === key
        )
      );
    });
  }
}
