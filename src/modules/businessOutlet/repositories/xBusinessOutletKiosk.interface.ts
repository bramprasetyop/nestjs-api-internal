import { XBusinessOutletKioskModel } from '@wahyoo/wahyoo-shared';

export interface IXBusinessOutletKioskRepository {
  findByByBusinessOutletIds(
    ids: string[]
  ): Promise<XBusinessOutletKioskModel[]>;
}
