import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { BusinessPaymentType } from './dto/businessPaymentType.dto';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessPaymentTypeRepository } from './repositories/businessPaymentType.repository';
import { BusinessPaymentTypeModel } from '@wahyoo/wahyoo-shared';
import { BusinessPaymentTypeMapper } from './mappers/businessPaymentType.mapper';

@Injectable()
export class BusinessPaymentTypeSingleByIdLoader
  implements NestDataLoader<string, BusinessPaymentType> {
  constructor(private readonly repository: BusinessPaymentTypeRepository) {}
  generateDataLoader(): DataLoader<string, BusinessPaymentType> {
    return new DataLoader<string, BusinessPaymentType>(async keys => {
      const businessPaymentTypees: BusinessPaymentTypeModel[] = await this.repository.findByIds(
        keys as string[]
      );
      const businessPaymentTypeList = BusinessPaymentTypeMapper.modelsToDTOs(
        businessPaymentTypees
      );
      return keys.map(key =>
        businessPaymentTypeList.find(
          businessPaymentType => businessPaymentType.id === key
        )
      );
    });
  }
}
