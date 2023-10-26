import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationUserGetListRequest } from '../dto/organizationUserGetListRequest.dto';
import { OrganizationUserGetListResponse } from '../dto/organizationUserGetListResponse.dto';
import { UserMapper } from '../mappers/user.mapper';
import { OrganizationUserRepository } from '../repositories/organizationUser.repository';

@Injectable()
export class OrganizationUserGetListOutletEmployeeUseCase implements IUseCase {
  constructor(private readonly repository: OrganizationUserRepository) {}
  async execute(
    dto: OrganizationUserGetListRequest
  ): Promise<OrganizationUserGetListResponse> {
    const result = await this.repository.findAllOutletEmployee(dto);

    const response: OrganizationUserGetListResponse = {
      organizationUsers: UserMapper.modelsToDTOs(result.organizationUsers),
      meta: { ...result.meta }
    };

    return response;
  }
}
