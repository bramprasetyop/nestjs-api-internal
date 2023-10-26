import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessPaymentTypeRepository } from '../repositories/businessPaymentType.repository';

@Injectable()
export class BusinessPaymentTypeDeleteUseCase implements IUseCase {
  constructor(private readonly repository: BusinessPaymentTypeRepository) {}
  async execute(id: string): Promise<Boolean> {
    return this.repository.destroyById(id);
  }
}
