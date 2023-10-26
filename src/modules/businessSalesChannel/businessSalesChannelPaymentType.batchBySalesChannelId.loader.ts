import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { BusinessSalesChannelPaymentType } from './dto/businessSalesChannelPaymentType.dto';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessSalesChannelRepository } from './repositories/businessSalesChannel.repository';
import { BusinessSalesChannelPaymentTypeModel } from '@wahyoo/wahyoo-shared';
import { BusinessSalesChannelPaymentTypeMapper } from './mappers/businessSalesChannelPaymentType.mapper';

@Injectable()
export class BusinessSalesChannelPaymentTypeBatchByBusinessSalesChannelIdLoader
  implements NestDataLoader<string, BusinessSalesChannelPaymentType[]> {
  constructor(private readonly repository: BusinessSalesChannelRepository) {}
  generateDataLoader(): DataLoader<string, BusinessSalesChannelPaymentType[]> {
    return new DataLoader<string, BusinessSalesChannelPaymentType[]>(
      async keys => {
        const businessSalesChannelPaymentTypes: BusinessSalesChannelPaymentTypeModel[] = await this.repository.paymentTypeFindBySalesChannelIds(
          keys as string[]
        );
        const businessSalesChannelPaymentTypeList = BusinessSalesChannelPaymentTypeMapper.modelsToDTOs(
          businessSalesChannelPaymentTypes
        );
        return keys.map(key =>
          businessSalesChannelPaymentTypeList.filter(
            businessSalesChannelPaymentType =>
              businessSalesChannelPaymentType.businessSalesChannelId === key
          )
        );
      }
    );
  }
}
