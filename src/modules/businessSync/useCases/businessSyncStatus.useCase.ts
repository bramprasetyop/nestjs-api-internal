import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessSyncLogStatusRequest } from '../dto/businessSyncLogStatusRequest.dto';
import { BusinessSyncLogStatusResponse } from '../dto/businessSyncLogStatusResponse.dto';
import { BusinessSyncLogRepository } from '../repositories/businessSyncLog.repository';

@Injectable()
export class BusinessSyncStatusUseCase implements IUseCase {
  constructor(private readonly repository: BusinessSyncLogRepository) {}
  async execute(
    dto: BusinessSyncLogStatusRequest
  ): Promise<BusinessSyncLogStatusResponse> {
    const serverBusinessSyncLog = await this.repository.findLast(dto);
    if (!dto.lastBusinessSyncLogId) {
      return {
        shouldSync: true,
        lastBusinessSyncLog: serverBusinessSyncLog
      };
    }

    const clientBusinessSyncLog = await this.repository.findById(
      dto.lastBusinessSyncLogId
    );
    if (
      clientBusinessSyncLog &&
      serverBusinessSyncLog.createdAt > clientBusinessSyncLog.createdAt
    ) {
      return {
        shouldSync: true,
        lastBusinessSyncLog: serverBusinessSyncLog
      };
    }

    return {
      shouldSync: false,
      lastBusinessSyncLog: serverBusinessSyncLog
    };
  }
}
