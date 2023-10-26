import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { OrganizationCustomerFeedback } from './dto/organizationCustomerFeedback.dto';
import { OrganizationCustomerFeedbackCreateRequest } from './dto/organizationCustomerFeedbackCreateRequest.dto';
import { OrganizationCustomerFeedbackMapper } from './mappers/organizationCustomerFeedback.mapper';
import { OrganizationCustomerFeedbackCreateUseCase } from './useCases/organizationCustomerFeedback.create.usecase';

@Resolver()
export class OrganizationCustomerFeedbackResolver {
  constructor(
    private readonly useCaseCreate: OrganizationCustomerFeedbackCreateUseCase
  ) {}

  @Mutation(() => OrganizationCustomerFeedback)
  async organizationCustomerFeedbackCreate(
    @Args('input') requestDTO: OrganizationCustomerFeedbackCreateRequest
  ): Promise<OrganizationCustomerFeedback> {
    const model = await this.useCaseCreate.execute(requestDTO);
    return OrganizationCustomerFeedbackMapper.modelToDTO(model);
  }
}
