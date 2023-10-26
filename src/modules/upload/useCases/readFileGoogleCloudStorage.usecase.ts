import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { GCloudStorageService } from '@wahyoo/wahyoo-shared';
import { ReadFileGoogleCloudStorageResponse } from '../dto/readFileGoogleCloudStorageResponse.dto';

@Injectable()
export class ReadFileGoogleCloudStorageUseCase implements IUseCase {
  constructor(private gCloudStorageService: GCloudStorageService) {}

  async execute(urls: string[]): Promise<ReadFileGoogleCloudStorageResponse> {
    const expiry = new Date(Date.now() + 1000 * 3600 * 5);

    if (urls && urls.length > 0) {
      const promises = [];
      for (let i = 0; i < urls.length; i++) {
        promises.push(this.gCloudStorageService.read({ url: urls[i], expiry }));
      }

      const results = await Promise.all(promises);
      return {
        data: results,
        meta: {
          expiry
        }
      };
    }

    return null;
  }
}
