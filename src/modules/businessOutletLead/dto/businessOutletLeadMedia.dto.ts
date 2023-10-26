import {
  Field,
  Float,
  ID,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql';
import {
  BusinessOutletLeadLogModel,
  BusinessOutletLeadMediaModel,
  BusinessOutletLeadModel,
  BusinessOutletLeadOngoingStatus,
  BusinessOutletLeadRejectedReason,
  BusinessOutletLeadStatus
} from '@wahyoo/wahyoo-shared';
import { Business } from 'src/modules/business/dto/business.dto';
import { BusinessOutlet } from 'src/modules/businessOutlet/dto/businessOutlet.dto';
import { Organization } from 'src/modules/organization/dto/organization.dto';
import { UserMapper } from 'src/modules/user/mappers/user.mapper';
import { OrganizationUser } from 'src/modules/user/dto/user.dto';

@ObjectType()
export class BusinessOutletLeadMedia {
  constructor(model: BusinessOutletLeadMediaModel) {
    this.id = model.id;
    this.businessOutletLeadId = model.businessOutletLeadId;
    this.type = model.type;
    this.url = model.url;
    this.category = model.category;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  businessOutletLeadId: string;

  @Field()
  type: string;

  @Field()
  url: string;

  @Field()
  category: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
