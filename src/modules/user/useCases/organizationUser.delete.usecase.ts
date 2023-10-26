import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationUserRepository } from '../repositories/organizationUser.repository';
import { OrganizationUserCreateRequest } from '../dto/organizationUserCreateRequest.dto';
import { OrganizationUser } from '../dto/user.dto';
import { UserMapper } from '../mappers/user.mapper';
import { InternalAPIService } from 'src/modules/external/internalAPI.service';
import { XOrganizationUserWahyooUserRepository } from '../repositories/xOrganizationUserWahyooUser.repository';
import { OrganizationUserModel } from '@wahyoo/wahyoo-shared';

@Injectable()
export class OrganizationUserDeleteUseCase implements IUseCase {
  constructor(
    private readonly organizationUserRepository: OrganizationUserRepository,
    private internalAPIService: InternalAPIService
  ) {}
  async execute(id: string): Promise<Boolean> {
    const organizationUser = await this.organizationUserRepository.findById(id);
    if (!organizationUser) throw new Error('Organization user tidak ditemukan');

    const userFromCurrentPhoneNumber = await this.internalAPIService.getUserByPhoneNumber(
      organizationUser.phoneNumber
    );

    return this.organizationUserRepository.delete({
      id,
      xWahyooUserId: userFromCurrentPhoneNumber
        ? userFromCurrentPhoneNumber.id
        : null
    });
  }
}
