import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/auth.jwt.guard';
import { PermissionsGuard } from '../auth/auth.permissions.guard';
import { Permissions } from '../auth/auth.permission.decorator';
import DataLoader from 'dataloader';
import { Loader } from 'src/commons/loader';
import { BusinessOutlet } from '../businessOutlet/dto/businessOutlet.dto';
import { BusinessOutletSingleByIdLoader } from '../businessOutlet/businessOutlet.singleById.loader';
import { BusinessOutletPropertyGetByBusinessOutletIdUseCase } from './useCases/businessOutletProperty.getByBusinessOutletId.usecase';
import { BusinessOutletPropertyCreateUseCase } from './useCases/businessOutletProperty.create.usecase';
import { BusinessOutletProperty } from './dto/businessOutletProperty.dto';
import { BusinessOutletPropertyCreateRequest } from './dto/businessOutletPropertyCreateRequest.dto';
import { OrganizationUser } from '../user/dto/user.dto';
import { OrganizationUserSingleByIdLoader } from '../user/user.singleById.loader';

@Resolver(BusinessOutletProperty)
export class BusinessOutletPropertyResolver {
  constructor(
    private readonly businessOutletPropertyGetByBusinessOutletIdUseCase: BusinessOutletPropertyGetByBusinessOutletIdUseCase,
    private readonly businessOutletPropertyCreateUseCase: BusinessOutletPropertyCreateUseCase
  ) {}

  @Query(() => BusinessOutletProperty, { nullable: true })
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_outlet_properties:read')
  async businessOutletPropertyByBusinessId(
    @Args('businessOutletId') businessOutletId: string
  ): Promise<BusinessOutletProperty> {
    return this.businessOutletPropertyGetByBusinessOutletIdUseCase.execute(
      businessOutletId
    );
  }

  @Mutation(() => BusinessOutletProperty)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_outlet_properties:create')
  async businessOutletPropertyCreate(
    @Args('input') requestDTO: BusinessOutletPropertyCreateRequest
  ): Promise<BusinessOutletProperty> {
    return this.businessOutletPropertyCreateUseCase.execute(requestDTO);
  }

  // FIELD DATA LOADER
  @ResolveField(() => BusinessOutlet)
  async businessOutlet(
    @Parent() businessOutletProperty: BusinessOutletProperty,
    @Loader(BusinessOutletSingleByIdLoader.name)
    businessOutletSingleByIdLoader: DataLoader<string, BusinessOutlet>
  ): Promise<BusinessOutlet> {
    try {
      if (businessOutletProperty.businessOutletId) {
        const response = await businessOutletSingleByIdLoader.load(
          businessOutletProperty.businessOutletId
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
  @ResolveField(() => OrganizationUser)
  async dailyTransferOrganizationUser(
    @Parent() businessOutletProperty: BusinessOutletProperty,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<
      OrganizationUser['id'],
      OrganizationUser
    >
  ): Promise<OrganizationUser> {
    try {
      if (businessOutletProperty.dailyTransferOrganizationUserId) {
        const response = await organizationUserSingleByIdLoader.load(
          businessOutletProperty.dailyTransferOrganizationUserId
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
