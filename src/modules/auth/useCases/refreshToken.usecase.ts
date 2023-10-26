import moment from 'moment';
import { config } from '@wahyoo/wahyoo-shared';
import { IUseCase } from 'src/commons/useCase.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginOtpResponse } from '../dto/loginOtpResponse.dto';
import { ICurrentUserArgs } from '../repositories/currentUser.interface';
import { OrganizationUserRepository } from '../repositories/organizationUser.repository';

@Injectable()
export class RefreshTokenUseCase implements IUseCase {
  constructor(
    private readonly userRepository: OrganizationUserRepository,
    private jwtService: JwtService
  ) {}
  async execute(currentUser: ICurrentUserArgs): Promise<LoginOtpResponse> {
    const user = await this.userRepository.findById({
      id: currentUser.id
    });
    if (!user) {
      throw new Error('user not found');
    }
    if (user.status === 'inactive') {
      throw new Error('user is inactive');
    }
    const payload = {
      id: user.id
    };

    const jwtToken = this.jwtService.sign(payload);
    return {
      token: `Bearer ${jwtToken}`,
      expiredAt: moment()
        .add(parseInt(config.jwtSessionExpiry), 'hours')
        .toDate(),
      organizationUserId: user.id
    };
  }
}
