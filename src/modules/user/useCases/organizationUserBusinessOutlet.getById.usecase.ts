import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationUserBusinessOutlet } from '../dto/organizationUserBusinessOutlet.dto';
import { OrganizationUserBusinessOutletMapper } from '../mappers/organizationUserBusinessOutlet.mapper';
import { OrganizationUserBusinessOutletRepository } from '../repositories/organizationUserBusinessOutlet.repository';

@Injectable()
export class OrganizationUserBusinessOutletGetByIdUseCase implements IUseCase {
  constructor(
    private readonly repository: OrganizationUserBusinessOutletRepository
  ) {}
  async execute(id: string): Promise<OrganizationUserBusinessOutlet> {
    const organizationUserBusinessOutlet = await this.repository.findById(id);
    if (!organizationUserBusinessOutlet) {
      throw new NotFoundException(id);
    }
    return OrganizationUserBusinessOutletMapper.modelToDTO(
      organizationUserBusinessOutlet
    );
  }
}
