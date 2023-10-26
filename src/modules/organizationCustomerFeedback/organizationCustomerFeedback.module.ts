import { Module } from '@nestjs/common';
import {
  InjectionKey,
  OrganizationCustomerFeedbackModel
} from '@wahyoo/wahyoo-shared';
// import { OrganizationCustomerFeedbackResolver } from './organizationCustomerFeedback.resolver';
import { OrganizationCustomerFeedbackRepository } from './repositories/organizationCustomerFeedback.repository';
import { OrganizationCustomerFeedbackCreateUseCase } from './useCases/organizationCustomerFeedback.create.usecase';

@Module({
  imports: [],
  providers: [
    // OrganizationCustomerFeedbackResolver,
    OrganizationCustomerFeedbackCreateUseCase,
    OrganizationCustomerFeedbackRepository,
    {
      provide: InjectionKey.ORGANIZATION_CUSTOMER_FEEDBACK_MODEL,
      useValue: OrganizationCustomerFeedbackModel
    },
    {
      provide: InjectionKey.ORGANIZATION_CUSTOMER_FEEDBACK_MEDIA_MODEL,
      useValue: OrganizationCustomerFeedbackModel
    }
  ]
})
export class OrganizationCustomerFeedbackModule {}
