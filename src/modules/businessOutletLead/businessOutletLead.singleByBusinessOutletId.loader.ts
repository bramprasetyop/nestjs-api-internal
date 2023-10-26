import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { BusinessOutletLeadModel } from '@wahyoo/wahyoo-shared';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessOutletLeadRepository } from './repositories/businessOutletLead.repository';
import { BusinessOutletLead } from './dto/businessOutletLead.dto';
import { BusinessOutletLeadMapper } from './mappers/businessOutletLead.mapper';

@Injectable()
export class BusinessOutletLeadSingleByBusinessOutletIdLoader
  implements NestDataLoader<string, BusinessOutletLead> {
  constructor(private readonly repository: BusinessOutletLeadRepository) {}
  generateDataLoader(): DataLoader<string, BusinessOutletLead> {
    return new DataLoader<string, BusinessOutletLead>(async keys => {
      const businessOutletLeadModels: BusinessOutletLeadModel[] = await this.repository.findByBusinessOutletIds(
        keys as string[]
      );
      const businessOutletLeadList = BusinessOutletLeadMapper.modelsToDTOs(
        businessOutletLeadModels
      );
      return keys.map(key =>
        businessOutletLeadList.find(
          businessOutletLead => businessOutletLead.businessOutletId === key
        )
      );
    });
  }
}
