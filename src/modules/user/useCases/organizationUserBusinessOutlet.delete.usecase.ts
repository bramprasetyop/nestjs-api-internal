import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationUserBusinessOutletRepository } from '../repositories/organizationUserBusinessOutlet.repository';

@Injectable()
export class OrganizationUserBusinessOutletDeleteUseCase implements IUseCase {
  constructor(
    private readonly repository: OrganizationUserBusinessOutletRepository
  ) {}

  async execute(id: string): Promise<Boolean> {
    const organizationUserBusinessOutlet = await this.repository.findById(id);
    if (!organizationUserBusinessOutlet) {
      throw new NotFoundException(id);
    }
    return await this.repository.delete(id);
  }
}
