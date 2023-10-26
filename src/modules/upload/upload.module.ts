import { Module } from '@nestjs/common';
import { GCloudStorageModule } from '@wahyoo/wahyoo-shared';
import { UploadResolver } from './upload.resolver';
import { ReadFileGoogleCloudStorageUseCase } from './useCases/readFileGoogleCloudStorage.usecase';
import { UploadUseCase } from './useCases/upload.usecase';
@Module({
  imports: [],
  providers: [
    GCloudStorageModule,
    UploadResolver,
    ReadFileGoogleCloudStorageUseCase,
    UploadUseCase
  ]
})
export class UploadModule {}
