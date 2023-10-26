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
import { PermissionsGuard } from '../auth/auth.permissions.guard';
import { BusinessOutlet } from './dto/businessOutlet.dto';
import { BusinessOutletGetListRequest } from './dto/businessOutletGetListRequest.dto';
import { BusinessOutletGetListResponse } from './dto/businessOutletGetListResponse.dto';
import { BusinessOutletNearestListRequest } from './dto/businessOutletNearestListRequest.dto';
import { BusinessOutletCheckInRequest } from './dto/businessOutletCheckInRequest.dto';
import { BusinessOutletGetListUseCase } from './useCases/businessOutlet.getList.usercase';
import { BusinessOutletGetNearestListUseCase } from './useCases/businessOutlet.getNearestList.usercase';
import { Permissions } from '../auth/auth.permission.decorator';
import { ICurrentUserArgs } from '../auth/repositories/currentUser.interface';
import { XBusinessOutletKioskModel } from '@wahyoo/wahyoo-shared';
import DataLoader from 'dataloader';
import { Loader } from 'src/commons/loader';
import { XBusinessOutletKioskSingleByBusinessOutletIdLoader } from './xBusinessOutletKiosk.singleBybusinessOutletId.loader';
import { BusinessOutletGetByIdUseCase } from './useCases/businessOutlet.getById.usercase';
import { BusinessSingleByIdLoader } from '../business/business.singleById.loader';
import { Business } from '../business/dto/business.dto';
import { OrganizationUserBusinessOutletBatchByBusinessOutletIdLoader } from '../user/organizationUserBusinessOutlet.batchByBusinessOutletId.loader';
import { OrganizationUserBusinessOutlet } from '../user/dto/organizationUserBusinessOutlet.dto';
import { BusinessOutletCreateRequest } from './dto/businessOutletCreateRequest.dto';
import { BusinessOutletCreateUseCase } from './useCases/businessOutlet.create.usecase';
import { BusinessOutletUpdateRequest } from './dto/businessOutletUpdateRequest.dto';
import { BusinessOutletUpdateUseCase } from './useCases/businessOutlet.update.usecase';
import { BusinessOutletDeleteUseCase } from './useCases/businessOutlet.delete.usecase';
import { BusinessOutletCheckInUseCase } from './useCases/businessOutlet.checkIn.usecase';
import { KioskGetListResponse } from './dto/KioskGetListResponse.dto';
import { KioskGetListRequest } from './dto/KioskGetListRequest.dto';
import { KioskGetListUseCase } from './useCases/kiosk.getList';
import { OrganizationUser } from '../user/dto/user.dto';
import { OrganizationUserSingleByIdLoader } from '../user/user.singleById.loader';
import { MyBusinessOutletListUseCase } from './useCases/businessOutlet.myBusinessOutletList.usercase';
import { XHubsterStore } from '../hubster/dto/xHubsterStore';
import { XHubsterStoreBatchByBusinessOutletIdLoader } from '../hubster/xHubsterStore.batchByBusinessOutletId.loader';
import { BusinessOutletMediaBatchByBusinessOutletIdLoader } from './businessOutletMedia.batchByBusinessOutletId.loader';
import { BusinessOutletMedia } from './dto/businessOutletMedia.dto';
import { BusinessOutletProperty } from '../businessOutletProperty/dto/businessOutletProperty.dto';
import { BusinessOutletPropertySingleByOutletIdLoader } from '../businessOutletProperty/businessOutletProperty.singleByOutletId';
import { BusinessOutletAndPropertyUpdateRequest } from './dto/businessOutletAndPropertyUpdateRequest.dto';
import { BusinessOutletAndPropertyUpdateUseCase } from './useCases/businessOutlet.outletAndPropertyUpdate.usecase';
import { BusinessOutletLead } from '../businessOutletLead/dto/businessOutletLead.dto';
import { BusinessOutletLeadSingleByBusinessOutletIdLoader } from '../businessOutletLead/businessOutletLead.singleByBusinessOutletId.loader';
import { Village } from '../region/dto/village.dto';
import { VillageSingleByIdLoader } from '../region/village.singleById.loader';
import { District } from '../region/dto/district.dto';
import { DistrictSingleByIdLoader } from '../region/district.singleById.loader';
import { City } from '../region/dto/city.dto';
import { CitySingleByIdLoader } from '../region/city.singleById.loader';
import { Province } from '../region/dto/province.dto';
import { ProvinceSingleByIdLoader } from '../region/province.singleById.loader';

@Resolver(BusinessOutlet)
export class BusinessOutletResolver {
  constructor(
    private readonly businessOutletGetByIdUseCase: BusinessOutletGetByIdUseCase,
    private readonly businessOutletGetNearestListUseCase: BusinessOutletGetNearestListUseCase,
    private readonly businessOutletGetListUseCase: BusinessOutletGetListUseCase,
    private readonly createUseCase: BusinessOutletCreateUseCase,
    private readonly updateUseCase: BusinessOutletUpdateUseCase,
    private readonly businessOutletAndPropertyUpdateUseCase: BusinessOutletAndPropertyUpdateUseCase,
    private readonly deleteUseCase: BusinessOutletDeleteUseCase,
    private readonly kioskGetListUseCase: KioskGetListUseCase,
    private readonly myBusinessOutletListUseCase: MyBusinessOutletListUseCase,
    private readonly businessOutletCheckInUseCase: BusinessOutletCheckInUseCase
  ) {}

