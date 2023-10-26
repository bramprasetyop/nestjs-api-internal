import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { InternalAPIService } from 'src/modules/external/internalAPI.service';
import { OrganizationUser } from '../dto/user.dto';
import { UserMapper } from '../mappers/user.mapper';
import { OrganizationUserRepository } from '../repositories/organizationUser.repository';
import { XOrganizationUserWahyooUserRepository } from '../repositories/xOrganizationUserWahyooUser.repository';

@Injectable()
export class OrganizationUserGetByIdUseCase implements IUseCase {
  constructor(
    private readonly repository: OrganizationUserRepository,
    private internalAPIService: InternalAPIService,
    private readonly xOrganizationUserWahyooUserRepository: XOrganizationUserWahyooUserRepository
  ) {}
  async execute(id: string): Promise<OrganizationUser> {
    const organizationUser = await this.repository.findById(id);
    if (!organizationUser) {
      throw new NotFoundException(id);
    }
    return UserMapper.modelToDTO(organizationUser);
  }
}
