import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationCustomerFeedbackModel } from '@wahyoo/wahyoo-shared';
import { OrganizationCustomerFeedbackCreateRequest } from '../dto/organizationCustomerFeedbackCreateRequest.dto';
import { OrganizationCustomerFeedbackRepository } from '../repositories/organizationCustomerFeedback.repository';

@Injectable()
export class OrganizationCustomerFeedbackCreateUseCase implements IUseCase {
  constructor(
    private readonly repository: OrganizationCustomerFeedbackRepository
  ) {}
  async execute(
    dto: OrganizationCustomerFeedbackCreateRequest
  ): Promise<OrganizationCustomerFeedbackModel> {
    try {
      const exists = await this.repository.findByPhoneNumberAndBusinessOutletId(
        {
          businessOutletId: dto.businessOutletId,
          phoneNumber: dto.phoneNumber
        }
      );
      if (!exists) {
        return await this.repository.create(dto);
      } else {
        throw Error('customer already created feedback');
      }
    } catch (err) {
      throw err;
    }
  }
}
