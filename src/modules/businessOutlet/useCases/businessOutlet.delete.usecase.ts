import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessOutletRepository } from '../repositories/businessOutlet.repository';

@Injectable()
export class BusinessOutletDeleteUseCase implements IUseCase {
  constructor(
    private readonly businessOutletRepository: BusinessOutletRepository
  ) {}
  async execute(id: string): Promise<Boolean> {
    const businessModel = await this.businessOutletRepository.findById(id);
    if (!businessModel) {
      throw new NotFoundException(id);
    }
    return await this.businessOutletRepository.delete(id);
  }
}
