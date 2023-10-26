import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Loader } from 'src/commons/loader';
import { Business } from 'src/modules/business/dto/business.dto';
import { CurrentUser, GqlAuthGuard } from '../auth/auth.jwt.guard';
import { BusinessSingleByIdLoader } from '../business/business.singleById.loader';
import { OrganizationUser } from './dto/user.dto';
import { OrganizationUserBusinessCreateUseCase } from './useCases/organizationUserBusiness.create.usecase';
import { OrganizationUserBusinessDeleteUseCase } from './useCases/organizationUserBusiness.delete.usecase';
import { OrganizationUserBusinessGetByIdUseCase } from './useCases/organizationUserBusiness.getById.usecase';
import { OrganizationUserBusinessGetListUseCase } from './useCases/organizationUserBusiness.getList.usecase';
import { OrganizationUserBusinessUpdateUseCase } from './useCases/organizationUserBusiness.update.usecase';
import { OrganizationUserBusiness } from './dto/organizationUserBusiness.dto';
import { OrganizationUserBusinessGetListResponse } from './dto/organizationUserBusinessGetListResponse.dto';
import { OrganizationUserBusinessGetListRequest } from './dto/organizationUserBusinessGetListRequest.dto';
import { OrganizationUserBusinessCreateRequest } from './dto/organizationUserBusinessCreateRequest.dto';
import { OrganizationUserBusinessUpdateRequest } from './dto/organizationUserBusinessUpdateRequest.dto';
import { OrganizationUserSingleByIdLoader } from './user.singleById.loader';
import { ICurrentUserArgs } from '../auth/repositories/currentUser.interface';
import { OrganizationUserBusinessRolesUseCase } from './useCases/organizationUserBusinessRoles.usecase';

@Resolver(OrganizationUserBusiness)
export class OrganizationUserBusinessResolver {
  constructor(
    private readonly getListUseCase: OrganizationUserBusinessGetListUseCase,
    private readonly getByIdUseCase: OrganizationUserBusinessGetByIdUseCase,
    private readonly createUseCase: OrganizationUserBusinessCreateUseCase,
    private readonly updateUseCase: OrganizationUserBusinessUpdateUseCase,
    private readonly deleteUseCase: OrganizationUserBusinessDeleteUseCase,
    private readonly getRolesUseCase: OrganizationUserBusinessRolesUseCase
  ) {}

  @Query(() => [String])
  @UseGuards(GqlAuthGuard)
  async organizationUserBussinessRoles(): Promise<string[]> {
    return this.getRolesUseCase.execute();
  }

  @Query(() => OrganizationUserBusinessGetListResponse)
  @UseGuards(GqlAuthGuard)
  async organizationUserBusinessList(
    @Args() requestDto: OrganizationUserBusinessGetListRequest
  ): Promise<OrganizationUserBusinessGetListResponse> {
    return this.getListUseCase.execute(requestDto);
  }

  @Query(() => OrganizationUserBusiness)
  @UseGuards(GqlAuthGuard)
  async organizationUserBusinessById(
    @Args('id') id: string
  ): Promise<OrganizationUserBusiness> {
    return this.getByIdUseCase.execute(id);
  }

  // Create
  @Mutation(() => OrganizationUserBusiness)
  @UseGuards(GqlAuthGuard)
  async organizationUserBusinessCreate(
    @Args('input') requestDTO: OrganizationUserBusinessCreateRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<OrganizationUserBusiness> {
    return this.createUseCase.execute({
      ...requestDTO,
      createdBy: user.id,
      updatedBy: user.id
    });
  }

  // Update
  @Mutation(() => OrganizationUserBusiness)
  @UseGuards(GqlAuthGuard)
  async organizationUserBusinessUpdate(
    @Args('input') requestDTO: OrganizationUserBusinessUpdateRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<OrganizationUserBusiness> {
    return this.updateUseCase.execute({ ...requestDTO, updatedBy: user.id });
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async organizationUserBusinessDelete(
    @Args('id') id: string
  ): Promise<Boolean> {
    return this.deleteUseCase.execute(id);
  }

  @ResolveField(() => OrganizationUser)
  async creator(
    @Parent() organizationUserBusiness: OrganizationUserBusiness,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (organizationUserBusiness.createdBy) {
        const response = await organizationUserSingleByIdLoader.load(
          organizationUserBusiness.createdBy
        );
        return response;
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  @ResolveField(() => OrganizationUser)
  async modifier(
    @Parent() organizationUserBusiness: OrganizationUserBusiness,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (organizationUserBusiness.updatedBy) {
        const response = await organizationUserSingleByIdLoader.load(
          organizationUserBusiness.updatedBy
        );
        return response;
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  // FIELD DATA LOADER
  @ResolveField(() => OrganizationUser)
  async organizationUser(
    @Parent() organizationUserBusiness: OrganizationUserBusiness,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<string, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (organizationUserBusiness.organizationUserId) {
        const response = await organizationUserSingleByIdLoader.load(
          organizationUserBusiness.organizationUserId
        );
        return response;
      }
      return null;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // FIELD DATA LOADER
  @ResolveField(() => Business)
  async business(
    @Parent() organizationUserBusiness: OrganizationUserBusiness,
    @Loader(BusinessSingleByIdLoader.name)
    businessOutletSingleByIdLoader: DataLoader<string, Business>
  ): Promise<Business> {
    try {
      if (organizationUserBusiness.businessId) {
        const response = await businessOutletSingleByIdLoader.load(
          organizationUserBusiness.businessId
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
