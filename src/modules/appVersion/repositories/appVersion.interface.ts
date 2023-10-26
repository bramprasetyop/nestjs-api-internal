import { AppVersionsModel } from '@wahyoo/wahyoo-shared';
import { AppVersionCreateRequest } from '../dto/appVersionCreateRequest.dto';
import { AppVersionListRequest } from '../dto/appVersionListRequest.dto';
import { AppVersionUpdateRequest } from '../dto/appVersionUpdateRequest.tdo';

export class PagingAppVersionModel {
  appVersions: AppVersionsModel[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}

export interface IAppVersionRepository {
  findAll(dto: AppVersionListRequest): Promise<PagingAppVersionModel>;
  findByIds(ids: string[]): Promise<AppVersionsModel[]>;
  findById(id: string): Promise<AppVersionsModel>;
  findByLatestAppVersion(): Promise<AppVersionsModel>;
  create(dto: AppVersionCreateRequest): Promise<AppVersionsModel>;
  update(dto: AppVersionUpdateRequest): Promise<AppVersionsModel>;
  detele(id: string): Promise<Boolean>;
}
