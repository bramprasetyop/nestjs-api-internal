import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationUserBusinessRepository } from '../repositories/organizationUserBusiness.repository';

@Injectable()
export class OrganizationUserBusinessDeleteUseCase implements IUseCase {
  constructor(
    private readonly repository: OrganizationUserBusinessRepository
  ) {}

  async execute(id: string): Promise<Boolean> {
    const organizationUserBusiness = await this.repository.findById(id);
    if (!organizationUserBusiness) {
      throw new NotFoundException(id);
    }
    return await this.repository.delete(id);
  }
}
