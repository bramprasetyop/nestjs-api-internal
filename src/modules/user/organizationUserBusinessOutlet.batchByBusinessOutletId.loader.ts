import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { OrganizationUserBusinessOutlet } from './dto/organizationUserBusinessOutlet.dto';
import { NestDataLoader } from 'src/commons/loader';
import { OrganizationUserBusinessOutletModel } from '@wahyoo/wahyoo-shared';
import { OrganizationUserBusinessOutletRepository } from './repositories/organizationUserBusinessOutlet.repository';
import { OrganizationUserBusinessOutletMapper } from './mappers/organizationUserBusinessOutlet.mapper';

@Injectable()
export class OrganizationUserBusinessOutletBatchByBusinessOutletIdLoader
  implements NestDataLoader<string, OrganizationUserBusinessOutlet[]> {
  constructor(
    private readonly repository: OrganizationUserBusinessOutletRepository
  ) {}
  generateDataLoader(): DataLoader<string, OrganizationUserBusinessOutlet[]> {
    return new DataLoader<string, OrganizationUserBusinessOutlet[]>(
      async keys => {
        const OrganizationUserBusinessOutlets: OrganizationUserBusinessOutletModel[] = await this.repository.findByBusinessOutletIds(
          keys as string[]
        );
        const OrganizationUserBusinessOutletList = OrganizationUserBusinessOutletMapper.modelsToDTOs(
          OrganizationUserBusinessOutlets
        );
        return keys.map(key =>
          OrganizationUserBusinessOutletList.filter(
            organizationUserBusinessOutlet =>
              organizationUserBusinessOutlet.businessOutletId === key
          )
        );
      }
    );
  }
}
