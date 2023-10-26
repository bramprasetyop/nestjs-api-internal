import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  OrganizationUserBusinessModel,
  OrganizationUserBusinessStatus
} from '@wahyoo/wahyoo-shared';
import { Business } from 'src/modules/business/dto/business.dto';
import { UserMapper } from '../mappers/user.mapper';
import { OrganizationUser } from './user.dto';

registerEnumType(OrganizationUserBusinessStatus, {
  name: 'OrganizationUserBusinessStatus',
  description: 'OrganizationUserBusinessStatus'
});

@ObjectType()
export class OrganizationUserBusiness {
  constructor(model: OrganizationUserBusinessModel) {
    this.id = model.id;
    this.organizationUserId = model.organizationUserId;
    this.businessId = model.businessId;
    this.status = model.status;
    this.roles = model.roles;
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

  @Field(type => ID, { nullable: true })
  organizationUserId: string;

  @Field(() => OrganizationUser, { nullable: true })
  organizationUser: OrganizationUser;

  @Field(type => ID)
  businessId: string;

  @Field(() => Business)
  business: Business;

  @Field(type => [String])
  roles: any;

  @Field(type => OrganizationUserBusinessStatus)
  status: OrganizationUserBusinessStatus;

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
