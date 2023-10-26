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
import { BusinessOutletLead } from './dto/businessOutletLead.dto';

import { Permissions } from '../auth/auth.permission.decorator';
import { ICurrentUserArgs } from '../auth/repositories/currentUser.interface';
import DataLoader from 'dataloader';
import { Loader } from 'src/commons/loader';
import { BusinessSingleByIdLoader } from '../business/business.singleById.loader';
import { Business } from '../business/dto/business.dto';
import { MyBusinessOutletLeadListUseCase } from './useCases/businessOutletLead.myBusinessOutlet.usecase';
import { Organization } from '../organization/dto/organization.dto';
import { OrganizationSingleByIdLoader } from '../organization/organization.singleById.loader';
import { OrganizationUser } from '../user/dto/user.dto';
import { OrganizationUserSingleByIdLoader } from '../user/user.singleById.loader';
import { BusinessOutlet } from '../businessOutlet/dto/businessOutlet.dto';
import { BusinessOutletSingleByIdLoader } from '../businessOutlet/businessOutlet.singleById.loader';
import { BusinessOutletLeadGetListResponse } from './dto/businessOutletLeadGetListResponse.dto';
import { BusinessOutletLeadGetListRequest } from './dto/businessOutletLeadGetListRequest.dto';
import { BusinessOutletLeadGetListUseCase } from './useCases/businessOutletLead.getList.usecase';
import { BusinessOutletLeadGetByIdUseCase } from './useCases/businessOutletLead.getById.usecase';
import { BusinessOutletLeadApprovalLocationRequest } from './dto/businessOutletLeadApprovalLocationRequest.dto';
import { BusinessOutletLeadApprovalLocationUseCase } from './useCases/businessOutletLead.approvalLocation.usecase';
import { BusinessOutletLeadInterviewRequest } from './dto/businessOutletLeadInterviewRequest.dto';
import { BusinessOutletLeadInterviewUseCase } from './useCases/businessOutletLead.interview.usecase';
import { BusinessOutletLeadSurveyRequest } from './dto/businessOutletLeadSurveyRequest.dto';
import { BusinessOutletLeadSurveyUseCase } from './useCases/businessOutletLead.survey.usecase';
import { BusinessOutletLeadMapLocationUseCase } from './useCases/businessOutletLead.mapLocation.usecase';
import { BusinessOutletAndLeadMapLocation } from './dto/businessOutletAndLeadMapLocation.dto';
import { BusinessOutletAndLeadMapLocationRequest } from './dto/businessOutletLeadMapLocationRequest.dto';
import { BusinessOutletLeadRegisterRequest } from './dto/businessOutletLeadRegisterRequest.dto';
import { BusinessOutletLeadRegisterUsecase } from './useCases/businessOutletLead.register.usecase';
import { BusinessOutletLeadTrainingRequest } from './dto/businessOutletLeadTrainingRequest.dto';
import { BusinessOutletLeadTrainingUseCase } from './useCases/businessOutletLead.training.usecase';
import { BusinessOutletLeadValidateCoordinateRequest } from './dto/businessOutletLeadValidateCoordinateRequest.dto';
import { BusinessOutletLeadValidateCoordinateUseCase } from './useCases/businessOutletLead.validateCoordinate.usecase';
import { BusinessMerchantOrder } from '../businessMerchantOrder/dto/businessMerchantOrder.dto';
import { BusinessMerchantOrderBatchByBusinessOutletLeadIdLoader } from '../businessMerchantOrder/businessMerchantOrder.batchByBusinessOutletLeadId.loader';
import { BusinessOutletLeadMedia } from './dto/businessOutletLeadMedia.dto';
import { BusinessOutletMediaBatchByBusinessOutletLeadIdLoader } from './businessOutletLeadMedia.batchByBusinessOutletLeadId.loader';
import { BusinessOutletLeadUpdateUseCase } from './useCases/businessOutletLead.update.useCase';
import { BusinessOutletLeadUpdateRequest } from './dto/businessOutletLeadUpdateRequest.dto';
import { BusinessOutletLeadCalculateLocationIntersectionResponse } from './dto/businessOutletLeadCalculateLocationIntersectionResponse.dto';
import { BusinessOutletLeadCalculateLocationIntersectionUseCase } from './useCases/businessOutletLead.calculateLocationIntersection.usecase';
import { BusinessOutletLeadGenerateNameRequest } from './dto/businessOutletLeadGenerateNameRequest.dto';
import { BusinessOutletLeadGenerateNameUseCase } from './useCases/businessOutletLead.generateName.usecase';
import { BusinessOutletLeadGenerateNameResponse } from './dto/businessOutletLeadGenerateNameResponse.dto';

