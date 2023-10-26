import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessOutletMediaModel } from '@wahyoo/wahyoo-shared';
import { BusinessOutletMedia } from './dto/businessOutletMedia.dto';
import { BusinessOutletMediaRepository } from './repositories/businessOutletMedia.repository';
import { BusinessOutletMediaMapper } from './mappers/businessOutletMedia.mapper';

@Injectable()
export class BusinessOutletMediaBatchByBusinessOutletIdLoader
  implements NestDataLoader<string, BusinessOutletMedia[]> {
  constructor(private readonly repository: BusinessOutletMediaRepository) {}
  generateDataLoader(): DataLoader<string, BusinessOutletMedia[]> {
    return new DataLoader<string, BusinessOutletMedia[]>(async keys => {
      const businessOutletMedias: BusinessOutletMediaModel[] = await this.repository.findByBusinessOutletIds(
        keys as string[]
      );
      const businessOutletMediaList = BusinessOutletMediaMapper.modelsToDTOs(
        businessOutletMedias
      );
      return keys.map(key =>
        businessOutletMediaList.filter(
          businessOutletMedia => businessOutletMedia.businessOutletId === key
        )
      );
    });
  }
}
