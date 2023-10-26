import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  BusinessOutletModel,
  OrganizationUserModel
} from '@wahyoo/wahyoo-shared';
import { OrganizationUserStatus } from '@wahyoo/wahyoo-shared/dist/constants/enums';
import { ICurrentUserArgs } from 'src/modules/auth/repositories/currentUser.interface';
import { BusinessOutlet } from 'src/modules/businessOutlet/dto/businessOutlet.dto';
import { BusinessOutletMapper } from 'src/modules/businessOutlet/mappers/businessOutlet.mapper';
import { Organization } from 'src/modules/organization/dto/organization.dto';
import { OrganizationUser } from './user.dto';
import { XOrganizationUserWahyooUser } from './xOrganizationUserWahyooUser.dto';

export interface CurrentUserResponseArgs {
  model: OrganizationUserModel;
  currentUser: ICurrentUserArgs;
}

@ObjectType()
export class CurrentUserResponse extends OrganizationUser {
  constructor({
    model,
    currentUser
  }: {
    model: OrganizationUserModel;
    currentUser: any;
  }) {
    super(model);
    this.roles = currentUser.roles;
    this.permissions = currentUser.permissions;
    this.businessPermissions = currentUser.businessPermissions;
    this.outletPermissions = currentUser.outletPermissions;
    this.organizationLevel = currentUser.organizationLevel;
    this.businessOutletIds = currentUser.businessOutletIds;

    const businessOutletModels: BusinessOutletModel[] = [];
    if (
      model.organizationUserBusinessOutlets &&
      model.organizationUserBusinessOutlets.length > 0
    ) {
      model.organizationUserBusinessOutlets.forEach(el => {
        if (el.businessOutlet) {
          businessOutletModels.push(el.businessOutlet);
        }
      });
    }
    this.businessOutlets = BusinessOutletMapper.modelsToDTOs(
      businessOutletModels
    );
    this.businessIds = currentUser.businessIds;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  organizationId: string;

  @Field(() => Organization)
  organization: Organization;

  @Field(() => [BusinessOutlet], { nullable: true })
  businessOutlets: BusinessOutlet[];

  @Field(type => XOrganizationUserWahyooUser, { nullable: true })
  xOrganizationUserWahyooUser?: XOrganizationUserWahyooUser;

  @Field()
  name: string;

  @Field()
  countryCode: string;

  @Field()
  phoneNumber: string;

  @Field()
  status: OrganizationUserStatus;

  @Field({ nullable: true })
  isConnectedToWahyooUser: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;

  @Field(type => [String], { nullable: true })
  roles?: [string];
  @Field(type => [String], { nullable: true })
  permissions?: [string];
  @Field(type => [String], { nullable: true })
  businessPermissions?: [string];
  @Field(type => [String], { nullable: true })
  outletPermissions?: [string];
  @Field(type => Int)
  organizationLevel?: number;
  @Field(type => [String], { nullable: true })
  businessOutletIds?: [string];
  @Field(type => [String], { nullable: true })
  businessIds?: [string];
}
