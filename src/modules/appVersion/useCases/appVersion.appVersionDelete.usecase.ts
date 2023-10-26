import { IUseCase } from 'src/commons/useCase.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AppVersionRepository } from '../repositories/appVersion.respository';

@Injectable()
export class AppVersionDeleteUseCase implements IUseCase {
  constructor(private readonly repository: AppVersionRepository) {}
  async execute(id: string): Promise<Boolean> {
    const appVersionFindById = await this.repository.findById(id);
    if (!appVersionFindById) {
      throw new NotFoundException(id);
    }
    const appVersions: Boolean = await this.repository.detele(id);
    return appVersions;
  }
}
