import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from '@wahyoo/wahyoo-shared';
import moment from 'moment';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationUserRegisterRequest } from '../dto/organizationUserRegisterRequest.dto';
import { OrganizationUserRegisterResponse } from '../dto/organizationUserRegisterResponse.dto';
import { AuthOtpRepository } from '../repositories/authOtp.repository';
import { OrganizationUserRepository } from '../repositories/organizationUser.repository';

@Injectable()
export class OrganizationUserRegisterUseCase implements IUseCase {
  constructor(
    private readonly authOtpRepository: AuthOtpRepository,
    private readonly userRepository: OrganizationUserRepository,
    private jwtService: JwtService
  ) {}

  async execute(
    dto: OrganizationUserRegisterRequest
  ): Promise<OrganizationUserRegisterResponse> {
    const { otpCode, countryCode, phoneNumber, sendMethod } = dto;

    const user = await this.userRepository.findByPhoneNumber({
      phoneNumber,
      countryCode
    });
    if (user) {
      throw new Error('user already existed');
    }

    const authOtp = await this.authOtpRepository.findByRegisterCode({
      code: otpCode,
      sendMethod
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
        const newUser = await this.userRepository.createFromRegistration(dto);
        await this.authOtpRepository.updateUsedOtp(authOtp.id);
        const payload = {
          id: newUser.id
        };
        const jwtToken = this.jwtService.sign(payload);
        return {
          token: `Bearer ${jwtToken}`,
          expiredAt: moment()
            .add(parseInt(config.jwtSessionExpiry), 'hours')
            .toDate(),
          organizationUserId: newUser.id
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
