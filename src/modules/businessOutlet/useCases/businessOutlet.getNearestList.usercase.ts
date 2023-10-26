import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { Kiosk } from 'src/modules/external/interfaces/kiosk.interface';
import { InternalAPIService } from 'src/modules/external/internalAPI.service';
import { BusinessOutletModel } from '@wahyoo/wahyoo-shared';
import { BusinessOutletNearestListRequest } from '../dto/businessOutletNearestListRequest.dto';
import { BusinessOutletRepository } from '../repositories/businessOutlet.repository';
import { BusinessOutletMapper } from '../mappers/businessOutlet.mapper';
import { BusinessOutlet } from '../dto/businessOutlet.dto';

export interface ResponseNearestList {
  businessOutletModels?: BusinessOutletModel[];
  kiosks?: Kiosk[];
}
@Injectable()
export class BusinessOutletGetNearestListUseCase implements IUseCase {
  constructor(
    private readonly repository: BusinessOutletRepository,
    private internalAPIService: InternalAPIService
  ) {}
  async execute(
    dto: BusinessOutletNearestListRequest
  ): Promise<BusinessOutlet[]> {
    const kiosks = await this.internalAPIService.getKioskNearestList({
      lat: dto.lat,
      lng: dto.lng,
      search: dto.search,
      tags: dto.tags,
      pageSize: dto.pageSize
    });
    if (!kiosks) {
      return [];
    }
    const kioskIds = kiosks.map(kiosk => parseInt(kiosk.id, 10));
    const businessOutletModels = await this.repository.findAllByXWahyooKioskIds(
      kioskIds
    );
    const businessOutletList = BusinessOutletMapper.modelsToDTOs(
      businessOutletModels
    );
    businessOutletList.forEach(dto => {
      const selectedKiosk: Kiosk = kiosks.find(
        kiosk =>
          parseInt(kiosk.id, 10) === dto.xBusinessOutletKiosk.xWahyooKioskId
      );
      if (selectedKiosk) {
        dto.distance = selectedKiosk.distance;
      }
    });
    return businessOutletList;
  }
}
