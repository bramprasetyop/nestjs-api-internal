import { BusinessOutletMediaModel } from '@wahyoo/wahyoo-shared';

export interface IBusinessOutletMediaRepository {
  findByBusinessOutletIds(ids: string[]): Promise<BusinessOutletMediaModel[]>;
}
