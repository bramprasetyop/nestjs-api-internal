import { Module } from '@nestjs/common';
import {
  AuthOtpModel,
  InjectionKey,
  OrganizationUserBusinessModel,
  OrganizationUserBusinessOutletModel,
  OrganizationUserModel,
  config
} from '@wahyoo/wahyoo-shared';
import { AuthOtpResolver } from './auth.resolver';
import { AuthOtpRepository } from './repositories/authOtp.repository';
import { AuthLoginOtpUseCase } from './useCases/auth.loginOtp.usecase';
import { AuthSendOtpUseCase } from './useCases/auth.sendOtp.usecase';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth.jwt.strategy';
import { OrganizationUserRepository } from './repositories/organizationUser.repository';
import { RefreshTokenUseCase } from './useCases/refreshToken.usecase';
import { VerifyPhoneNumberUseCase } from './useCases/auth.verifyPhoneNumber.usecase';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: config.jwtSessionSecret,
      signOptions: { expiresIn: config.jwtSessionExpiry }
    })
  ],
  providers: [
    AuthOtpResolver,
    AuthLoginOtpUseCase,
    AuthSendOtpUseCase,
    RefreshTokenUseCase,
    VerifyPhoneNumberUseCase,
    AuthOtpRepository,
    OrganizationUserRepository,
    {
      provide: InjectionKey.AUTH_OTP_MODEL,
      useValue: AuthOtpModel
    },
    {
      provide: InjectionKey.ORGANIZATION_USER_MODEL,
      useValue: OrganizationUserModel
    },
    {
      provide: InjectionKey.ORGANIZATION_USER_BUSINESS_MODEL,
      useValue: OrganizationUserBusinessModel
    },
    {
      provide: InjectionKey.ORGANIZATION_USER_BUSINESS_OUTLET_MODEL,
      useValue: OrganizationUserBusinessOutletModel
    },
    JwtStrategy
  ]
})
export class AuthModule {}
