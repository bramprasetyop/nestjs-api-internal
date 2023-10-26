import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { distanceBetweenGeographicCoordinates } from 'src/commons/utils/geo.utils';
import { BusinessOutletRepository } from 'src/modules/businessOutlet/repositories/businessOutlet.repository';
import { BusinessPropertyRepository } from 'src/modules/businessProperty/repositories/businessProperty.repository';
import { BusinessOutletLeadValidateCoordinateRequest } from '../dto/businessOutletLeadValidateCoordinateRequest.dto';
import { BusinessOutletLeadRepository } from '../repositories/businessOutletLead.repository';

@Injectable()
export class BusinessOutletLeadValidateCoordinateUseCase implements IUseCase {
  constructor(
    private readonly businessOutletLeadRepository: BusinessOutletLeadRepository,
    private readonly businessOutletRepository: BusinessOutletRepository,
    private readonly businessPropertyRepository: BusinessPropertyRepository
  ) {}

  async execute(
    dto: BusinessOutletLeadValidateCoordinateRequest
  ): Promise<boolean> {
    const { lat, lng, businessId } = dto;
    const businessProperty = await this.businessPropertyRepository.findByBusinessId(
      businessId
    );

    const businessOutlets = await this.businessOutletRepository.findAllByBusinessId(
      businessId
    );
    for (const businessOutlet of businessOutlets) {
      const distance = distanceBetweenGeographicCoordinates(
        { lat, lng },
        { lat: businessOutlet.lat, lng: businessOutlet.lng }
      );

      if (distance < businessProperty.minDistanceBetweenOutletsInKm) {
        return false;
      }
    }

    const businessOutletLeads = await this.businessOutletLeadRepository.findAllByBusinessId(
      businessId
    );
    for (const businessOutletLead of businessOutletLeads) {
      const distance = distanceBetweenGeographicCoordinates(
        { lat, lng },
        { lat: businessOutletLead.lat, lng: businessOutletLead.lng }
      );

      if (distance < businessProperty.minDistanceBetweenOutletsInKm) {
        return false;
      }
    }

    return true;
  }
}
