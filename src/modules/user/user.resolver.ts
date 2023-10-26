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
import { CurrentUser, GqlAuthGuard } from '../auth/auth.jwt.guard';
import { ICurrentUserArgs } from '../auth/repositories/currentUser.interface';
import { Organization } from '../organization/dto/organization.dto';
import { OrganizationSingleByIdLoader } from '../organization/organization.singleById.loader';
import { CurrentUserResponse } from './dto/currentUser.dto';
import { OrganizationUserCreateRequest } from './dto/organizationUserCreateRequest.dto';
import { OrganizationUserGetListRequest } from './dto/organizationUserGetListRequest.dto';
import { OrganizationUserGetListResponse } from './dto/organizationUserGetListResponse.dto';
import { OrganizationUserUpdateRequest } from './dto/organizationUserUpdateRequest.dto';
import { OrganizationUserCreateOutletEmployeeRequest } from './dto/organizationUserCreateOutletEmployeeRequest.dto';
import { OrganizationUserUpdateOutletEmployeeRequest } from './dto/organizationUserUpdateOutletEmployeeRequest.dto';
import { OrganizationUser } from './dto/user.dto';
import { WahyooUserCheckResponse } from './dto/wahyooUserCheckResponse.dto';
import { XOrganizationUserWahyooUser } from './dto/xOrganizationUserWahyooUser.dto';
import { OrganizationUserCreateUseCase } from './useCases/organizationUser.create.usecase';
import { OrganizationUserDeleteUseCase } from './useCases/organizationUser.delete.usecase';
import { OrganizationUserGetByIdUseCase } from './useCases/organizationUser.getById.usecase';
import { OrganizationUserGetListUseCase } from './useCases/organizationUser.getList.usecase';
import { OrganizationUserUpdateUseCase } from './useCases/organizationUser.update.usecase';
import { UserCurrentUserUseCase } from './useCases/user.currentUser.usecase';
import { WahyooUserCheckUseCase } from './useCases/user.wahyooUserCheck.usecase';
import { XOrganizationUserWahyooUserSingleByOrganizationUserIdLoader } from './xOrganizationUserWahyooUser.singleByOrganizationUserId.loader';
import { OrganizationUserSingleByIdLoader } from './user.singleById.loader';
import { OrganizationUserRegisterRequest } from './dto/organizationUserRegisterRequest.dto';
import { OrganizationUserRegisterResponse } from './dto/organizationUserRegisterResponse.dto';
import { OrganizationUserRegisterSendOtpRequest } from './dto/organizationUserRegisterSendOtpRequest.dto';
import { OrganizationUserRegisterSendOtpResponse } from './dto/organizationUserRegisterSendOtpResponse.dto';
import { OrganizationUserRegisterUseCase } from './useCases/organizationUser.register.usecase';
import { OrganizationUserRegisterSendOtpUseCase } from './useCases/organizationUser.registerSendOtp.usecase';
import { OrganizationUserGetListOutletEmployeeUseCase } from './useCases/organizationUser.getListOutletEmployee.usecase';
import { OrganizationUserGetOutletEmployeeUseCase } from './useCases/organizationUser.getOutletEmployee.usecase';
import { OrganizationUserCreateOutletEmployeeUseCase } from './useCases/organizationUser.createOutletEmployee.usecase';
import { OrganizationUserUpdateOutletEmployeeUseCase } from './useCases/organizationUser.updateOutletEmployee.usecase';
import { OrganizationUserDeleteOutletEmployeeUseCase } from './useCases/organizationUser.deleteOutletEmployee.usecase';
import { OrganizationUserBusinessOutletBatchByOrganizationUserIdLoader } from './organizationUserBusinessOutlet.batchByOrganizationUserId.loader';
import { OrganizationUserBusinessOutlet } from './dto/organizationUserBusinessOutlet.dto';
import { BusinessOutlet } from '../businessOutlet/dto/businessOutlet.dto';