  //deprecated soon because businessOutletCreate process move to TKB Onboarding
  @Mutation(() => BusinessOutlet)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_outlet:create')
  async businessOutletCreate(
    @Args('input') requestDTO: BusinessOutletCreateRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<BusinessOutlet> {
    return this.createUseCase.execute({
      ...requestDTO,
      createdBy: user.id,
      updatedBy: user.id
    });
  }

  @Mutation(() => BusinessOutlet)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_outlet:update')
  async businessOutletUpdate(
    @Args('input') requestDTO: BusinessOutletUpdateRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<BusinessOutlet> {
    return this.updateUseCase.execute({ ...requestDTO, updatedBy: user.id });
  }

  @Mutation(() => BusinessOutlet)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_outlet:update')
  async businessOutletAndPropertyUpdate(
    @Args('input') requestDTO: BusinessOutletAndPropertyUpdateRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<BusinessOutlet> {
    return this.businessOutletAndPropertyUpdateUseCase.execute({
      ...requestDTO,
      businessOutletDto: { ...requestDTO.businessOutletDto, updatedBy: user.id }
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_outlet:delete')
  async businessOutletDelete(@Args('id') id: string): Promise<Boolean> {
    return this.deleteUseCase.execute(id);
  }

  @Query(() => BusinessOutlet)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_outlet:read')
  async businessOutletById(@Args('id') id: string): Promise<BusinessOutlet> {
    return this.businessOutletGetByIdUseCase.execute(id);
  }

  @Query(() => BusinessOutletGetListResponse)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_outlet:read')
  async businessOutletList(
    @Args() requestDTO: BusinessOutletGetListRequest,
    @CurrentUser() currentUser: ICurrentUserArgs
  ): Promise<BusinessOutletGetListResponse> {
    return this.businessOutletGetListUseCase
      .with(currentUser)
      .execute(requestDTO);
  }

  @Query(() => KioskGetListResponse)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_outlet:read')
  async wahyooKioskList(
    @Args() requestDTO: KioskGetListRequest
  ): Promise<KioskGetListResponse> {
    return this.kioskGetListUseCase.execute(requestDTO);
  }

  // @Query(() => [BusinessOutlet])
  // // this Public API, no need Guard
  // // used on web https://bgbt-loyalty.wahyoo.io
  // async businessOutletNearestList(
  //   @Args() requestDTO: BusinessOutletNearestListRequest
  // ): Promise<BusinessOutlet[]> {
  //   return this.businessOutletGetNearestListUseCase.execute(requestDTO);
  // }

  // @Query(() => [BusinessOutlet])
  // @UseGuards(GqlAuthGuard)
  // async myBusinessOutletList(
  //   @CurrentUser() currentUser: ICurrentUserArgs
  // ): Promise<BusinessOutlet[]> {
  //   return this.myBusinessOutletListUseCase.with(currentUser).execute();
  // }

  // @Mutation(() => Boolean)
  // @UseGuards(GqlAuthGuard)
  // async businessOutletCheckIn(
  //   @Args() requestDTO: BusinessOutletCheckInRequest
  // ): Promise<Boolean> {
  //   return this.businessOutletCheckInUseCase.execute(requestDTO);
  // }

  // RESOLVER FIELD
  @ResolveField(() => XBusinessOutletKioskModel)
  async xBusinessOutletKiosk(
    @Parent() businessOutlet: BusinessOutlet,
    @Loader(XBusinessOutletKioskSingleByBusinessOutletIdLoader.name)
    xBusinessOutletKioskSingleByBusinessOutletIdLoader: DataLoader<
      string,
      XBusinessOutletKioskModel
    >
  ): Promise<XBusinessOutletKioskModel> {
    try {
      const response = await xBusinessOutletKioskSingleByBusinessOutletIdLoader.load(
        businessOutlet.id
      );
      return response;
    } catch (err) {
      throw err;
    }
  }

  // RESOLVER FIELD
  @ResolveField(() => Business)
  async business(
    @Parent() businessOutlet: BusinessOutlet,
    @Loader(BusinessSingleByIdLoader.name)
    businessSingleByIdLoader: DataLoader<string, Business>
  ): Promise<Business> {
    try {
      const response = await businessSingleByIdLoader.load(
        businessOutlet.businessId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // RESOLVER FIELD
  @ResolveField(() => [OrganizationUserBusinessOutlet])
  async organizationUserBusinessOutlets(
    @Parent() businessOutlet: BusinessOutlet,
    @Loader(OrganizationUserBusinessOutletBatchByBusinessOutletIdLoader.name)
    organizationUserBusinessOutletBatchByBusinessOutletIdLoader: DataLoader<
      string,
      OrganizationUserBusinessOutlet
    >
  ): Promise<OrganizationUserBusinessOutlet> {
    try {
      const response = await organizationUserBusinessOutletBatchByBusinessOutletIdLoader.load(
        businessOutlet.id
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @ResolveField(() => OrganizationUser)
  async creator(
    @Parent() businessOutlet: BusinessOutlet,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (businessOutlet.createdBy) {
        const response = await organizationUserSingleByIdLoader.load(
          businessOutlet.createdBy
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
    @Parent() businessOutlet: BusinessOutlet,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (businessOutlet.updatedBy) {
        const response = await organizationUserSingleByIdLoader.load(
          businessOutlet.updatedBy
        );
        return response;
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  @ResolveField(() => BusinessOutletProperty)
  async businessOutletProperty(
    @Parent() businessOutlet: BusinessOutlet,
    @Loader(BusinessOutletPropertySingleByOutletIdLoader.name)
    businessOutletPropertySingleByBusinessOutletIdLoader: DataLoader<
      String,
      BusinessOutletProperty
    >
  ): Promise<BusinessOutletProperty> {
    try {
      const response = await businessOutletPropertySingleByBusinessOutletIdLoader.load(
        businessOutlet.id
      );
      return response;
    } catch (err) {
      throw err;
    }
  }

  @ResolveField(() => BusinessOutletLead)
  async businessOutletLead(
    @Parent() businessOutlet: BusinessOutlet,
    @Loader(BusinessOutletLeadSingleByBusinessOutletIdLoader.name)
    businessOutletLeadSingleByBusinessOutletIdLoader: DataLoader<
      String,
      BusinessOutletLead
    >
  ): Promise<BusinessOutletLead> {
    try {
      const response = await businessOutletLeadSingleByBusinessOutletIdLoader.load(
        businessOutlet.id
      );
      return response;
    } catch (err) {
      throw err;
    }
  }

  //  FIELD DATA LOADER
  @ResolveField(() => Village)
  async village(
    @Parent() businessMerchantOrder: BusinessOutlet,
    @Loader(VillageSingleByIdLoader.name)
    villageSingleByIdLoader: DataLoader<string, Village>
  ): Promise<Village> {
    try {
      if (!businessMerchantOrder.villageId) return null;
      const response = await villageSingleByIdLoader.load(
        businessMerchantOrder.villageId.toString()
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //  FIELD DATA LOADER
  @ResolveField(() => District)
  async district(
    @Parent() businessMerchantOrder: BusinessOutlet,
    @Loader(DistrictSingleByIdLoader.name)
    districtSingleByIdLoader: DataLoader<string, District>
  ): Promise<District> {
    try {
      if (!businessMerchantOrder.districtId) return null;
      const response = await districtSingleByIdLoader.load(
        businessMerchantOrder.districtId.toString()
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //  FIELD DATA LOADER
  @ResolveField(() => City)
  async city(
    @Parent() businessMerchantOrder: BusinessOutlet,
    @Loader(CitySingleByIdLoader.name)
    citySingleByIdLoader: DataLoader<string, City>
  ): Promise<City> {
    try {
      if (!businessMerchantOrder.cityId) return null;
      const response = await citySingleByIdLoader.load(
        businessMerchantOrder.cityId.toString()
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //  FIELD DATA LOADER
  @ResolveField(() => Province)
  async province(
    @Parent() businessMerchantOrder: BusinessOutlet,
    @Loader(ProvinceSingleByIdLoader.name)
    provinceSingleByIdLoader: DataLoader<string, Province>
  ): Promise<Province> {
    try {
      if (!businessMerchantOrder.provinceId) return null;
      const response = await provinceSingleByIdLoader.load(
        businessMerchantOrder.provinceId.toString()
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @ResolveField(() => [XHubsterStore])
  async xHubsterStores(
    @Parent() businessOutlet: BusinessOutlet,
    @Loader(XHubsterStoreBatchByBusinessOutletIdLoader.name)
    xHubsterStoreBatchByBusinessOutletIdLoader: DataLoader<
      String,
      XHubsterStore[]
    >
  ): Promise<XHubsterStore[]> {
    try {
      const response = await xHubsterStoreBatchByBusinessOutletIdLoader.load(
        businessOutlet.id
      );
      return response;
    } catch (err) {
      throw err;
    }
  }

  // FIELD DATA LOADER
  @ResolveField(() => [BusinessOutletMedia])
  async businessOutletMedias(
    @Parent() businessOutlet: BusinessOutlet,
    @Loader(BusinessOutletMediaBatchByBusinessOutletIdLoader.name)
    businessOutletMediaBatchByBusinessOutletIdLoader: DataLoader<
      string,
      BusinessOutletMedia[]
    >
  ): Promise<BusinessOutletMedia[]> {
    try {
      const response = await businessOutletMediaBatchByBusinessOutletIdLoader.load(
        businessOutlet.id
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
