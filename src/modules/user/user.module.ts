import { forwardRef, HttpModule, HttpService, Module } from '@nestjs/common';
import {
  InjectionKey,
  OrganizationUserModel,
  OrganizationUserBusinessModel,
  OrganizationUserBusinessOutletModel,
  BusinessOutletModel,
  BusinessModel,
  XOrganizationUserWahyooUserModel,
  OrganizationModel,
  AuthOtpModel,
  BusinessOutletLeadModel,
  config
} from '@wahyoo/wahyoo-shared';
import { InternalAPIService } from '../external/internalAPI.service';
import { JWTService } from '../external/jwt.service';
import { OrganizationUserBusinessOutletBatchByBusinessOutletIdLoader } from './organizationUserBusinessOutlet.batchByBusinessOutletId.loader';
import { OrganizationUserBusinessOutletBatchByOrganizationUserIdLoader } from './organizationUserBusinessOutlet.batchByOrganizationUserId.loader';
import { OrganizationUserBusinessOutletResolver } from './organizationUserBusinessOutlet.resolver';
import { OrganizationUserRepository } from './repositories/organizationUser.repository';
import { OrganizationUserBusinessOutletRepository } from './repositories/organizationUserBusinessOutlet.repository';
import { OrganizationUserBusinessRepository } from './repositories/organizationUserBusiness.repository';
import { XOrganizationUserWahyooUserRepository } from './repositories/xOrganizationUserWahyooUser.repository';
import { OrganizationUserCreateUseCase } from './useCases/organizationUser.create.usecase';
import { OrganizationUserDeleteUseCase } from './useCases/organizationUser.delete.usecase';
import { OrganizationUserGetByIdUseCase } from './useCases/organizationUser.getById.usecase';
import { OrganizationUserGetListUseCase } from './useCases/organizationUser.getList.usecase';
import { OrganizationUserUpdateUseCase } from './useCases/organizationUser.update.usecase';
import { OrganizationUserBusinessOutletCreateUseCase } from './useCases/organizationUserBusinessOutlet.create.usecase';
import { OrganizationUserBusinessOutletDeleteUseCase } from './useCases/organizationUserBusinessOutlet.delete.usecase';
import { OrganizationUserBusinessOutletGetByIdUseCase } from './useCases/organizationUserBusinessOutlet.getById.usecase';
import { OrganizationUserBusinessOutletGetListUseCase } from './useCases/organizationUserBusinessOutlet.getList.usecase';
import { OrganizationUserBusinessOutletUpdateUseCase } from './useCases/organizationUserBusinessOutlet.update.usecase';
import { OrganizationUserBusinessCreateUseCase } from './useCases/organizationUserBusiness.create.usecase';
import { OrganizationUserBusinessDeleteUseCase } from './useCases/organizationUserBusiness.delete.usecase';
import { OrganizationUserBusinessGetByIdUseCase } from './useCases/organizationUserBusiness.getById.usecase';
import { OrganizationUserBusinessGetListUseCase } from './useCases/organizationUserBusiness.getList.usecase';
import { OrganizationUserBusinessUpdateUseCase } from './useCases/organizationUserBusiness.update.usecase';
import { OrganizationUserGetListOutletEmployeeUseCase } from './useCases/organizationUser.getListOutletEmployee.usecase';
import { OrganizationUserGetOutletEmployeeUseCase } from './useCases/organizationUser.getOutletEmployee.usecase';
import { OrganizationUserCreateOutletEmployeeUseCase } from './useCases/organizationUser.createOutletEmployee.usecase';
import { OrganizationUserUpdateOutletEmployeeUseCase } from './useCases/organizationUser.updateOutletEmployee.usecase';
import { OrganizationUserDeleteOutletEmployeeUseCase } from './useCases/organizationUser.deleteOutletEmployee.usecase';
import { UserCurrentUserUseCase } from './useCases/user.currentUser.usecase';
import { WahyooUserCheckUseCase } from './useCases/user.wahyooUserCheck.usecase';
import { UserResolver } from './user.resolver';
import { OrganizationUserBusinessResolver } from './organizationUserBusiness.resolver';
import { OrganizationUserSingleByIdLoader } from './user.singleById.loader';
import { XOrganizationUserWahyooUserSingleByOrganizationUserIdLoader } from './xOrganizationUserWahyooUser.singleByOrganizationUserId.loader';
import { OrganizationUserBusinessRolesUseCase } from './useCases/organizationUserBusinessRoles.usecase';
import { OrganizationUserBusinessOutletRolesUseCase } from './useCases/organizationUserBusinessOutletRoles.usecase';
import { BusinessOutletModule } from '../businessOutlet/businessOutlet.module';
import { OrganizationUserRegisterUseCase } from './useCases/organizationUser.register.usecase';
import { OrganizationUserRegisterSendOtpUseCase } from './useCases/organizationUser.registerSendOtp.usecase';
import { AuthOtpRepository } from './repositories/authOtp.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => BusinessOutletModule),
    PassportModule,
    JwtModule.register({
      secret: config.jwtSessionSecret,
      signOptions: { expiresIn: config.jwtSessionExpiry }
    })
  ],
  providers: [
    UserResolver,
    OrganizationUserBusinessResolver,
    OrganizationUserBusinessOutletResolver,
    UserCurrentUserUseCase,
    OrganizationUserRepository,
    OrganizationUserCreateUseCase,
    OrganizationUserUpdateUseCase,
    OrganizationUserDeleteUseCase,
    OrganizationUserGetByIdUseCase,
    OrganizationUserGetListUseCase,
    OrganizationUserRegisterUseCase,
    OrganizationUserRegisterSendOtpUseCase,
    OrganizationUserBusinessOutletCreateUseCase,
    OrganizationUserBusinessOutletUpdateUseCase,
    OrganizationUserBusinessOutletDeleteUseCase,
    OrganizationUserBusinessOutletGetListUseCase,
    OrganizationUserBusinessOutletGetByIdUseCase,
    OrganizationUserBusinessOutletRolesUseCase,
    OrganizationUserBusinessRolesUseCase,
    OrganizationUserBusinessCreateUseCase,
    OrganizationUserBusinessUpdateUseCase,
    OrganizationUserBusinessDeleteUseCase,
    OrganizationUserBusinessGetListUseCase,
    OrganizationUserBusinessGetByIdUseCase,
    OrganizationUserGetListOutletEmployeeUseCase,
    OrganizationUserGetOutletEmployeeUseCase,
    OrganizationUserCreateOutletEmployeeUseCase,
    OrganizationUserUpdateOutletEmployeeUseCase,
    OrganizationUserDeleteOutletEmployeeUseCase,
    InternalAPIService,
    JWTService,
    WahyooUserCheckUseCase,
    XOrganizationUserWahyooUserRepository,
    OrganizationUserBusinessOutletRepository,
    OrganizationUserBusinessRepository,
    AuthOtpRepository,
    OrganizationUserSingleByIdLoader,
    OrganizationUserBusinessOutletBatchByBusinessOutletIdLoader,
    OrganizationUserBusinessOutletBatchByOrganizationUserIdLoader,
    XOrganizationUserWahyooUserSingleByOrganizationUserIdLoader,
    {
      provide: InjectionKey.ORGANIZATION_USER_MODEL,
      useValue: OrganizationUserModel
    },
    {
      provide: InjectionKey.X_ORGANIZATION_USER_WAHYOO_USER_MODEL,
      useValue: XOrganizationUserWahyooUserModel
    },
    {
      provide: InjectionKey.ORGANIZATION_USER_BUSINESS_MODEL,
      useValue: OrganizationUserBusinessModel
    },
    {
      provide: InjectionKey.ORGANIZATION_USER_BUSINESS_OUTLET_MODEL,
      useValue: OrganizationUserBusinessOutletModel
    },
    {
      provide: InjectionKey.BUSINESS_OUTLET_MODEL,
      useValue: BusinessOutletModel
    },
    {
      provide: InjectionKey.BUSINESS_OUTLET_LEAD_MODEL,
      useValue: BusinessOutletLeadModel
    },
    {
      provide: InjectionKey.BUSINESS_MODEL,
      useValue: BusinessModel
    },
    {
      provide: InjectionKey.ORGANIZATION_MODEL,
      useValue: OrganizationModel
    },
    {
      provide: InjectionKey.AUTH_OTP_MODEL,
      useValue: AuthOtpModel
    }
  ],
  exports: [
    OrganizationUserRepository,
    XOrganizationUserWahyooUserRepository,
    OrganizationUserBusinessOutletRepository,
    OrganizationUserSingleByIdLoader,
    OrganizationUserBusinessOutletBatchByBusinessOutletIdLoader,
    XOrganizationUserWahyooUserSingleByOrganizationUserIdLoader,
    OrganizationUserBusinessRepository,
    OrganizationUserBusinessOutletBatchByOrganizationUserIdLoader
  ]
})
export class UserModule {}
