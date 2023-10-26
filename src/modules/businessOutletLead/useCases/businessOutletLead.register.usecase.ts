import { Injectable } from '@nestjs/common';
import {
  BusinessOutletLeadNotificationService,
  BusinessOutletLeadOngoingStatus
} from '@wahyoo/wahyoo-shared';
import { IUseCase } from 'src/commons/useCase.interface';
import { distanceBetweenGeographicCoordinates } from 'src/commons/utils/geo.utils';
import { ICurrentUserArgs } from 'src/modules/auth/repositories/currentUser.interface';
import { BusinessOutletRepository } from 'src/modules/businessOutlet/repositories/businessOutlet.repository';
import { BusinessPropertyRepository } from 'src/modules/businessProperty/repositories/businessProperty.repository';
import { BusinessOutletLead } from '../dto/businessOutletLead.dto';
import { BusinessOutletLeadRegisterRequest } from '../dto/businessOutletLeadRegisterRequest.dto';
import { BusinessOutletLeadMapper } from '../mappers/businessOutletLead.mapper';
import { BusinessOutletLeadRepository } from '../repositories/businessOutletLead.repository';
import { InternalAPIService } from 'src/modules/external/internalAPI.service';

@Injectable()
export class BusinessOutletLeadRegisterUsecase implements IUseCase {
  constructor(
    private readonly businessOutletLeadRepository: BusinessOutletLeadRepository,
    private readonly businessPropertyRepository: BusinessPropertyRepository,
    private readonly businessOutletRepository: BusinessOutletRepository,
    private internalAPIService: InternalAPIService,
    private businessOutletLeadNotification: BusinessOutletLeadNotificationService
  ) {}

  private currentUser: ICurrentUserArgs;
  with(currentUser: ICurrentUserArgs) {
    this.currentUser = currentUser;
    return this;
  }

  async execute(
    dto: BusinessOutletLeadRegisterRequest
  ): Promise<BusinessOutletLead> {
    dto.organizationUserId = this.currentUser.id;
    dto.organizationId = this.currentUser.organizationId;
    dto.updatedBy = this.currentUser.id;

    const { lat, lng, businessId } = dto;

    let totalIntersectionPct = 0;

    // check intersection with existing outlets
    const businessOutlets = await this.businessOutletRepository.findAllByBusinessId(
      businessId
    );
    const businessProperty = await this.businessPropertyRepository.findByBusinessId(
      businessId
    );
    for (const businessOutlet of businessOutlets) {
      const distance = distanceBetweenGeographicCoordinates(
        { lat, lng },
        { lat: businessOutlet.lat, lng: businessOutlet.lng }
      );

      const intersectionPct =
        (1 - distance / businessProperty.intersectionDistanceDividerInKm) * 100;
      if (intersectionPct > 0) {
        totalIntersectionPct += intersectionPct;
      }
    }

    // check intersection with leads which already passed 'location_approved'
    const businessOutletLeads = await this.businessOutletLeadRepository.findAllForCalculateLocationIntersection(
      businessId
    );
    for (const businessOutletLead of businessOutletLeads) {
      const distance = distanceBetweenGeographicCoordinates(
        { lat, lng },
        { lat: businessOutletLead.lat, lng: businessOutletLead.lng }
      );

      const intersectionPct =
        (1 - distance / businessProperty.intersectionDistanceDividerInKm) * 100;
      if (intersectionPct > 0) {
        totalIntersectionPct += intersectionPct;
      }
    }

    // check is inside wahyoo delivery coverage
    const orderDeliveryTimeWindows = await this.internalAPIService.getOrderDeliveryTimeWindowCoverageListByLatLng(
      lat,
      lng
    );

    // check is auto-approved?
    if (totalIntersectionPct <= 30 && orderDeliveryTimeWindows.length > 0) {
      dto.ongoingStatus = BusinessOutletLeadOngoingStatus.location_approved;
      dto.notes = 'Auto-approved by system';
    }

    // create new lead
    const businessOutletLead = await this.businessOutletLeadRepository.create(
      dto
    );

    //send notification to admin
    this.businessOutletLeadNotification.notifyAdmin(businessOutletLead);
    return BusinessOutletLeadMapper.modelToDTO(businessOutletLead);
  }
}
