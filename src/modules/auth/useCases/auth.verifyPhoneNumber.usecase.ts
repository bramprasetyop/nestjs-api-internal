import { IUseCase } from 'src/commons/useCase.interface';
import { Injectable } from '@nestjs/common';
import { validatePhoneNumber } from '@wahyoo/wahyoo-shared';
import { OrganizationUserRepository } from '../repositories/organizationUser.repository';
import { VerifyPhoneNumberRequest } from '../dto/verifyPhoneNumberRequest.dto';

@Injectable()
export class VerifyPhoneNumberUseCase implements IUseCase {
  constructor(private readonly userRepository: OrganizationUserRepository) {}
  async execute({ phoneNumber }: VerifyPhoneNumberRequest): Promise<Boolean> {
    const { countryCode, nationalNumber } = validatePhoneNumber(phoneNumber);
    const user = await this.userRepository.findByPhoneNumber({
      phoneNumber: `${nationalNumber}`,
      countryCode
    });
    if (!user) {
      throw new Error('unregistered user');
    }
    if (user.status === 'inactive') {
      throw new Error('user is inactive');
    }
    return true;
  }
}
