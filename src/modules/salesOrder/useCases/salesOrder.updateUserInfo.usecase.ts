import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { SalesOrder } from '../dto/salesOrder.dto';
import { SalesOrderUpdateUserInfoRequest } from '../dto/salesOrderUpdateUserInfoRequest.dto';
import { SalesOrderMapper } from '../mappers/salesOrder.mapper';
import { SalesOrderRepository } from '../repositories/salesOrder.repository';

@Injectable()
export class SalesOrderUpdateUserInfoUseCase implements IUseCase {
  constructor(private readonly salesOrderRepository: SalesOrderRepository) {}

  async execute(dto: SalesOrderUpdateUserInfoRequest): Promise<SalesOrder> {
    const { id } = dto;
    const salesOrder = await this.salesOrderRepository.findById(id);

    if (!salesOrder) {
      throw new Error(`Tidak dapat menemukan Sales Order ${id}`);
    }

    const updatedSalesOrder = await this.salesOrderRepository.update(dto);
    return SalesOrderMapper.modelToDTO(updatedSalesOrder);
  }
}
