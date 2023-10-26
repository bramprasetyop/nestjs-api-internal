import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { distanceBetweenGeographicCoordinates } from 'src/commons/utils/geo.utils';
import { BusinessOutletRepository } from 'src/modules/businessOutlet/repositories/businessOutlet.repository';
import { BusinessPropertyRepository } from 'src/modules/businessProperty/repositories/businessProperty.repository';
import { BusinessOutletLeadCalculateLocationIntersectionResponse } from '../dto/businessOutletLeadCalculateLocationIntersectionResponse.dto';
import { BusinessOutletLeadRepository } from '../repositories/businessOutletLead.repository';

@Injectable()
export class BusinessOutletLeadCalculateLocationIntersectionUseCase
  implements IUseCase {
  constructor(
    private readonly businessOutletLeadRepository: BusinessOutletLeadRepository,
    private readonly businessPropertyRepository: BusinessPropertyRepository,
    private readonly businessOutletRepository: BusinessOutletRepository
  ) {}

  async execute(
    businessOutletLeadId: string
  ): Promise<BusinessOutletLeadCalculateLocationIntersectionResponse> {
    const businessOutletLead = await this.businessOutletLeadRepository.findById(
      businessOutletLeadId
    );

    const response: BusinessOutletLeadCalculateLocationIntersectionResponse = {
      totalIntersectionPct: 0,
      intersectionDetails: []
    };

    // check intersection with existing outlets
    const businessOutlets = await this.businessOutletRepository.findAllByBusinessId(
      businessOutletLead.businessId
    );
    const businessProperty = await this.businessPropertyRepository.findByBusinessId(
      businessOutletLead.businessId
    );
    for (const checkedBusinessOutlet of businessOutlets) {
      const distance = distanceBetweenGeographicCoordinates(
        { lat: businessOutletLead.lat, lng: businessOutletLead.lng },
        { lat: checkedBusinessOutlet.lat, lng: checkedBusinessOutlet.lng }
      );

      const intersectionPct =
        (1 - distance / businessProperty.intersectionDistanceDividerInKm) * 100;
      if (intersectionPct > 0) {
        response.totalIntersectionPct += intersectionPct;
        response.intersectionDetails.push({
          name: checkedBusinessOutlet.name,
          intersectionPct
        });
      }
    }

    // check intersection with leads which already passed 'location_approved'
    const businessOutletLeads = await this.businessOutletLeadRepository.findAllForCalculateLocationIntersection(
      businessOutletLead.businessId,
      true,
      businessOutletLead.id
    );
    for (const checkedBusinessOutletLead of businessOutletLeads) {
      const distance = distanceBetweenGeographicCoordinates(
        { lat: businessOutletLead.lat, lng: businessOutletLead.lng },
        {
          lat: checkedBusinessOutletLead.lat,
          lng: checkedBusinessOutletLead.lng
        }
      );

      const intersectionPct =
        (1 - distance / businessProperty.intersectionDistanceDividerInKm) * 100;
      if (intersectionPct > 0) {
        response.totalIntersectionPct += intersectionPct;
        response.intersectionDetails.push({
          name: `[lead] ${checkedBusinessOutletLead.name}`,
          intersectionPct
        });
      }
    }

    return response;
  }
}
