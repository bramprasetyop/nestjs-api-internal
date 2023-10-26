import { Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationUserRepository } from '../repositories/organizationUser.repository';
import { CurrentUserResponse } from '../dto/currentUser.dto';
import { ICurrentUserArgs } from 'src/modules/auth/repositories/currentUser.interface';

@Injectable()
export class UserCurrentUserUseCase implements IUseCase {
  constructor(private readonly repository: OrganizationUserRepository) {}
  private currentUser: ICurrentUserArgs;
  with(currentUser: ICurrentUserArgs) {
    this.currentUser = currentUser;
    return this;
  }
  async execute(id: string): Promise<CurrentUserResponse> {
    const organizationUserModel = await this.repository.findById(id);
    if (!organizationUserModel) {
      throw new NotFoundException(id);
    }
    return new CurrentUserResponse({
      model: organizationUserModel,
      currentUser: this.currentUser
    });
  }
}
