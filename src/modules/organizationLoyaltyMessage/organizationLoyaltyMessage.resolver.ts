import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { OrganizationLoyaltyMessage } from './dto/organizationLoyaltyMessage.dto';
import { OrganizationLoyaltyMessageMapper } from './mappers/organizationLoyaltyMessage.mapper';
import { OrganizationLoyaltyMessageGetRandomMessageUseCase } from './userCases/organizationLoyaltyMessage.getRandomMessage.usecase';
import DataLoader = require('dataloader');
import { Loader } from 'src/commons/loader';
import { OrganizationSingleByIdLoader } from '../organization/organization.singleById.loader';
import { Organization } from '../organization/dto/organization.dto';

@Resolver(OrganizationLoyaltyMessage)
export class OrganizationLoyaltyMessageResolver {
  constructor(
    private readonly randomMessageUseCase: OrganizationLoyaltyMessageGetRandomMessageUseCase
  ) {}

  @Query(() => OrganizationLoyaltyMessage)
  async organizationLoyaltyMessageRandomMessage(): Promise<
    OrganizationLoyaltyMessage
  > {
    const model = await this.randomMessageUseCase.execute();
    return OrganizationLoyaltyMessageMapper.modelToDTO(model);
  }

  // FIELD DATA LOADER
  @ResolveField(() => Organization)
  async organization(
    @Parent() organizationLoyaltyMessage: OrganizationLoyaltyMessage,
    @Loader(OrganizationSingleByIdLoader.name)
    organizationSingleByIdLoader: DataLoader<Organization['id'], Organization>
  ): Promise<Organization> {
    try {
      const response = await organizationSingleByIdLoader.load(
        organizationLoyaltyMessage.organizationId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
