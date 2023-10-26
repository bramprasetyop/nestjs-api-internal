import { Inject } from '@nestjs/common';
import { AuthOtp } from '../dto/authOtp';
import { AuthOtpModel, AuthOtpType, InjectionKey } from '@wahyoo/wahyoo-shared';
import {
  FindByCodeArgs,
  FindByRegisterCodeArgs,
  FindLastValidOtpArgs,
  IAuthOtpRepository
} from './authOtp.interface';

export class AuthOtpRepository implements IAuthOtpRepository {
  constructor(
    @Inject(InjectionKey.AUTH_OTP_MODEL)
    private readonly authOtpModel: typeof AuthOtpModel
  ) {}
  async findByCode(arg: FindByCodeArgs): Promise<any> {
    const { sendMethod, organizationUserId } = arg;
    let { code } = arg;
    let whereClause = {
      code,
      tokenCode: null,
      sendMethod,
      organizationUserId,
      isUsed: false,
      isRevoked: false
    };
    if (sendMethod === 'missed_call') {
      whereClause.code = null;
      whereClause.tokenCode = code;
    }
    const authOtp = await this.authOtpModel.findOne({
      where: whereClause
    });

    if (authOtp) {
      return authOtp;
    }
    return null;
  }
  async updateUsedOtp(otpId): Promise<any> {
    return await this.authOtpModel.update(
      {
        isUsed: true
      },
      {
        where: {
          id: otpId
        }
      }
    );
  }
  async create(dto: AuthOtp): Promise<any> {
    let transaction;
    try {
      const {
        organizationUserId,
        phoneNumber,
        countryCode,
        type,
        isUsed,
        validUntil,
        code,
        tokenPrefix,
        tokenCode,
        isRevoked,
        providerSms,
        providerWhatsapp,
        providerMissedCall,
        sendMethod
      } = dto;
      let { counterAttempt } = dto;

      const lastOTPCode = await this.authOtpModel.findOne({
        where: {
          phoneNumber,
          countryCode,
          organizationUserId
        },
        order: [['createdAt', 'DESC']]
      });

      transaction = await this.authOtpModel.sequelize.transaction();

      if (lastOTPCode && !lastOTPCode.isRevoked) {
        await lastOTPCode.update({ isRevoked: true }, { transaction });
      }

      if (lastOTPCode && !lastOTPCode.isUsed) {
        counterAttempt = lastOTPCode.counterAttempt + 1;
      }

      const authOtp = await this.authOtpModel.create(
        {
          organizationUserId,
          phoneNumber,
          countryCode,
          type,
          isUsed,
          validUntil,
          code,
          tokenPrefix,
          counterAttempt,
          tokenCode,
          isRevoked,
          providerSms,
          providerWhatsapp,
          providerMissedCall,
          sendMethod
        },
        { transaction }
      );

      await transaction.commit();
      return authOtp;
    } catch (error) {
      await transaction.rollback();
      throw new Error('cannot create OTP Code');
    }
  }
  async findLastValidOtp(arg: FindLastValidOtpArgs): Promise<any> {
    const { sendMethod, organizationUserId, type } = arg;
    let whereClause = {
      type,
      sendMethod,
      organizationUserId,
      isUsed: false,
      isRevoked: false
    };
    const authOtp = await this.authOtpModel.findOne({
      where: whereClause,
      order: [['createdAt', 'DESC']]
    });

    if (authOtp) {
      return authOtp;
    }
    return null;
  }
  async incrementVerifyAttempt(otpId): Promise<any> {
    return await this.authOtpModel.increment('verify_attempt', {
      where: {
        id: otpId
      }
    });
  }
  async updateFailedUsedOtp(otpId): Promise<any> {
    return await this.authOtpModel.update(
      {
        isUsed: true,
        isRevoked: true
      },
      {
        where: {
          id: otpId
        }
      }
    );
  }
  async findByRegisterCode(arg: FindByRegisterCodeArgs): Promise<AuthOtpModel> {
    const { sendMethod } = arg;
    let { code } = arg;
    let whereClause = {
      code,
      tokenCode: null,
      sendMethod,
      type: AuthOtpType.register,
      isUsed: false,
      isRevoked: false
    };
    if (sendMethod === 'missed_call') {
      whereClause.code = null;
      whereClause.tokenCode = code;
    }
    const authOtp = await this.authOtpModel.findOne({
      where: whereClause
    });

    if (authOtp) {
      return authOtp;
    }
    return null;
  }
}
