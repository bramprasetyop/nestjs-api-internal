import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessOutletCheckInRequest } from '../dto/businessOutletCheckInRequest.dto';
import { BusinessOutletRepository } from '../repositories/businessOutlet.repository';
import { distanceBetweenGeographicCoordinates } from 'src/commons/utils/geo.utils';

@Injectable()
export class BusinessOutletCheckInUseCase implements IUseCase {
  constructor(
    private readonly businessOutletRepository: BusinessOutletRepository
  ) {}

  async execute(dto: BusinessOutletCheckInRequest): Promise<Boolean> {
    const { businessOutletId, currentLat, currentLng } = dto;

    const businessOutlet = await this.businessOutletRepository.findById(
      businessOutletId
    );
    if (!businessOutlet) {
      throw new NotFoundException(businessOutletId);
    }

    const distanceInKm = distanceBetweenGeographicCoordinates(
      { lat: currentLat, lng: currentLng },
      { lat: businessOutlet.lat, lng: businessOutlet.lng }
    );

    // distance 100 meters from outlet location
    return distanceInKm <= 0.1;
  }
}