@Resolver(OrganizationUser)
export class UserResolver {
  constructor(
    private readonly getCurrentUser: UserCurrentUserUseCase,
    private readonly getListUseCase: OrganizationUserGetListUseCase,
    private readonly getByIdUseCase: OrganizationUserGetByIdUseCase,
    private readonly createUseCase: OrganizationUserCreateUseCase,
    private readonly updateUseCase: OrganizationUserUpdateUseCase,
    private readonly deleteUseCase: OrganizationUserDeleteUseCase,
    private readonly registerUseCase: OrganizationUserRegisterUseCase,
    private readonly registerSendOtpUseCase: OrganizationUserRegisterSendOtpUseCase,
    private readonly wahyooUserCheckUseCase: WahyooUserCheckUseCase,
    private readonly getListOutletEmployeeUseCase: OrganizationUserGetListOutletEmployeeUseCase,
    private readonly getOutletEmployeeUseCase: OrganizationUserGetOutletEmployeeUseCase,
    private readonly createOutletEmployeeUseCase: OrganizationUserCreateOutletEmployeeUseCase,
    private readonly updateOutletEmployeeUseCase: OrganizationUserUpdateOutletEmployeeUseCase,
    private readonly deleteOutletEmployeeUseCase: OrganizationUserDeleteOutletEmployeeUseCase
  ) {}

  @Query(() => CurrentUserResponse)
  @UseGuards(GqlAuthGuard)
  async currentUser(
    @CurrentUser() currentUser: ICurrentUserArgs
  ): Promise<CurrentUserResponse> {
    return this.getCurrentUser.with(currentUser).execute(currentUser.id);
  }

  @Query(() => OrganizationUserGetListResponse)
  @UseGuards(GqlAuthGuard)
  async organizationUserList(
    @Args() requestDto: OrganizationUserGetListRequest
  ): Promise<OrganizationUserGetListResponse> {
    return this.getListUseCase.execute(requestDto);
  }

  @Query(() => OrganizationUser)
  @UseGuards(GqlAuthGuard)
  async organizationUserById(
    @Args('id') id: string
  ): Promise<OrganizationUser> {
    return this.getByIdUseCase.execute(id);
  }

