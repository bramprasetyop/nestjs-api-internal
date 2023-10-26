import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UploadAccessType, UploadRequest } from './dto/uploadRequest.dto';
import { UploadUseCase } from './useCases/upload.usecase';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { UploadResponse } from './dto/uploadResponse.dto';
import { ReadFileGoogleCloudStorageResponse } from './dto/readFileGoogleCloudStorageResponse.dto';
import { ReadFileGoogleCloudStorageUseCase } from './useCases/readFileGoogleCloudStorage.usecase';

@Resolver()
export class UploadResolver {
  constructor(
    private readonly uploadUseCase: UploadUseCase,
    private readonly readFileGoogleCloudStorageUseCase: ReadFileGoogleCloudStorageUseCase
  ) {}

  @Mutation(() => UploadResponse)
  // Upload have issue on transform decoration for dto
  // file can't transform properly, so temporary use this ways
  // declare args in resolver on by one
  async uploadSingleFile(
    @Args({ name: 'folder', type: () => String }) folder: string,
    @Args({ name: 'file', type: () => GraphQLUpload }) file: UploadAccessType,
    @Args({ name: 'accessType', type: () => UploadAccessType })
    accessType: FileUpload
  ) {
    const dto: UploadRequest = {
      folder,
      accessType,
      file
    };
    return this.uploadUseCase.execute(dto);
  }

  @Mutation(() => ReadFileGoogleCloudStorageResponse)
  async readFileGoogleCloudStorage(
    @Args({ name: 'urls', type: () => [String] }) urls: string[]
  ) {
    return this.readFileGoogleCloudStorageUseCase.execute(urls);
  }
}
