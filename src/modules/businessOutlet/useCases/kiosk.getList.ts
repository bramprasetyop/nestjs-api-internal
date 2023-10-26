import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { InternalAPIService } from 'src/modules/external/internalAPI.service';
import { KioskGetListRequest } from '../dto/KioskGetListRequest.dto';
import { KioskGetListResponse } from '../dto/KioskGetListResponse.dto';

@Injectable()
export class KioskGetListUseCase implements IUseCase {
  constructor(private internalAPIService: InternalAPIService) {}
  async execute(dto: KioskGetListRequest): Promise<KioskGetListResponse> {
    return this.internalAPIService.getKioskList(dto);
  }
}
