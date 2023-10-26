import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { InternalAPIService } from 'src/modules/external/internalAPI.service';
import { BusinessOutlet } from '../dto/businessOutlet.dto';
import { BusinessOutletMapper } from '../mappers/businessOutlet.mapper';
import { BusinessOutletRepository } from '../repositories/businessOutlet.repository';
import { XBusinessOutletKioskRepository } from '../repositories/xBusinessOutletKiosk.repository';

@Injectable()
export class BusinessOutletGetByIdUseCase implements IUseCase {
  constructor(
    private readonly repository: BusinessOutletRepository,
    private internalAPIService: InternalAPIService,
    private xBusinessOutletKioskRepository: XBusinessOutletKioskRepository
  ) {}
  async execute(id: string): Promise<BusinessOutlet> {
    const businessOutletModel = await this.repository.findById(id);
    if (!businessOutletModel) {
      throw new NotFoundException(id);
    }
    const xBusinessOutletKiosk = await this.xBusinessOutletKioskRepository.findByBusinessOutletId(
      businessOutletModel.id
    );

    const businessOutletDto = BusinessOutletMapper.modelToDTO(
      businessOutletModel
    );
    if (xBusinessOutletKiosk && xBusinessOutletKiosk.xWahyooKioskId) {
      const kiosk = await this.internalAPIService.getKioskById(
        xBusinessOutletKiosk.xWahyooKioskId.toString()
      );
      businessOutletDto.xBusinessOutletKioskName = kiosk.name;
    }

    return businessOutletDto;
  }
}
