import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { GCloudStorageService } from '@wahyoo/wahyoo-shared';
import { UploadAccessType, UploadRequest } from '../dto/uploadRequest.dto';
import { UploadResponse } from '../dto/uploadResponse.dto';

@Injectable()
export class UploadUseCase implements IUseCase {
  constructor(private gCloudStorageService: GCloudStorageService) {}

  async execute(dto: UploadRequest): Promise<UploadResponse> {
    const url = await this.gCloudStorageService.upload({
      file: dto.file,
      folder: dto.folder,
      isPublic: dto.accessType === UploadAccessType.public ? true : false
    });
    const response: UploadResponse = {
      url
    };
    return response;
  }
}
