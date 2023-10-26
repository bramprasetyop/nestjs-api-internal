import { IUseCase } from 'src/commons/useCase.interface';
import { Injectable } from '@nestjs/common';
import { BusinessRepository } from '../repositories/business.repository';

@Injectable()
export class BusinessDeleteUseCase implements IUseCase {
  constructor(private readonly repository: BusinessRepository) {}
  async execute(id: string): Promise<Boolean> {
    return this.repository.destroyById(id);
  }
}
