import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { ICurrentUserArgs } from 'src/modules/auth/repositories/currentUser.interface';
import {
  SalesOrderSyncStatusInput,
  SalesOrderSyncStatusRequest
} from '../dto/salesOrderSyncStatusRequest.dto';
import {
  SalesOrderSyncStatus,
  SalesOrderSyncStatusResponse
} from '../dto/salesOrderSyncStatusResponse.dto';
import { SalesOrderRepository } from '../repositories/salesOrder.repository';

@Injectable()
export class SalesOrderGetSyncStatusUseCase implements IUseCase {
  constructor(private readonly repository: SalesOrderRepository) {}
  private currentUser: ICurrentUserArgs;
  with(currentUser: ICurrentUserArgs) {
    this.currentUser = currentUser;
    return this;
  }
  private async getSalesOrderSyncStatus(
    salesOrderSyncStatusInput: SalesOrderSyncStatusInput
  ) {
    const salesOrderModel = await this.repository.findByRefId(
      salesOrderSyncStatusInput.refId
    );
    // need mapper?
    if (!salesOrderModel) {
      return new SalesOrderSyncStatus(
        '',
        salesOrderSyncStatusInput.refId,
        false
      );
    }
    const isSynced =
      salesOrderModel.updatedAt >= salesOrderSyncStatusInput.updatedAt;
    return new SalesOrderSyncStatus(
      salesOrderModel.id,
      salesOrderModel.refId,
      isSynced
    );
  }

  async execute(
    input: SalesOrderSyncStatusRequest
  ): Promise<SalesOrderSyncStatusResponse> {
    const salesOrderSyncStatusPromises = input.salesOrderSyncStatusInputs.map(
      salesOrderSyncStatusInput => {
        return this.getSalesOrderSyncStatus(salesOrderSyncStatusInput);
      }
    );
    const salesOrderSyncStatuses = await Promise.all(
      salesOrderSyncStatusPromises
    );
    return new SalesOrderSyncStatusResponse(salesOrderSyncStatuses);
  }
}
