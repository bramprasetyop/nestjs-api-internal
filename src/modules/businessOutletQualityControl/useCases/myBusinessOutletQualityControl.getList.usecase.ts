import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationUserRole } from 'src/modules/auth/auth.constants';
import { ICurrentUserArgs } from 'src/modules/auth/repositories/currentUser.interface';
import { OrganizationUserBusinessOutletRepository } from 'src/modules/user/repositories/organizationUserBusinessOutlet.repository';
import { BusinessOutletQualityControlGetListResponse } from '../dto/businessOutletQualityControlGetListResponse.dto';
import { MyBusinessOutletQualityControlGetListRequest } from '../dto/myBusinessOutletQualityControlGetListRequest.dto';
import { BusinessOutletQualityControlMapper } from '../mappers/businessOutletQualityControl.mapper';
import { BusinessOutletQualityControlRepository } from '../repositories/businessOutletQualityControl.repository';

@Injectable()
export class MyBusinessOutletQualityControlGetListUseCase implements IUseCase {
  constructor(
    private readonly businessOutletQualityControlRepository: BusinessOutletQualityControlRepository,
    private readonly organizationUserBusinessOutletRepository: OrganizationUserBusinessOutletRepository
  ) {}

  private currentUser: ICurrentUserArgs;
  with(currentUser: ICurrentUserArgs) {
    this.currentUser = currentUser;
    return this;
  }

  async execute(
    dto: MyBusinessOutletQualityControlGetListRequest
  ): Promise<BusinessOutletQualityControlGetListResponse> {
    if (!dto.filter) {
      dto.filter = {};
    }

    // default filter use organizationUserId
    dto.filter.organizationUserId = this.currentUser.id;

    // if have role outlet_employee_qc then should find related businessOutletIds
    if (
      this.currentUser.roles.includes(OrganizationUserRole.OUTLET_EMPLOYEE_QC)
    ) {
      dto.filter.organizationUserId = null;
      const organizationUserBusinessOutlets = await this.organizationUserBusinessOutletRepository.findAllByRoleAndOrganizationUserId(
        {
          organizationUserId: this.currentUser.id,
          role: OrganizationUserRole.OUTLET_EMPLOYEE_QC
        }
      );
      const businessOutletIds = organizationUserBusinessOutlets.map(
        organizationUserBusinessOutlet =>
          organizationUserBusinessOutlet.businessOutletId
      );
      dto.filter.businessOutletIds = businessOutletIds;
    }

    // for safety, should clone object, because function this.businessOutletQualityControlRepository.findAll have diferrent parameter type
    // other way can use inheritance method
    const result = await this.businessOutletQualityControlRepository.findAll({
      ...dto
    });
    const response: BusinessOutletQualityControlGetListResponse = {
      businessOutletQualityControls: BusinessOutletQualityControlMapper.modelsToDTOs(
        result.businessOutletQualityControls
      ),
      meta: { ...result.meta }
    };
    return response;
  }
}
