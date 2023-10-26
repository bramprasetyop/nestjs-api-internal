import DataLoader from 'dataloader';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import { CurrentUser, GqlAuthGuard } from '../auth/auth.jwt.guard';
import { Loader } from 'src/commons/loader';
import { BusinessOutletSingleByIdLoader } from '../businessOutlet/businessOutlet.singleById.loader';
import { BusinessOutlet } from '../businessOutlet/dto/businessOutlet.dto';
import { OrganizationUserBusinessOutlet } from './dto/organizationUserBusinessOutlet.dto';
import { OrganizationUser } from './dto/user.dto';
import { OrganizationUserSingleByIdLoader } from './user.singleById.loader';
import { OrganizationUserBusinessOutletCreateRequest } from './dto/organizationUserBusinessOutletCreateRequest.dto';
import { OrganizationUserBusinessOutletGetListRequest } from './dto/organizationUserBusinessOutletGetListRequest.dto';
import { OrganizationUserBusinessOutletGetListResponse } from './dto/organizationUserBusinessOutletGetListResponse.dto';
import { OrganizationUserBusinessOutletUpdateRequest } from './dto/organizationUserBusinessOutletUpdateRequest.dto';
import { OrganizationUserBusinessOutletCreateUseCase } from './useCases/organizationUserBusinessOutlet.create.usecase';
import { OrganizationUserBusinessOutletDeleteUseCase } from './useCases/organizationUserBusinessOutlet.delete.usecase';
import { OrganizationUserBusinessOutletGetByIdUseCase } from './useCases/organizationUserBusinessOutlet.getById.usecase';
import { OrganizationUserBusinessOutletGetListUseCase } from './useCases/organizationUserBusinessOutlet.getList.usecase';
import { OrganizationUserBusinessOutletUpdateUseCase } from './useCases/organizationUserBusinessOutlet.update.usecase';
import { ICurrentUserArgs } from '../auth/repositories/currentUser.interface';
import { OrganizationUserBusinessOutletRolesUseCase } from './useCases/organizationUserBusinessOutletRoles.usecase';
@Resolver(OrganizationUserBusinessOutlet)
export class OrganizationUserBusinessOutletResolver {
  constructor(
    private readonly getListUseCase: OrganizationUserBusinessOutletGetListUseCase,
    private readonly getByIdUseCase: OrganizationUserBusinessOutletGetByIdUseCase,
    private readonly createUseCase: OrganizationUserBusinessOutletCreateUseCase,
    private readonly updateUseCase: OrganizationUserBusinessOutletUpdateUseCase,
    private readonly deleteUseCase: OrganizationUserBusinessOutletDeleteUseCase,
    private readonly getRolesUseCase: OrganizationUserBusinessOutletRolesUseCase
  ) {}

  @Query(() => [String])
  // @UseGuards(GqlAuthGuard)
  async organizationUserBussinessOutletRoles(): Promise<string[]> {
    return this.getRolesUseCase.execute();
  }

  @Query(() => OrganizationUserBusinessOutletGetListResponse)
  @UseGuards(GqlAuthGuard)
  async organizationUserBusinessOutletList(
    @Args() requestDto: OrganizationUserBusinessOutletGetListRequest
  ): Promise<OrganizationUserBusinessOutletGetListResponse> {
    return this.getListUseCase.execute(requestDto);
  }

  @Query(() => OrganizationUserBusinessOutlet)
  @UseGuards(GqlAuthGuard)
  async organizationUserBusinessOutletById(
    @Args('id') id: string
  ): Promise<OrganizationUserBusinessOutlet> {
    return this.getByIdUseCase.execute(id);
  }

  @Mutation(() => OrganizationUserBusinessOutlet)
  @UseGuards(GqlAuthGuard)
  async organizationUserBusinessOutletCreate(
    @Args('input') requestDTO: OrganizationUserBusinessOutletCreateRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<OrganizationUserBusinessOutlet> {
    return this.createUseCase.execute({
      ...requestDTO,
      createdBy: user.id,
      updatedBy: user.id
    });
  }

  @Mutation(() => OrganizationUserBusinessOutlet)
  @UseGuards(GqlAuthGuard)
  async organizationUserBusinessOutletUpdate(
    @Args('input') requestDTO: OrganizationUserBusinessOutletUpdateRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<OrganizationUserBusinessOutlet> {
    return this.updateUseCase.execute({ ...requestDTO, updatedBy: user.id });
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async organizationUserBusinessOutletDelete(
    @Args('id') id: string
  ): Promise<Boolean> {
    return this.deleteUseCase.execute(id);
  }

  @ResolveField(() => OrganizationUser)
  async creator(
    @Parent() organizationUserBusinessOutlet: OrganizationUserBusinessOutlet,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (organizationUserBusinessOutlet.createdBy) {
        const response = await organizationUserSingleByIdLoader.load(
          organizationUserBusinessOutlet.createdBy
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
  async modifier(
    @Parent() organizationUserBusinessOutlet: OrganizationUserBusinessOutlet,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (organizationUserBusinessOutlet.updatedBy) {
        const response = await organizationUserSingleByIdLoader.load(
          organizationUserBusinessOutlet.updatedBy
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
    @Parent() organizationUserBusinessOutlet: OrganizationUserBusinessOutlet,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<string, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      const response = await organizationUserSingleByIdLoader.load(
        organizationUserBusinessOutlet.organizationUserId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // FIELD DATA LOADER
  @ResolveField(() => BusinessOutlet)
  async businessOutlet(
    @Parent() organizationUserBusinessOutlet: OrganizationUserBusinessOutlet,
    @Loader(BusinessOutletSingleByIdLoader.name)
    businessOutletSingleByIdLoader: DataLoader<string, BusinessOutlet>
  ): Promise<BusinessOutlet> {
    try {
      const response = await businessOutletSingleByIdLoader.load(
        organizationUserBusinessOutlet.businessOutletId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