@Resolver(BusinessOutletLead)
export class BusinessOutletLeadResolver {
  constructor(
    private readonly myBusinessOutletLeadListUseCase: MyBusinessOutletLeadListUseCase,
    private readonly businessOutletLeadGetListUseCase: BusinessOutletLeadGetListUseCase,
    private readonly businessOutletLeadGetByIdUseCase: BusinessOutletLeadGetByIdUseCase,
    private readonly businessOutletLeadUpdateUseCase: BusinessOutletLeadUpdateUseCase,
    private readonly businessOutletLeadApprovalLocationUseCase: BusinessOutletLeadApprovalLocationUseCase,
    private readonly businessOutletLeadCalculateLocationIntersectionUseCase: BusinessOutletLeadCalculateLocationIntersectionUseCase,
    private readonly businessOutletLeadInterviewUseCase: BusinessOutletLeadInterviewUseCase,
    private readonly businessOutletLeadSurveyUseCase: BusinessOutletLeadSurveyUseCase,
    private readonly businessOutletLeadMapLocationUseCase: BusinessOutletLeadMapLocationUseCase,
    private readonly businessOutletLeadValidateCoordinateUseCase: BusinessOutletLeadValidateCoordinateUseCase,
    private readonly businessOutletLeadRegisterUseCase: BusinessOutletLeadRegisterUsecase,
    private readonly businessOutletLeadTrainingUseCase: BusinessOutletLeadTrainingUseCase,
    private readonly businessOutletLeadGenerateNameUseCase: BusinessOutletLeadGenerateNameUseCase
  ) {}

  // @Query(() => [BusinessOutletLead])
  // @UseGuards(GqlAuthGuard)
  // async myBusinessOutletLeadList(
  //   @CurrentUser() currentUser: ICurrentUserArgs
  // ): Promise<BusinessOutletLead[]> {
  //   return this.myBusinessOutletLeadListUseCase.with(currentUser).execute();
  // }

  @Query(() => BusinessOutletLeadGetListResponse)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_outlet_lead.read')
  async businessOutletLeadList(
    @Args() requestDTO: BusinessOutletLeadGetListRequest
  ): Promise<BusinessOutletLeadGetListResponse> {
    return this.businessOutletLeadGetListUseCase.execute(requestDTO);
  }

  @Query(() => BusinessOutletLead)
  @UseGuards(GqlAuthGuard)
  async businessOutletLeadById(
    @Args('id') id: string
  ): Promise<BusinessOutletLead> {
    return this.businessOutletLeadGetByIdUseCase.execute(id);
  }

  @Query(() => [BusinessOutletAndLeadMapLocation])
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_outlet_lead.read')
  async getMapLocationBusinessOutletAndLead(
    @Args() requestDTO: BusinessOutletAndLeadMapLocationRequest
  ): Promise<BusinessOutletAndLeadMapLocation[]> {
    return this.businessOutletLeadMapLocationUseCase.execute(requestDTO);
  }

  // @Query(() => Boolean)
  // async businessOutletLeadValidateCoordinate(
  //   @Args('input') requestDTO: BusinessOutletLeadValidateCoordinateRequest
  // ): Promise<boolean> {
  //   return this.businessOutletLeadValidateCoordinateUseCase.execute(requestDTO);
  // }

  @Query(() => BusinessOutletLeadCalculateLocationIntersectionResponse)
  async businessOutletLeadCalculateLocationIntersection(
    @Args('businessOutletLeadId') businessOutletLeadId: string
  ): Promise<BusinessOutletLeadCalculateLocationIntersectionResponse> {
    return this.businessOutletLeadCalculateLocationIntersectionUseCase.execute(
      businessOutletLeadId
    );
  }

  // @Query(() => BusinessOutletLeadGenerateNameResponse)
  // async businessOutletLeadGenerateName(
  //   @Args() input: BusinessOutletLeadGenerateNameRequest,
  //   @CurrentUser() user: ICurrentUserArgs
  // ): Promise<BusinessOutletLeadGenerateNameResponse> {
  //   return this.businessOutletLeadGenerateNameUseCase.execute(input);
  // }

  // @Mutation(() => BusinessOutletLead)
  // @UseGuards(GqlAuthGuard)
  // async businessOutletLeadRegister(
  //   @Args('input') requestDTO: BusinessOutletLeadRegisterRequest,
  //   @CurrentUser() user: ICurrentUserArgs
  // ): Promise<BusinessOutletLead> {
  //   return this.businessOutletLeadRegisterUseCase
  //     .with(user)
  //     .execute(requestDTO);
  // }

