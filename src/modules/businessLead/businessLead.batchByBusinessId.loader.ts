import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { BusinessLead } from './dto/businessLead.dto';
import { NestDataLoader } from 'src/commons/loader';
import { BusinessLeadRepository } from './repositories/businessLead.repository';
import { BusinessLeadModel } from '@wahyoo/wahyoo-shared';
import { BusinessLeadMapper } from './mappers/businessLead.mapper';

@Injectable()
export class BusinessLeadBatchByBusinessIdLoader
  implements NestDataLoader<string, BusinessLead[]> {
  constructor(private readonly repository: BusinessLeadRepository) {}
  generateDataLoader(): DataLoader<string, BusinessLead[]> {
    return new DataLoader<string, BusinessLead[]>(async keys => {
      const businessLead: BusinessLeadModel[] = await this.repository.findByBusinessIds(
        keys as string[]
      );
      const businessLeadList = BusinessLeadMapper.modelsToDTOs(businessLead);
      return keys.map(key =>
        businessLeadList.filter(businessLead => businessLead.businessId === key)
      );
    });
  }
}
