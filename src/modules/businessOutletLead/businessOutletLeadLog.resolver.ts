import { UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/auth.jwt.guard';
import { PermissionsGuard } from '../auth/auth.permissions.guard';
import { BusinessOutletLead } from './dto/businessOutletLead.dto';

import { Permissions } from '../auth/auth.permission.decorator';
import DataLoader from 'dataloader';
import { Loader } from 'src/commons/loader';
import { OrganizationUser } from '../user/dto/user.dto';
import { OrganizationUserSingleByIdLoader } from '../user/user.singleById.loader';
import { BusinessOutletLeadGetListResponse } from './dto/businessOutletLeadGetListResponse.dto';
import { BusinessOutletLeadLogGetListResponse } from './dto/businessOutletLeadLogGetListResponse.dto';
import { BusinessOutletLeadLogGetListRequest } from './dto/businessOutletLeadLogGetListRequest.dto';
import { BusinessOutletLeadLogGetListUseCase } from './useCases/businessOutletLeadLog.getList.usecase';
import { BusinessOutletLeadLog } from './dto/businessOutletLeadLog.dto';
import { BusinessOutletLeadSingleByIdLoader } from './businessOutletLead.singleById.loader';

@Resolver(BusinessOutletLeadLog)
export class BusinessOutletLeadLogResolver {
  constructor(
    private readonly businessOutletLeadLogGetListUseCase: BusinessOutletLeadLogGetListUseCase
  ) {}

  @Query(() => BusinessOutletLeadLogGetListResponse)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_outlet_lead.read')
  async businessOutletLeadLogList(
    @Args() requestDTO: BusinessOutletLeadLogGetListRequest
  ): Promise<BusinessOutletLeadGetListResponse> {
    return this.businessOutletLeadLogGetListUseCase.execute(requestDTO);
  }

  //  FIELD DATA LOADER
  @ResolveField(() => BusinessOutletLead)
  async businessOutletLead(
    @Parent() businessOutletLeadLog: BusinessOutletLeadLog,
    @Loader(BusinessOutletLeadSingleByIdLoader.name)
    businessOutletLeadSingleByIdLoader: DataLoader<
      BusinessOutletLead['id'],
      BusinessOutletLead
    >
  ): Promise<BusinessOutletLead> {
    try {
      const response = await businessOutletLeadSingleByIdLoader.load(
        businessOutletLeadLog.businessOutletLeadId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @ResolveField(() => OrganizationUser)
  async modifier(
    @Parent() businessOutletLeadLog: BusinessOutletLeadLog,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (businessOutletLeadLog.updatedBy) {
        const response = await organizationUserSingleByIdLoader.load(
          businessOutletLeadLog.updatedBy
        );
        return response;
      }
      return null;
    } catch (err) {
      throw err;
    }
  }
}
