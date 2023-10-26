import DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessMenuCategory } from './dto/businessMenuCategory.dto';
import { BusinessMenuCategoryModel } from '@wahyoo/wahyoo-shared';
import { BusinessMenuCategoryMapper } from './mappers/businessMenuCategory.mapper';
import { BusinessMenuCategoryRepository } from './repositories/businessMenuCategory.repository';

@Injectable()
export class BusinessMenuCategorySingleByIdLoader
  implements NestDataLoader<string, BusinessMenuCategory> {
  constructor(private readonly repository: BusinessMenuCategoryRepository) {}
  generateDataLoader(): DataLoader<string, BusinessMenuCategory> {
    return new DataLoader<string, BusinessMenuCategory>(async keys => {
      const businessMenuCategories: BusinessMenuCategoryModel[] = await this.repository.findByIds(
        keys as string[]
      );
      const businessMenuCategoryList = BusinessMenuCategoryMapper.modelsToDTOs(
        businessMenuCategories
      );
      return keys.map(key =>
        businessMenuCategoryList.find(
          businessMenuCategory => businessMenuCategory.id === key
        )
      );
    });
  }
}
