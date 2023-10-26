import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessMenuModifierGetListRequest } from '../dto/businessMenuModifierGetListRequest.dto';
import { BusinessMenuModifierGetListResponse } from '../dto/businessMenuModifierGetListResponse.dto';
import { BusinessMenuModifierMapper } from '../mappers/businessMenuModifier.mapper';
import { BusinessMenuModifierRepository } from '../repositories/businessMenuModifier.repository';

@Injectable()
export class BusinessMenuModifierGetListUseCase implements IUseCase {
  constructor(private readonly repository: BusinessMenuModifierRepository) {}
  async execute(
    dto: BusinessMenuModifierGetListRequest
  ): Promise<BusinessMenuModifierGetListResponse> {
    const result = await this.repository.findAll(dto);

    const response: BusinessMenuModifierGetListResponse = {
      businessMenuModifiers: BusinessMenuModifierMapper.modelsToDTOs(
        result.businessMenuModifiers
      ),
      meta: { ...result.meta }
    };
    return response;
  }
}
