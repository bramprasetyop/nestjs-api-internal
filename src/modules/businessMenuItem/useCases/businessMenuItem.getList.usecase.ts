import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessMenuItemGetListRequest } from '../dto/businessMenuItemGetListRequest.dto';
import { BusinessMenuItemGetListResponse } from '../dto/businessMenuItemGetListResponse.dto';
import { BusinessMenuItemMapper } from '../mappers/businessMenuItem.mapper';
import { BusinessMenuItemRepository } from '../repositories/businessMenuItem.repository';

@Injectable()
export class BusinessMenuItemGetListUseCase implements IUseCase {
  constructor(private readonly repository: BusinessMenuItemRepository) {}
  async execute(
    dto: BusinessMenuItemGetListRequest
  ): Promise<BusinessMenuItemGetListResponse> {
    const result = await this.repository.findAll(dto);

    const response: BusinessMenuItemGetListResponse = {
      businessMenuItems: BusinessMenuItemMapper.modelsToDTOs(
        result.businessMenuItems
      ),
      meta: { ...result.meta }
    };
    return response;
  }
}
