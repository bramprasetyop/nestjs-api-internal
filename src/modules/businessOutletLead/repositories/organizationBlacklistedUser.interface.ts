import {
  BusinessOutletLeadLogModel,
  BusinessOutletLeadMediaModel,
  BusinessOutletLeadModel
} from '@wahyoo/wahyoo-shared';
import { OrganizationUser } from 'src/modules/user/dto/user.dto';
import { BusinessOutletLeadLogGetListRequest } from '../dto/businessOutletLeadLogGetListRequest.dto';

export interface IOrganizationBlacklistedUserRepository {
  isOrganizationBlacklistedUser(organizationUserId): Promise<boolean>;
}
