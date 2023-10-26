import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessOutletLeadMediaModel } from '@wahyoo/wahyoo-shared';
import { BusinessOutletLeadMedia } from './dto/businessOutletLeadMedia.dto';
import { BusinessOutletLeadMediaRepository } from './repositories/businessOutletLeadMedia.repository';
import { BusinessOutletLeadMediaMapper } from './mappers/businessOutletLeadMedia.mapper';

@Injectable()
export class BusinessOutletMediaBatchByBusinessOutletLeadIdLoader
  implements NestDataLoader<string, BusinessOutletLeadMedia[]> {
  constructor(private readonly repository: BusinessOutletLeadMediaRepository) {}
  generateDataLoader(): DataLoader<string, BusinessOutletLeadMedia[]> {
    return new DataLoader<string, BusinessOutletLeadMedia[]>(async keys => {
      const businessOutletLeadMedias: BusinessOutletLeadMediaModel[] = await this.repository.findByBusinessOutletLeadIds(
        keys as string[]
      );
      const businessOutletMediaList = BusinessOutletLeadMediaMapper.modelsToDTOs(
        businessOutletLeadMedias
      );
      return keys.map(key =>
        businessOutletMediaList.filter(
          businessOutletLeadMedia =>
            businessOutletLeadMedia.businessOutletLeadId === key
        )
      );
    });
  }
}
