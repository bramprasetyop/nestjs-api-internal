import { Module } from '@nestjs/common';
import { InjectionKey, AppVersionsModel } from '@wahyoo/wahyoo-shared';
import { AppVersionResolver } from './appVersion.resolver';
import { AppVersionSingleByIdLoader } from './appVersion.singleByid.loader';
import { AppVersionRepository } from './repositories/appVersion.respository';
import { AppVersionByIdUseCase } from './useCases/appVersion.appVersionById.usecase';
import { AppVersionCreateUseCase } from './useCases/appVersion.appVersionCreate.usecase';
import { AppVersionDeleteUseCase } from './useCases/appVersion.appVersionDelete.usecase';
import { AppVersionFindLatestAppVersionUseCase } from './useCases/appVersion.appVersionFindLatestAppVersion.usecase';
import { AppVersionGetListUseCase } from './useCases/appVersion.appVersionList.usecase';
import { AppVersionUpdateUseCase } from './useCases/appVersion.appVersionUpdate.usecase';

@Module({
  imports: [],
  providers: [
    AppVersionResolver,
    AppVersionGetListUseCase,
    AppVersionByIdUseCase,
    AppVersionRepository,
    AppVersionSingleByIdLoader,
    AppVersionCreateUseCase,
    AppVersionUpdateUseCase,
    AppVersionDeleteUseCase,
    AppVersionFindLatestAppVersionUseCase,
    { provide: InjectionKey.APP_VERSIONS_MODEL, useValue: AppVersionsModel }
  ],
  exports: [AppVersionRepository, AppVersionSingleByIdLoader]
})
export class AppVersionModule {}
