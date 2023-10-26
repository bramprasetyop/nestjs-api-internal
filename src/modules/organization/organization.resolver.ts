import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrganizationCreateRequest } from './dto/organizationCreateRequest.dto';
import { OrganizationGetListRequest } from './dto/organizationGetListRequest.dto';
import { OrganizationCreateUseCase } from './useCases/organization.create.usecase';
import { Organization } from './dto/organization.dto';
import { OrganizationGetListUseCase } from './useCases/organization.getList.usercase';
import { OrganizationGetByIdUseCase } from './useCases/organization.getById.usecase';
import { OrganizationGetListResponse } from './dto/organizationGetListResponse.dto';

@Resolver()
export class OrganizationResolver {
  constructor(
    private readonly createUseCase: OrganizationCreateUseCase,
    private readonly getListUseCase: OrganizationGetListUseCase,
    private readonly getByIdUseCase: OrganizationGetByIdUseCase
  ) {}

  @Mutation(() => Organization)
  async organizationCreate(
    @Args('input') requestDTO: OrganizationCreateRequest
  ): Promise<Organization> {
    return this.createUseCase.execute(requestDTO);
  }

  @Query(() => Organization)
  async organizationById(@Args('id') id: string): Promise<Organization> {
    return this.getByIdUseCase.execute(id);
  }

  @Query(() => OrganizationGetListResponse)
  async organizationList(
    @Args() requestDTO: OrganizationGetListRequest
  ): Promise<OrganizationGetListResponse> {
    return this.getListUseCase.execute(requestDTO);
  }
}
