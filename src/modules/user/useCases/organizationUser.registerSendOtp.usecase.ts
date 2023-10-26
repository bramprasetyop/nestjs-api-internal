import { Injectable } from '@nestjs/common';
import {
  AuthOtpProviderMissedCall,
  AuthOtpProviderSms,
  AuthOtpProviderWhatsapp,
  AuthOtpType,
  config,
  generateOTP,
  MessagingService,
  validatePhoneNumber
} from '@wahyoo/wahyoo-shared';
import moment from 'moment';
import { IUseCase } from 'src/commons/useCase.interface';
import { OrganizationUserRegisterSendOtpRequest } from '../dto/organizationUserRegisterSendOtpRequest.dto';
import { OrganizationUserRegisterSendOtpResponse } from '../dto/organizationUserRegisterSendOtpResponse.dto';
import { AuthOtpRepository } from '../repositories/authOtp.repository';
import { OrganizationUserRepository } from '../repositories/organizationUser.repository';

@Injectable()
export class OrganizationUserRegisterSendOtpUseCase implements IUseCase {
  constructor(
    private readonly authOtpRepository: AuthOtpRepository,
    private readonly userRepository: OrganizationUserRepository
  ) {}

  async execute(
    dto: OrganizationUserRegisterSendOtpRequest
  ): Promise<OrganizationUserRegisterSendOtpResponse> {
    const { phoneNumber, sendMethod } = dto;
    const { countryCode, nationalNumber } = validatePhoneNumber(phoneNumber);
    const validPhoneNumber = `${countryCode}${nationalNumber}`;
    const user = await this.userRepository.findByPhoneNumber({
      phoneNumber: `${nationalNumber}`,
      countryCode
    });
    if (user) {
      throw new Error('phone number is already used');
    }
    const otpFreq = await this.authOtpRepository.getFreqRequestOtp(
      nationalNumber
    );
    if (otpFreq >= 5) {
      throw new Error(
        `request OTP more than 5 times, please ask customer support to unlock your phone number`
      );
    }

    let code = generateOTP();
    const messagingService = new MessagingService(config.messaging);

    let isSend = false;
    let providerWhatsapp = null;
    let providerSms = null;
    let providerMissedCall = null;
    let tokenCode = null;
    let tokenPrefix = null;

    switch (sendMethod) {
      case 'whatsapp':
        isSend = await messagingService.sendWhatsappMessage({
          phoneNumber: validPhoneNumber,
          otpCode: code
        });
        providerWhatsapp = AuthOtpProviderWhatsapp.kata_ai;
        break;
      case 'sms':
        isSend = await messagingService.sendSMSMessage({
          appName: config.appName,
          phoneNumber: validPhoneNumber,
          otpCode: code,
          expiryTimeInMinutes: '5'
        });
        providerSms = AuthOtpProviderSms.wave_cell;
        break;
      case 'missed_call':
        const missedCall = await messagingService.sendMissCalled({
          phoneNumber: validPhoneNumber
        });
        code = null;
        tokenCode = missedCall.tokenCode;
        tokenPrefix = missedCall.tokenPrefix;
        providerMissedCall = AuthOtpProviderMissedCall.cit_call;
        isSend = true;
        break;
      default:
        isSend = false;
        break;
    }
    if (isSend) {
      const saveOtp = await this.authOtpRepository.createRegisterOtp({
        phoneNumber: `${nationalNumber}`,
        countryCode,
        type: AuthOtpType.register,
        isUsed: false,
        validUntil: moment()
          .add(parseInt(config.otpExpiryInMinute), 'minutes')
          .toDate(),
        code,
        counterAttempt: 1,
        tokenPrefix,
        tokenCode,
        isRevoked: false,
        providerSms,
        providerWhatsapp,
        providerMissedCall,
        sendMethod,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      if (saveOtp) {
        return {
          isSucceed: true,
          phoneNumber: validPhoneNumber || null,
          tokenPrefix: tokenPrefix || null
        };
      }
    }
  }
}
