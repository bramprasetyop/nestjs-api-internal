import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { AuthOtpRepository } from '../repositories/authOtp.repository';
import { SendOtpRequest } from '../dto/sendOtpRequest.dto';
import {
  AuthOtpProviderMissedCall,
  AuthOtpProviderSms,
  AuthOtpProviderWhatsapp,
  AuthOtpType,
  config,
  MessagingService,
  validatePhoneNumber,
  generateOTP,
  isWhiteListPhoneNumber
} from '@wahyoo/wahyoo-shared';
import { OrganizationUserRepository } from '../repositories/organizationUser.repository';
import moment from 'moment';
import { SendOtpResponse } from '../dto/sendOtpResponse.dto';

@Injectable()
export class AuthSendOtpUseCase implements IUseCase {
  constructor(
    private readonly authOtpRepository: AuthOtpRepository,
    private readonly userRepository: OrganizationUserRepository
  ) {}
  async execute({
    phoneNumber,
    sendMethod
  }: SendOtpRequest): Promise<SendOtpResponse> {
    const { countryCode, nationalNumber } = validatePhoneNumber(phoneNumber);
    const validPhoneNumber = `${countryCode}${nationalNumber}`;
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
    if (
      isWhiteListPhoneNumber(
        config.whiteListPhoneNumber,
        `${countryCode}${nationalNumber}`
      )
    ) {
      return {
        isSucceed: true,
        phoneNumber: validPhoneNumber,
        tokenPrefix: null
      };
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
      const saveOtp = await this.authOtpRepository.create({
        id: null,
        organizationUserId: user.id,
        phoneNumber: `${nationalNumber}`,
        countryCode,
        type: AuthOtpType.login,
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
