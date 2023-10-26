import {
  BusinessMenuModifierItemModel,
  BusinessMenuModifierModel
} from '@wahyoo/wahyoo-shared';
import { BusinessMenuModifierCreateRequest } from '../dto/businessMenuModifierCreateRequest.dto';
import { BusinessMenuModifierGetListRequest } from '../dto/businessMenuModifierGetListRequest.dto';
import { BusinessMenuModifierUpdateRequest } from '../dto/businessMenuModifierUpdateRequest.dto';

export class PagingBusinessMenuModifierModel {
  businessMenuModifiers: BusinessMenuModifierModel[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}

export interface IBusinessMenuModifierRepository {
  findAll(
    dto: BusinessMenuModifierGetListRequest
  ): Promise<PagingBusinessMenuModifierModel>;
  findById(id: string): Promise<BusinessMenuModifierModel>;
  findBySlug(slug: string): Promise<BusinessMenuModifierModel>;
  findByIds(ids: string[]): Promise<BusinessMenuModifierModel[]>;
  create(
    dto: BusinessMenuModifierCreateRequest
  ): Promise<BusinessMenuModifierModel>;
  update(
    dto: BusinessMenuModifierUpdateRequest
  ): Promise<BusinessMenuModifierModel>;
  destroyById(id: string): Promise<Boolean>;
  menuModifierItemFindByMenuModifierIds(
    ids: string[]
  ): Promise<BusinessMenuModifierItemModel[]>;
}
