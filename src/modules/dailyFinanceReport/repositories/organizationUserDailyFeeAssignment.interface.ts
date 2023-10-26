import {
  BusinessOutletDailyFinanceReportModel,
  OrganizationUserModel
} from '@wahyoo/wahyoo-shared';
import { BusinessOutletDailyFinanceReportGetListRequest } from '../dto/businessOutletDailyFinanceReportGetListRequest.dto';
import { OrganizationUserDailyFeeAssignment } from '../dto/organizationUserDailyFeeAssignment.dto';
import { OrganizationUserDailyFeeAssignmentGetListRequest } from '../dto/organizationUserDailyFeeAssignmentGetListRequest.dto';

export class PagingOrganizationUserDailyFeeAssignmentModel {
  organizationUserDailyFeeAssignment: OrganizationUserModel[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}

export interface IOrganizationUserDailyFeeAssignmentRepository {
  findAll(
    dto: OrganizationUserDailyFeeAssignmentGetListRequest
  ): Promise<PagingOrganizationUserDailyFeeAssignmentModel>;
  findById(id: string): Promise<OrganizationUserModel>;
}
