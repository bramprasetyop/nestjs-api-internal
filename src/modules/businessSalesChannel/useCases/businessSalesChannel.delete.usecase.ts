import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessSalesChannelRepository } from '../repositories/businessSalesChannel.repository';

@Injectable()
export class BusinessSalesChannelDeleteUseCase implements IUseCase {
  constructor(private readonly repository: BusinessSalesChannelRepository) {}
  async execute(id: string): Promise<Boolean> {
    return this.repository.destroyById(id);
  }
}
