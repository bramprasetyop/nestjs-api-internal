import { BusinessPropertyModel } from '@wahyoo/wahyoo-shared';

export interface IBusinessPropertyRepository {
  findByBusinessId(businessId: string): Promise<BusinessPropertyModel>;
  findByBusinessIds(ids: string[]): Promise<BusinessPropertyModel[]>;
}
