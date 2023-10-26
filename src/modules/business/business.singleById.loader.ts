import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { Business } from './dto/business.dto';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessRepository } from './repositories/business.repository';
import { BusinessModel } from '@wahyoo/wahyoo-shared';
import { BusinessMapper } from './mappers/business.mapper';

@Injectable()
export class BusinessSingleByIdLoader
  implements NestDataLoader<string, Business> {
  constructor(private readonly repository: BusinessRepository) {}
  generateDataLoader(): DataLoader<string, Business> {
    return new DataLoader<string, Business>(async keys => {
      const businesses: BusinessModel[] = await this.repository.findByIds(
        keys as string[]
      );
      const businessList = BusinessMapper.modelsToDTOs(businesses);
      return keys.map(key =>
        businessList.find(business => business.id === key)
      );
    });
  }
}
