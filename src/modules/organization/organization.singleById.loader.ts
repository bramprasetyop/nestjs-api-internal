import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { Organization } from './dto/organization.dto';
import { NestDataLoader } from 'src/commons/loader';
import { OrganizationRepository } from './repositories/organization.repository';
import { OrganizationModel } from '@wahyoo/wahyoo-shared';
import { OrganizationMapper } from './mappers/organization.mapper';

@Injectable()
export class OrganizationSingleByIdLoader
  implements NestDataLoader<string, Organization> {
  constructor(private readonly repository: OrganizationRepository) {}
  generateDataLoader(): DataLoader<string, Organization> {
    return new DataLoader<string, Organization>(async keys => {
      const organizations: OrganizationModel[] = await this.repository.findByIds(
        keys as string[]
      );
      const organizationList = OrganizationMapper.modelsToDTOs(organizations);
      return keys.map(key =>
        organizationList.find(organization => organization.id === key)
      );
    });
  }
}
