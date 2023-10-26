import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { OrganizationUserModel } from '@wahyoo/wahyoo-shared';
import { OrganizationUserStatus } from '@wahyoo/wahyoo-shared/dist/constants/enums';
import { BusinessOutlet } from 'src/modules/businessOutlet/dto/businessOutlet.dto';
import { BusinessOutletMapper } from 'src/modules/businessOutlet/mappers/businessOutlet.mapper';
import { Organization } from 'src/modules/organization/dto/organization.dto';
import { UserMapper } from '../mappers/user.mapper';
import { XOrganizationUserWahyooUser } from './xOrganizationUserWahyooUser.dto';

registerEnumType(OrganizationUserStatus, {
  name: 'OrganizationUserStatus',
  description: 'OrganizationUserStatus'
});

@ObjectType()
export class OrganizationUser {
  constructor(model: OrganizationUserModel) {
    this.id = model.id;
    this.name = model.name;
    this.phoneNumber = model.phoneNumber;
    this.organizationId = model.organizationId;
    this.countryCode = model.countryCode;
    this.status = model.status;
    this.email = model.email;
    this.birthDate = model.birthDate;
    this.interestedBrand = model.interestedBrand;
    this.isInterestedNewBrand = model.isInterestedNewBrand;
    this.organizationKnowSource = model.organizationKnowSource;
    this.createdBy = model.createdBy;
    this.creator = model.creator ? UserMapper.modelToDTO(model.creator) : null;
    this.updatedBy = model.updatedBy;
    this.modifier = model.modifier
      ? UserMapper.modelToDTO(model.modifier)
      : null;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  organizationId: string;

  @Field(() => Organization)
  organization: Organization;

  @Field(() => [BusinessOutlet])
  businessOutlets: BusinessOutlet[];

  @Field(type => XOrganizationUserWahyooUser, { nullable: true })
  xOrganizationUserWahyooUser?: XOrganizationUserWahyooUser;

  @Field()
  name: string;

  @Field()
  countryCode: string;

  @Field()
  phoneNumber: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  birthDate: Date;

  @Field({ nullable: true })
  interestedBrand: string;

  @Field({ nullable: true })
  isInterestedNewBrand: boolean;

  @Field({ nullable: true })
  organizationKnowSource: string;

  @Field(() => OrganizationUserStatus)
  status: OrganizationUserStatus;

  @Field(type => ID, { nullable: true })
  createdBy?: string;

  @Field(type => ID, { nullable: true })
  updatedBy?: string;

  @Field(type => OrganizationUser, { nullable: true })
  creator?: OrganizationUser;

  @Field(type => OrganizationUser, { nullable: true })
  modifier?: OrganizationUser;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
