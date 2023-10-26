import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { BusinessOutletModel } from '@wahyoo/wahyoo-shared';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessOutlet } from './dto/businessOutlet.dto';
import { BusinessOutletMapper } from './mappers/businessOutlet.mapper';
import { BusinessOutletRepository } from './repositories/businessOutlet.repository';

@Injectable()
export class BusinessOutletSingleByIdLoader
  implements NestDataLoader<string, BusinessOutlet> {
  constructor(private readonly repository: BusinessOutletRepository) {}
  generateDataLoader(): DataLoader<string, BusinessOutlet> {
    return new DataLoader<string, BusinessOutlet>(async keys => {
      const BusinessOutlets: BusinessOutletModel[] = await this.repository.findByIds(
        keys as string[]
      );
      const businessOutletList = BusinessOutletMapper.modelsToDTOs(
        BusinessOutlets
      );
      return keys.map(key =>
        businessOutletList.find(businessOutlet => businessOutlet.id === key)
      );
    });
  }
}
