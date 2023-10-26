import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { ICurrentUserArgs } from 'src/modules/auth/repositories/currentUser.interface';
import { BusinessOutlet } from '../dto/businessOutlet.dto';
import { BusinessOutletMapper } from '../mappers/businessOutlet.mapper';
import { BusinessOutletRepository } from '../repositories/businessOutlet.repository';

@Injectable()
export class MyBusinessOutletListUseCase implements IUseCase {
  constructor(private readonly repository: BusinessOutletRepository) {}

  private currentUser: ICurrentUserArgs;
  with(currentUser: ICurrentUserArgs) {
    this.currentUser = currentUser;
    return this;
  }

  async execute(): Promise<BusinessOutlet[]> {
    const businessOutletModels = await this.repository.findByOrganizationUser(
      this.currentUser.id
    );
    if (!businessOutletModels) {
      throw new NotFoundException(this.currentUser.id);
    }
    return BusinessOutletMapper.modelsToDTOs(businessOutletModels);
  }
}
