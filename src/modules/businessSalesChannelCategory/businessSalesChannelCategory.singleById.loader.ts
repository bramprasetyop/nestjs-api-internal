import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { BusinessSalesChannelCategory } from './dto/businessSalesChannelCategory.dto';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessSalesChannelCategoryRepository } from './repositories/businessSalesChannelCategory.repository';
import { BusinessSalesChannelCategoryModel } from '@wahyoo/wahyoo-shared';
import { BusinessSalesChannelCategoryMapper } from './mappers/businessSalesChannelCategory.mapper';

@Injectable()
export class BusinessSalesChannelCategorySingleByIdLoader
  implements NestDataLoader<string, BusinessSalesChannelCategory> {
  constructor(
    private readonly repository: BusinessSalesChannelCategoryRepository
  ) {}
  generateDataLoader(): DataLoader<string, BusinessSalesChannelCategory> {
    return new DataLoader<string, BusinessSalesChannelCategory>(async keys => {
      const businessSalesChannelCategoryes: BusinessSalesChannelCategoryModel[] = await this.repository.findByIds(
        keys as string[]
      );
      const businessSalesChannelCategoryList = BusinessSalesChannelCategoryMapper.modelsToDTOs(
        businessSalesChannelCategoryes
      );
      return keys.map(key =>
        businessSalesChannelCategoryList.find(
          businessSalesChannelCategory =>
            businessSalesChannelCategory.id === key
        )
      );
    });
  }
}
