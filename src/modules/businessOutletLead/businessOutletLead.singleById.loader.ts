import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { BusinessOutletLeadModel } from '@wahyoo/wahyoo-shared';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessOutletLeadRepository } from './repositories/businessOutletLead.repository';
import { BusinessOutletLead } from './dto/businessOutletLead.dto';
import { BusinessOutletLeadMapper } from './mappers/businessOutletLead.mapper';

@Injectable()
export class BusinessOutletLeadSingleByIdLoader
  implements NestDataLoader<string, BusinessOutletLead> {
  constructor(private readonly repository: BusinessOutletLeadRepository) {}
  generateDataLoader(): DataLoader<string, BusinessOutletLead> {
    return new DataLoader<string, BusinessOutletLead>(async keys => {
      const BusinessOutlets: BusinessOutletLeadModel[] = await this.repository.findByIds(
        keys as string[]
      );
      const BusinessOutletList = BusinessOutletLeadMapper.modelsToDTOs(
        BusinessOutlets
      );
      return keys.map(key =>
        BusinessOutletList.find(businessOutlet => businessOutlet.id === key)
      );
    });
  }
}
