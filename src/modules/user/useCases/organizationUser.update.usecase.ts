import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationUserRepository } from '../repositories/organizationUser.repository';
import { OrganizationUserCreateRequest } from '../dto/organizationUserCreateRequest.dto';
import { OrganizationUser } from '../dto/user.dto';
import { UserMapper } from '../mappers/user.mapper';
import { InternalAPIService } from 'src/modules/external/internalAPI.service';
import { XOrganizationUserWahyooUserRepository } from '../repositories/xOrganizationUserWahyooUser.repository';
import { OrganizationUserModel } from '@wahyoo/wahyoo-shared';
import { OrganizationUserUpdateRequest } from '../dto/organizationUserUpdateRequest.dto';

@Injectable()
export class OrganizationUserUpdateUseCase implements IUseCase {
  constructor(
    private readonly organizationUserRepository: OrganizationUserRepository,
    private internalAPIService: InternalAPIService,
    private readonly xOrganizationUserWahyooUserRepository: XOrganizationUserWahyooUserRepository
  ) {}
  async execute(dto: OrganizationUserUpdateRequest): Promise<OrganizationUser> {
    const { id, updatedBy } = dto;

    if (updatedBy) {
      const modifier = await this.organizationUserRepository.findById(
        updatedBy
      );
      if (!modifier) {
        throw new Error(`Tidak dapat menemukan user ${updatedBy}`);
      }
    }

    const organizationUser = await this.organizationUserRepository.findById(id);

    if (!organizationUser) throw new Error('Organization user tidak ditemukan');

    if (dto.isConnectToWahyooUser) {
      const userFromCurrentPhoneNumber = await this.internalAPIService.getUserByPhoneNumber(
        organizationUser.phoneNumber
      );

      let xOrganizationUserWahyooUser;

      // If userFromCurrentPhoneNumber exists
      if (userFromCurrentPhoneNumber && userFromCurrentPhoneNumber.id) {
        // Check if xOrganizationUserWahyooUser exists
        xOrganizationUserWahyooUser = await this.xOrganizationUserWahyooUserRepository.findOne(
          {
            organizationUserId: id,
            // User from old phone number taken from db
            xWahyooUserId: userFromCurrentPhoneNumber.id
          }
        );

        dto.xOrganizationUserWahyooUserExists = Boolean(
          xOrganizationUserWahyooUser
        );
      }

      // If no xOrganizationUserWahyooUser is set
      if (!xOrganizationUserWahyooUser) {
        // Verifying phone number
        const newXOrganizationUserWahyooUser = await this.internalAPIService.getUserByPhoneNumber(
          dto.phoneNumber
        );
        if (!newXOrganizationUserWahyooUser) {
          throw new Error(
            `User dengan no. telp ${dto.phoneNumber} tidak dapat ditemukan`
          );
        }
        dto.newUserId = newXOrganizationUserWahyooUser.id;
      }
    }

    const updatedOrganizationUser = await this.organizationUserRepository.update(
      dto
    );

    return UserMapper.modelToDTO(updatedOrganizationUser);
  }
}
