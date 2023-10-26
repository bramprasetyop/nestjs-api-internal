import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { LoginOtpRequest } from '../dto/loginOtpRequest.dto';
import { AuthOtpRepository } from '../repositories/authOtp.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginOtpResponse } from '../dto/loginOtpResponse.dto';
import {
  config,
  validatePhoneNumber,
  isWhiteListPhoneNumber
} from '@wahyoo/wahyoo-shared';
import { OrganizationUserRepository } from '../repositories/organizationUser.repository';
import moment from 'moment';

@Injectable()
export class AuthLoginOtpUseCase implements IUseCase {
  constructor(
    private readonly authOtpRepository: AuthOtpRepository,
    private readonly userRepository: OrganizationUserRepository,
    private jwtService: JwtService
  ) {}
  async execute(dto: LoginOtpRequest): Promise<LoginOtpResponse> {
    const { otpCode, phoneNumber, sendMethod } = dto;
    const { countryCode, nationalNumber } = validatePhoneNumber(phoneNumber);

    const user = await this.userRepository.findByPhoneNumber({
      phoneNumber: `${nationalNumber}`,
      countryCode
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

    if (
      isWhiteListPhoneNumber(
        config.whiteListPhoneNumber,
        `${countryCode}${nationalNumber}`
      ) &&
      otpCode === config.whiteListPhoneNumberVerificationCode
    ) {
      const jwtToken = this.jwtService.sign(payload);

      return {
        token: `Bearer ${jwtToken}`,
        expiredAt: moment()
          .add(parseInt(config.jwtSessionExpiry), 'hours')
          .toDate(),
        organizationUserId: user.id
      };
    }

    const authOtp = await this.authOtpRepository.findLastValidOtp({
      sendMethod,
      organizationUserId: user.id,
      type: 'login'
    });

    if (authOtp && moment().toDate() > authOtp.validUntil) {
      throw new Error('Kode OTP sudah expired');
    }

    if (authOtp && authOtp.verifyAttempt > 3) {
      await this.authOtpRepository.updateFailedUsedOtp(authOtp.id);
      throw new Error('Kode OTP invalid');
    }

    if (authOtp) {
      if (
        (authOtp.code === otpCode || authOtp.tokenCode === otpCode) &&
        authOtp.verifyAttempt <= 3
      ) {
        await this.authOtpRepository.updateUsedOtp(authOtp.id);
        const jwtToken = this.jwtService.sign(payload);
        return {
          token: `Bearer ${jwtToken}`,
          expiredAt: moment()
            .add(parseInt(config.jwtSessionExpiry), 'hours')
            .toDate(),
          organizationUserId: user.id
        };
      } else {
        await this.authOtpRepository.incrementVerifyAttempt(authOtp.id);
        throw new Error('OTP code not found');
      }
    } else {
      throw new Error('OTP code not found');
    }
  }
}