  @Mutation(() => BusinessOutletLead)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_outlet_lead.location_approve_reject')
  async businessOutletLeadApprovalLocation(
    @Args('input') requestDTO: BusinessOutletLeadApprovalLocationRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<BusinessOutletLead> {
    return this.businessOutletLeadApprovalLocationUseCase
      .with(user)
      .execute(requestDTO);
  }

  // THIS API IS DEPRECATED SINCE NEW ONBOARDING FLOW (NOV 2022)
  @Mutation(() => BusinessOutletLead)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_outlet_lead.interview_schedule')
  async businessOutletLeadInterview(
    @Args('input') requestDTO: BusinessOutletLeadInterviewRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<BusinessOutletLead> {
    return this.businessOutletLeadInterviewUseCase
      .with(user)
      .execute(requestDTO);
  }

  @Mutation(() => BusinessOutletLead)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_outlet_lead.update')
  async businessOutletLeadUpdate(
    @Args('input') requestDTO: BusinessOutletLeadUpdateRequest
  ): Promise<BusinessOutletLead> {
    return this.businessOutletLeadUpdateUseCase.execute(requestDTO);
  }

  @Mutation(() => BusinessOutletLead)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_outlet_lead.survey_schedule')
  async businessOutletLeadSurvey(
    @Args('input') requestDTO: BusinessOutletLeadSurveyRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<BusinessOutletLead> {
    return this.businessOutletLeadSurveyUseCase.with(user).execute(requestDTO);
  }

  @Mutation(() => BusinessOutletLead)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('business_outlet_lead.training_schedule')
  async businessOutletLeadTraining(
    @Args('input') requestDTO: BusinessOutletLeadTrainingRequest,
    @CurrentUser() user: ICurrentUserArgs
  ): Promise<BusinessOutletLead> {
    return this.businessOutletLeadTrainingUseCase
      .with(user)
      .execute(requestDTO);
  }

  // RESOLVER FIELD
  @ResolveField(() => Business)
  async business(
    @Parent() businessOutletLead: BusinessOutletLead,
    @Loader(BusinessSingleByIdLoader.name)
    businessSingleByIdLoader: DataLoader<string, Business>
  ): Promise<Business> {
    try {
      const response = await businessSingleByIdLoader.load(
        businessOutletLead.businessId
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
    @Parent() BusinessOutletLead: BusinessOutletLead,
    @Loader(OrganizationSingleByIdLoader.name)
    organizationSingleByIdLoader: DataLoader<Organization['id'], Organization>
  ): Promise<Organization> {
    try {
      const response = await organizationSingleByIdLoader.load(
        BusinessOutletLead.organizationId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // FIELD DATA LOADER
  @ResolveField(() => OrganizationUser)
  async organizationUser(
    @Parent() businessOutletLead: BusinessOutletLead,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<
      OrganizationUser['id'],
      OrganizationUser
    >
  ): Promise<OrganizationUser> {
    try {
      if (businessOutletLead.organizationUserId) {
        const response = await organizationUserSingleByIdLoader.load(
          businessOutletLead.organizationUserId
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
  @ResolveField(() => BusinessOutlet)
  async businessOutlet(
    @Parent() businessOutletLead: BusinessOutletLead,
    @Loader(BusinessOutletSingleByIdLoader.name)
    businessOutletSingleByIdLoader: DataLoader<string, BusinessOutlet>
  ): Promise<BusinessOutlet> {
    try {
      if (businessOutletLead.businessOutletId) {
        const response = await businessOutletSingleByIdLoader.load(
          businessOutletLead.businessOutletId
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
  @ResolveField(() => [BusinessMerchantOrder])
  async businessMerchantOrders(
    @Parent() businessOutletLead: BusinessOutletLead,
    @Loader(BusinessMerchantOrderBatchByBusinessOutletLeadIdLoader.name)
    businessMerchantOrderBatchByBusinessOutletLeadIdLoader: DataLoader<
      string,
      BusinessMerchantOrder[]
    >
  ): Promise<BusinessMerchantOrder[]> {
    try {
      const response = await businessMerchantOrderBatchByBusinessOutletLeadIdLoader.load(
        businessOutletLead.id
      );
      console.log('RESPONSE===>', response);
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // FIELD DATA LOADER
  @ResolveField(() => [BusinessOutletLeadMedia])
  async businessOutletLeadMedias(
    @Parent() businessOutletLead: BusinessOutletLead,
    @Loader(BusinessOutletMediaBatchByBusinessOutletLeadIdLoader.name)
    businessOutletMediaBatchByBusinessOutletLeadIdLoader: DataLoader<
      string,
      BusinessOutletLeadMedia[]
    >
  ): Promise<BusinessOutletLeadMedia[]> {
    try {
      const response = await businessOutletMediaBatchByBusinessOutletLeadIdLoader.load(
        businessOutletLead.id
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // FIELD DATA LOADER
  @ResolveField(() => String)
  async termSheetLink(
    @Parent() businessOutletLead: BusinessOutletLead
  ): Promise<string> {
    const { xDocusignEnvelopId } = businessOutletLead;
    if (!xDocusignEnvelopId) return null;
    const prodTermSheetLink = `https://app.docusign.com/documents/details/${xDocusignEnvelopId}`;
    const stagingTermSheetLink = `https://appdemo.docusign.com/documents/details/${xDocusignEnvelopId}`;
    return process.env.NODE_ENV === 'production'
      ? prodTermSheetLink
      : stagingTermSheetLink;
  }

  // FIELD DATA LOADER
  @ResolveField(() => OrganizationUser)
  async modifier(
    @Parent() businessOutletLead: BusinessOutletLead,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<String, OrganizationUser>
  ): Promise<OrganizationUser> {
    try {
      if (businessOutletLead.updatedBy) {
        const response = await organizationUserSingleByIdLoader.load(
          businessOutletLead.updatedBy
        );
        return response;
      }
      return null;
    } catch (err) {
      throw err;
    }
  }
}
