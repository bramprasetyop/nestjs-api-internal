import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Loader } from 'src/commons/loader';
import { OrganizationUser } from '../user/dto/user.dto';
import { OrganizationUserSingleByIdLoader } from '../user/user.singleById.loader';
import { CurrentUser, GqlAuthGuard } from './auth.jwt.guard';
import { AuthOtp } from './dto/authOtp';
import { LoginOtpRequest } from './dto/loginOtpRequest.dto';
import { LoginOtpResponse } from './dto/loginOtpResponse.dto';
import { SendOtpRequest } from './dto/sendOtpRequest.dto';
import { SendOtpResponse } from './dto/sendOtpResponse.dto';
import { VerifyPhoneNumberRequest } from './dto/verifyPhoneNumberRequest.dto';
import { ICurrentUserArgs } from './repositories/currentUser.interface';
import { AuthLoginOtpUseCase } from './useCases/auth.loginOtp.usecase';
import { AuthSendOtpUseCase } from './useCases/auth.sendOtp.usecase';
import { VerifyPhoneNumberUseCase } from './useCases/auth.verifyPhoneNumber.usecase';
import { RefreshTokenUseCase } from './useCases/refreshToken.usecase';

@Resolver(LoginOtpResponse)
export class AuthOtpResolver {
  constructor(
    private readonly authLoginOtpUseCase: AuthLoginOtpUseCase,
    private readonly authSendOtpUseCase: AuthSendOtpUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly verifyPhoneNumberUseCase: VerifyPhoneNumberUseCase
  ) {}

  @Mutation(() => LoginOtpResponse)
  async loginOTP(
    @Args('input') requestDTO: LoginOtpRequest
  ): Promise<LoginOtpResponse> {
    return await this.authLoginOtpUseCase.execute(requestDTO);
  }

  @Mutation(() => SendOtpResponse)
  async sendOTPLogin(
    @Args('input') requestDTO: SendOtpRequest
  ): Promise<SendOtpResponse> {
    return await this.authSendOtpUseCase.execute(requestDTO);
  }

  @Mutation(() => Boolean)
  async verifyPhoneNumber(
    @Args('input') requestDTO: VerifyPhoneNumberRequest
  ): Promise<Boolean> {
    return await this.verifyPhoneNumberUseCase.execute(requestDTO);
  }

  // @Mutation(() => LoginOtpResponse)
  // @UseGuards(GqlAuthGuard)
  // async refreshToken(
  //   @CurrentUser() currentUser: ICurrentUserArgs
  // ): Promise<LoginOtpResponse> {
  //   return await this.refreshTokenUseCase.execute(currentUser);
  // }

  // FIELD DATA LOADER
  @ResolveField(() => OrganizationUser)
  async user(
    @Parent() loginOTP: LoginOtpResponse,
    @Loader(OrganizationUserSingleByIdLoader.name)
    organizationUserSingleByIdLoader: DataLoader<
      OrganizationUser['id'],
      OrganizationUser
    >
  ): Promise<OrganizationUser> {
    try {
      if (loginOTP.organizationUserId) {
        const response = await organizationUserSingleByIdLoader.load(
          loginOTP.organizationUserId
        );
        return response;
      }
      return null;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