  @Query(() => WahyooUserCheckResponse, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async wahyooUserCheck(
    @Args('phoneNumber') phoneNumber: string
  ): Promise<WahyooUserCheckResponse> {
    return this.wahyooUserCheckUseCase.execute(phoneNumber);
  }

  @Query(() => OrganizationUserGetListResponse)
  @UseGuards(GqlAuthGuard)
  async organizationUserListOutletEmployee(
    @Args() requestDto: OrganizationUserGetListRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<OrganizationUserGetListResponse> {
    return this.getListOutletEmployeeUseCase.execute({
      ...requestDto,
      currentUserId: user.id
    });
  }

  @Query(() => OrganizationUser)
  @UseGuards(GqlAuthGuard)
  async organizationUserOutletEmployee(
    @Args('id') id: string,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<OrganizationUser> {
    return this.getOutletEmployeeUseCase.execute({
      id,
      currentUserId: user.id
    });
  }

  @Mutation(() => OrganizationUser)
  @UseGuards(GqlAuthGuard)
  async organizationUserCreate(
    @Args('input') requestDTO: OrganizationUserCreateRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<OrganizationUser> {
    return this.createUseCase.execute({
      ...requestDTO,
      createdBy: user.id,
      updatedBy: user.id
    });
  }

  @Mutation(() => OrganizationUser)
  @UseGuards(GqlAuthGuard)
  async organizationUserUpdate(
    @Args('input') requestDTO: OrganizationUserUpdateRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<OrganizationUser> {
    return this.updateUseCase.execute({ ...requestDTO, updatedBy: user.id });
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async organizationUserDelete(@Args('id') id: string): Promise<Boolean> {
    return this.deleteUseCase.execute(id);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async myAccountDelete(
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<Boolean> {
    return this.deleteUseCase.execute(user.id);
  }

  @Mutation(() => OrganizationUserRegisterResponse)
  async organizationUserRegister(
    @Args('input') requestDTO: OrganizationUserRegisterRequest
  ): Promise<OrganizationUserRegisterResponse> {
    return this.registerUseCase.execute(requestDTO);
  }

  @Mutation(() => OrganizationUserRegisterSendOtpResponse)
  async organizationUserRegisterSendOtp(
    @Args('input') requestDTO: OrganizationUserRegisterSendOtpRequest
  ): Promise<OrganizationUserRegisterSendOtpResponse> {
    return this.registerSendOtpUseCase.execute(requestDTO);
  }

  @Mutation(() => OrganizationUser)
  @UseGuards(GqlAuthGuard)
  async organizationUserCreateOutletEmployee(
    @Args('input') requestDTO: OrganizationUserCreateOutletEmployeeRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<OrganizationUser> {
    return this.createOutletEmployeeUseCase.execute({
      ...requestDTO,
      createdBy: user.id,
      updatedBy: user.id
    });
  }

  @Mutation(() => OrganizationUser)
  @UseGuards(GqlAuthGuard)
  async organizationUserUpdateOutletEmployee(
    @Args('input') requestDTO: OrganizationUserUpdateOutletEmployeeRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<OrganizationUser> {
    return this.updateOutletEmployeeUseCase.execute({
      ...requestDTO,
      updatedBy: user.id
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async organizationUserDeleteOutletEmployee(
    @Args('id') id: string,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<Boolean> {
    return this.deleteOutletEmployeeUseCase.execute({ id, deletedBy: user.id });
  }

  // RESOLVER FIELD
  // this resolver only for parent Organization User,
  // if parent is CurrentUserResponse, will not match as loader
  @ResolveField(() => [BusinessOutlet])
  async businessOutlets(
    @Parent() organizationUser: OrganizationUser,
    @Loader(OrganizationUserBusinessOutletBatchByOrganizationUserIdLoader.name)
    organizationUserBusinessOutletBatchByOrganizationUserIdLoader: DataLoader<
      string,
      OrganizationUserBusinessOutlet[]
    >
  ): Promise<BusinessOutlet[]> {
    try {
      const organizationUserBusinessOutletDtoList = await organizationUserBusinessOutletBatchByOrganizationUserIdLoader.load(
        organizationUser.id
      );
      const businessOutletDtoList: BusinessOutlet[] = organizationUserBusinessOutletDtoList.map(
        el => el.businessOutlet
      );
      return businessOutletDtoList;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // FIELD DATA LOADER
  @ResolveField(() => XOrganizationUserWahyooUser)
  async xOrganizationUserWahyooUser(
    @Parent() organizationUser: OrganizationUser,
    @Loader(XOrganizationUserWahyooUserSingleByOrganizationUserIdLoader.name)
    xOrganizationUserWahyooUserSingleByOrganizationUserIdLoader: DataLoader<
      string,
      XOrganizationUserWahyooUser
    >
  ): Promise<XOrganizationUserWahyooUser> {
    try {
      const response = await xOrganizationUserWahyooUserSingleByOrganizationUserIdLoader.load(
        organizationUser.id
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // FIELD DATA LOADER
  @ResolveField(() => Organization)
  async organization(
    @Parent() organizationUser: OrganizationUser,
    @Loader(OrganizationSingleByIdLoader.name)
    organizationSingleByIdLoader: DataLoader<string, Organization>
  ): Promise<Organization> {
    try {
      const response = await organizationSingleByIdLoader.load(
        organizationUser.organizationId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @ResolveField(() => OrganizationUser)
  async creator(
    @Parent() organizationUser: OrganizationUser,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (organizationUser.createdBy) {
        const response = await organizationUserSingleByIdLoader.load(
          organizationUser.createdBy
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
    @Parent() organizationUser: OrganizationUser,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (organizationUser.updatedBy) {
        const response = await organizationUserSingleByIdLoader.load(
          organizationUser.updatedBy
        );
        return response;
      }
      return null;
    } catch (err) {
      throw err;
    }
  }
}
