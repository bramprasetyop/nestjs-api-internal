import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { SalesOrderRepository } from '../repositories/salesOrder.repository';
import { SalesOrder } from '../dto/salesOrder.dto';
import { SalesOrderMapper } from '../mappers/salesOrder.mapper';
import { ICurrentUserArgs } from 'src/modules/auth/repositories/currentUser.interface';

@Injectable()
export class SalesOrderGetByIdUseCase implements IUseCase {
  constructor(private readonly repository: SalesOrderRepository) {}

  async execute(id: string): Promise<SalesOrder> {
    const salesOrderModel = await this.repository.findById(id);
    if (!salesOrderModel) {
      throw new NotFoundException(id);
    }
    return SalesOrderMapper.modelToDTO(salesOrderModel);
  }
}
