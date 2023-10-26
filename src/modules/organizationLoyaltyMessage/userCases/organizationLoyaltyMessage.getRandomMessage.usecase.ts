import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationLoyaltyMessageModel } from '@wahyoo/wahyoo-shared';
import { OrganizationLoyaltyMessageRepository } from '../repositories/organizationLoyaltyMessage.repository';

@Injectable()
export class OrganizationLoyaltyMessageGetRandomMessageUseCase
  implements IUseCase {
  constructor(
    private readonly repository: OrganizationLoyaltyMessageRepository
  ) {}
  async execute(): Promise<OrganizationLoyaltyMessageModel> {
    return this.repository.findOneRandom();
  }
}
