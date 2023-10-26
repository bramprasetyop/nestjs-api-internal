import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { BusinessSalesChannelPaymentType } from './dto/businessSalesChannelPaymentType.dto';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessSalesChannelPaymentTypeModel } from '@wahyoo/wahyoo-shared';
import { BusinessSalesChannelPaymentTypeMapper } from './mappers/businessSalesChannelPaymentType.mapper';
import { BusinessSalesChannelPaymentTypeRepository } from './repositories/businessSalesChannelPaymentType.repository';

@Injectable()
export class BusinessSalesChannelPaymentTypeBatchByPaymentTypeIdLoader
  implements NestDataLoader<string, BusinessSalesChannelPaymentType[]> {
  constructor(
    private readonly repository: BusinessSalesChannelPaymentTypeRepository
  ) {}
  generateDataLoader(): DataLoader<string, BusinessSalesChannelPaymentType[]> {
    return new DataLoader<string, BusinessSalesChannelPaymentType[]>(
      async keys => {
        const businessSalesChannelPaymentTypes: BusinessSalesChannelPaymentTypeModel[] = await this.repository.findByPaymentTypeIds(
          keys as string[]
        );
        const businessSalesChannelPaymentTypeList = BusinessSalesChannelPaymentTypeMapper.modelsToDTOs(
          businessSalesChannelPaymentTypes
        );
        return keys.map(key =>
          businessSalesChannelPaymentTypeList.filter(
            businessSalesChannelPaymentType =>
              businessSalesChannelPaymentType.businessPaymentTypeId === key
          )
        );
      }
    );
  }
}
