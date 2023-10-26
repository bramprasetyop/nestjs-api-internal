import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { InternalAPIService } from 'src/modules/external/internalAPI.service';
import {
  WahyooUserCheckResponse,
  WahyooUserCheckResponseModel
} from '../dto/wahyooUserCheckResponse.dto';

@Injectable()
export class WahyooUserCheckUseCase implements IUseCase {
  constructor(private internalAPIService: InternalAPIService) {}
  async execute(phoneNumber: string): Promise<WahyooUserCheckResponse> {
    if (!phoneNumber) {
      return null;
    }

    // search valid when phoneNumber more than 8 digit
    if (phoneNumber.length < 8) {
      return null;
    }

    const user = await this.internalAPIService.getUserByPhoneNumber(
      phoneNumber
    );
    if (!user) return null;
    const dto: WahyooUserCheckResponseModel = {
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      countryCode: user.countryCode
    };
    return dto;
  }
}
