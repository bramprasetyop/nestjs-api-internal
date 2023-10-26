import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { BusinessOutletLeadRepository } from '../repositories/businessOutletLead.repository';
import { BusinessOutletLeadGenerateNameResponse } from '../dto/businessOutletLeadGenerateNameResponse.dto';
import { BusinessOutletLeadGenerateNameRequest } from '../dto/businessOutletLeadGenerateNameRequest.dto';
import { BusinessRepository } from 'src/modules/business/repositories/business.repository';
import { VillageRepository } from 'src/modules/region/repositories/village.repository';

@Injectable()
export class BusinessOutletLeadGenerateNameUseCase implements IUseCase {
  constructor(
    private readonly repository: BusinessOutletLeadRepository,
    private readonly businessRepository: BusinessRepository,
    private readonly villageRepository: VillageRepository
  ) {}
  async execute(
    dto: BusinessOutletLeadGenerateNameRequest
  ): Promise<BusinessOutletLeadGenerateNameResponse> {
    const result = await this.repository.findOneByBusinessIdAndVillageId(dto);

    let countDuplicateBusinessName = 1;
    let outletName = '';
    let villageName = '';
    let businessName = '';

    if (!result.length) {
      const findVillageById = await this.villageRepository.findOneById(
        dto.villageId
      );
      const findBusinessById = await this.businessRepository.findById(
        dto.businessId
      );
      outletName = `${findBusinessById?.fullName} - ${findVillageById?.name}`;
      return { outletName };
    }

    for (let c = 0; c < result.length; c++) {
      const businessOutletLeadFindDuplicateBusinessArr = result[c];
      businessName =
        businessOutletLeadFindDuplicateBusinessArr?.business?.fullName;
      villageName = businessOutletLeadFindDuplicateBusinessArr?.village?.name;
      if (
        businessOutletLeadFindDuplicateBusinessArr?.name
          .toLowerCase()
          .includes(
            `${businessName.toLowerCase()} - ${villageName.toLowerCase()}`
          )
      ) {
        countDuplicateBusinessName++;
      }
    }

    outletName = `${businessName} - ${villageName}`;
    if (countDuplicateBusinessName > 1) {
      outletName = `${businessName} - ${villageName} ${countDuplicateBusinessName}`;
    }

    return { outletName };
  }
}
