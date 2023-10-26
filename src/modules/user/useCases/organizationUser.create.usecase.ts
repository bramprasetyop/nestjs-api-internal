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
export class OrganizationUserCreateUseCase implements IUseCase {
  constructor(
    private readonly organizationUserRepository: OrganizationUserRepository,
    private internalAPIService: InternalAPIService
  ) {}
  async execute(dto: OrganizationUserCreateRequest): Promise<OrganizationUser> {
    const { isConnectToWahyooUser, phoneNumber, createdBy } = dto;
    if (createdBy) {
      const creator = await this.organizationUserRepository.findById(createdBy);
      if (!creator) {
        throw new Error(`Tidak dapat menemukan user ${createdBy}`);
      }
    }
    dto.updatedBy = createdBy;
    let organizationUserModel: OrganizationUserModel;
    if (isConnectToWahyooUser) {
      // Verifying phone number
      const user = await this.internalAPIService.getUserByPhoneNumber(
        phoneNumber
      );
      if (!user) {
        throw new Error('User tidak ditemukan');
      }
      dto.xWahyooUserId = user.id;
    }
    organizationUserModel = await this.organizationUserRepository.create(dto);
    return UserMapper.modelToDTO(organizationUserModel);
  }
}
