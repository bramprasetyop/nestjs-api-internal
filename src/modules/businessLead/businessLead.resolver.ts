import {
  Parent,
  Args,
  Mutation,
  ResolveField,
  Query,
  Resolver
} from '@nestjs/graphql';
import { BusinessLeadUpdateRequest } from './dto/businessLeadUpdateRequest.dto';
import { BusinessLeadCreateRequest } from './dto/businessLeadCreateRequest.dto';
import { BusinessLeadClosedRequest } from './dto/businessLeadClosedRequest.dto';
import { BusinessLeadGetListRequest } from './dto/businessLeadGetListRequest.dto';
import { BusinessLeadCreateUseCase } from './useCases/businessLead.create.usecase';
import { BusinessLead } from './dto/businessLead.dto';
import { OrganizationUser } from '../user/dto/user.dto';
import { BusinessLeadGetListUseCase } from './useCases/businessLead.getList.usecase';
import { BusinessLeadGetByIdUseCase } from './useCases/businessLead.getById.usecase';
import { BusinessLeadUpdateAsDraftUseCase } from './useCases/businessLead.updateAsDraft.usecase';
import { BusinessLeadUpdateAsPublishedUseCase } from './useCases/businessLead.updateAsPublished.usecase';
import { BusinessLeadClosedUseCase } from './useCases/businessLead.closed.usecase';
import { BusinessLeadListResponse } from './dto/businessLeadResponse.dto';
import { Business } from '../business/dto/business.dto';
import { Loader } from 'src/commons/loader';
import { BusinessSingleByIdLoader } from '../business/business.singleById.loader';
import { OrganizationUserSingleByIdLoader } from '../user/user.singleById.loader';
import DataLoader = require('dataloader');
import { CurrentUser, GqlAuthGuard } from '../auth/auth.jwt.guard';
import { UseGuards } from '@nestjs/common';
import { PermissionsGuard } from '../auth/auth.permissions.guard';
import { Permissions } from '../auth/auth.permission.decorator';
import { ICurrentUserArgs } from '../auth/repositories/currentUser.interface';
@Resolver(BusinessLead)
export class BusinessLeadResolver {
  constructor(
    private readonly createUseCase: BusinessLeadCreateUseCase,
    private readonly getListUseCase: BusinessLeadGetListUseCase,
    private readonly getByIdUseCase: BusinessLeadGetByIdUseCase,
    private readonly updateAsDraftUseCase: BusinessLeadUpdateAsDraftUseCase,
    private readonly updateAsPublishedUseCase: BusinessLeadUpdateAsPublishedUseCase,
    private readonly closedUseCase: BusinessLeadClosedUseCase
  ) {}

  @Mutation(() => BusinessLead)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_lead:create')
  async businessLeadCreate(
    @Args('input') requestDTO: BusinessLeadCreateRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<BusinessLead> {
    return this.createUseCase.execute({
      ...requestDTO,
      createdBy: user.id
    });
  }

  @Query(() => BusinessLead)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_lead:read')
  async businessLeadById(@Args('id') id: string): Promise<BusinessLead> {
    return this.getByIdUseCase.execute(id);
  }

  @Query(() => BusinessLeadListResponse)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_lead:read')
  async businessLeadList(
    @Args() requestDTO: BusinessLeadGetListRequest
  ): Promise<BusinessLeadListResponse> {
    return this.getListUseCase.execute(requestDTO);
  }

  @Mutation(() => BusinessLead)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_lead:update')
  async businessLeadUpdateAsDraft(
    @Args('input') requestDTO: BusinessLeadUpdateRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<BusinessLead> {
    return this.updateAsDraftUseCase.execute({
      ...requestDTO,
      updatedBy: user.id
    });
  }

  @Mutation(() => BusinessLead)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_lead:update:published')
  async businessLeadUpdateAsPublished(
    @Args('input') requestDTO: BusinessLeadUpdateRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<BusinessLead> {
    return this.updateAsPublishedUseCase.execute({
      ...requestDTO,
      updatedBy: user.id
    });
  }

  @Mutation(() => BusinessLead)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_lead:update:closed')
  async businessLeadCloseById(
    @Args('input') requestDTO: BusinessLeadClosedRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<BusinessLead> {
    return this.closedUseCase.execute({
      ...requestDTO,
      closedBy: user.id
    });
  }

  // FIELD DATA LOADER

  @ResolveField(() => Business)
  async business(
    @Parent() BusinessLead: BusinessLead,
    @Loader(BusinessSingleByIdLoader.name)
    businessSingleByIdLoader: DataLoader<Business['id'], Business>
  ): Promise<Business> {
    try {
      if (BusinessLead.businessId) {
        const response = await businessSingleByIdLoader.load(
          BusinessLead.businessId
        );
        return response;
      }
      return null;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @ResolveField(() => OrganizationUser)
  async publishedByUser(
    @Parent() BusinessLead: BusinessLead,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (BusinessLead.publishedBy) {
        const response = await organizationUserSingleByIdLoader.load(
          BusinessLead.publishedBy
        );
        return response;
      }
      return null;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @ResolveField(() => OrganizationUser)
  async closedByUser(
    @Parent() BusinessLead: BusinessLead,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (BusinessLead.closedBy) {
        const response = await organizationUserSingleByIdLoader.load(
          BusinessLead.closedBy
        );
        return response;
      }
      return null;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @ResolveField(() => OrganizationUser)
  async createdByUser(
    @Parent() BusinessLead: BusinessLead,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (BusinessLead.createdBy) {
        const response = await organizationUserSingleByIdLoader.load(
          BusinessLead.createdBy
        );
        return response;
      }
      return null;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @ResolveField(() => OrganizationUser)
  async updatedByUser(
    @Parent() BusinessLead: BusinessLead,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (BusinessLead.updatedBy) {
        const response = await organizationUserSingleByIdLoader.load(
          BusinessLead.updatedBy
        );
        return response;
      }
      return null;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
