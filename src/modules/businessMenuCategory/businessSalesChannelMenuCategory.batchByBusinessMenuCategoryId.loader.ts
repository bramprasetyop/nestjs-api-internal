import DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessSalesChannelMenuCategory } from './dto/businessSalesChannelMenuCategory.dto';
import { BusinessSalesChannelMenuCategoryModel } from '@wahyoo/wahyoo-shared';
import { BusinessSalesChannelMenuCategoryMapper } from './mappers/businessSalesChannelMenuCategory.mapper';
import { BusinessSalesChannelMenuCategoryRepository } from './repositories/businessSalesChannelMenuCategory.repository';

@Injectable()
export class BusinessSalesChannelMenuCategoryItemBatchByBusinessMenuCategoryIdLoader
  implements NestDataLoader<string, BusinessSalesChannelMenuCategory[]> {
  constructor(
    private readonly repository: BusinessSalesChannelMenuCategoryRepository
  ) {}
  generateDataLoader(): DataLoader<string, BusinessSalesChannelMenuCategory[]> {
    return new DataLoader<string, BusinessSalesChannelMenuCategory[]>(
      async keys => {
        const businessSalesChannelMenuCategories: BusinessSalesChannelMenuCategoryModel[] = await this.repository.findByBusinessMenuCategoryIds(
          keys as string[]
        );
        const businessMenuCategoryList = BusinessSalesChannelMenuCategoryMapper.modelsToDTOs(
          businessSalesChannelMenuCategories
        );
        return keys.map(key =>
          businessMenuCategoryList.filter(
            businessSalesChannelMenuCategory =>
              businessSalesChannelMenuCategory.businessMenuCategoryId === key
          )
        );
      }
    );
  }
}
