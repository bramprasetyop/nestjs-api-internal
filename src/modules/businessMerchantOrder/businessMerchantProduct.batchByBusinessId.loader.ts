import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { BusinessMerchantProductModel } from '@wahyoo/wahyoo-shared';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessMerchantProduct } from './dto/businessMerchantProduct.dto';
import { BusinessMerchantProductMapper } from './mappers/businessMerchantProduct.mapper';
import { BusinessMerchantProductRepository } from './repositories/businessMerchantProduct.repository';

@Injectable()
export class BusinessMerchantProductBatchByBusinessIdLoader
  implements NestDataLoader<string, BusinessMerchantProduct[]> {
  constructor(private readonly repository: BusinessMerchantProductRepository) {}
  generateDataLoader(): DataLoader<string, BusinessMerchantProduct[]> {
    return new DataLoader<string, BusinessMerchantProduct[]>(async keys => {
      const businessMerchantProducts: BusinessMerchantProductModel[] = await this.repository.findByBusinessId(
        keys as string[]
      );
      const businessMerchantProductList = BusinessMerchantProductMapper.modelsToDTOs(
        businessMerchantProducts
      );
      return keys.map(key =>
        businessMerchantProductList.filter(
          businessMerchantProduct => businessMerchantProduct.businessId === key
        )
      );
    });
  }
}
