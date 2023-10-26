import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { ICurrentUserArgs } from 'src/modules/auth/repositories/currentUser.interface';
import { BusinessOutletLead } from '../dto/businessOutletLead.dto';
import { BusinessOutletLeadMapper } from '../mappers/businessOutletLead.mapper';
import { BusinessOutletLeadRepository } from '../repositories/businessOutletLead.repository';

@Injectable()
export class MyBusinessOutletLeadListUseCase implements IUseCase {
  constructor(private readonly repository: BusinessOutletLeadRepository) {}

  private currentUser: ICurrentUserArgs;
  with(currentUser: ICurrentUserArgs) {
    this.currentUser = currentUser;
    return this;
  }
  async execute(): Promise<BusinessOutletLead[]> {
    const result = await this.repository.findByOrganizationUser(
      this.currentUser.id
    );
    return BusinessOutletLeadMapper.modelsToDTOs(result);
  }
}
