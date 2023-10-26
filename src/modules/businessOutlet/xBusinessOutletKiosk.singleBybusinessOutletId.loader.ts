import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { XBusinessOutletKioskModel } from '@wahyoo/wahyoo-shared';
import { NestDataLoader } from 'src/commons/loader';
import { XBusinessOutletKiosk } from './dto/xBusinessOutletKiosk.dto';
import { XBusinessOutletKioskMapper } from './mappers/xBusinessOutletKiosk.mapper';
import { XBusinessOutletKioskRepository } from './repositories/xBusinessOutletKiosk.repository';

@Injectable()
export class XBusinessOutletKioskSingleByBusinessOutletIdLoader
  implements NestDataLoader<string, XBusinessOutletKiosk> {
  constructor(private readonly repository: XBusinessOutletKioskRepository) {}
  generateDataLoader(): DataLoader<string, XBusinessOutletKiosk> {
    return new DataLoader<string, XBusinessOutletKiosk>(async keys => {
      const xBusinessOutletKiosks: XBusinessOutletKioskModel[] = await this.repository.findByByBusinessOutletIds(
        keys as string[]
      );
      const xBusinessOutletKioskList = XBusinessOutletKioskMapper.modelsToDTOs(
        xBusinessOutletKiosks
      );
      return keys.map(key =>
        xBusinessOutletKioskList.find(
          xBusinessOutletKiosk => xBusinessOutletKiosk.businessOutletId === key
        )
      );
    });
  }
}
