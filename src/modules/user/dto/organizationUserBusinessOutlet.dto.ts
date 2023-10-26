import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  OrganizationUserBusinessOutletModel,
  OrganizationUserBusinessOutletStatus
} from '@wahyoo/wahyoo-shared';
import { BusinessOutlet } from 'src/modules/businessOutlet/dto/businessOutlet.dto';
import { BusinessOutletMapper } from 'src/modules/businessOutlet/mappers/businessOutlet.mapper';
import { UserMapper } from '../mappers/user.mapper';
import { OrganizationUser } from './user.dto';

@ObjectType()
export class OrganizationUserBusinessOutlet {
  constructor(model: OrganizationUserBusinessOutletModel) {
    this.id = model.id;
    this.organizationUserId = model.organizationUserId;
    this.businessOutletId = model.businessOutletId;
    this.businessOutlet = model.businessOutlet
      ? BusinessOutletMapper.modelToDTO(model.businessOutlet)
      : null;
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

  @Field(type => ID)
  organizationUserId: string;

  @Field(() => OrganizationUser, { nullable: true })
  organizationUser: OrganizationUser;

  @Field(type => ID)
  businessOutletId: string;

  @Field(() => BusinessOutlet)
  businessOutlet: BusinessOutlet;

  @Field(type => [String])
  roles: any;

  @Field(type => OrganizationUserBusinessOutletStatus)
  status: OrganizationUserBusinessOutletStatus;

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
