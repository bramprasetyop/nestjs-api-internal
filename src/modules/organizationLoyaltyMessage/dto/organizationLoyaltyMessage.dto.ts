import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  OrganizationLoyaltyMessageModel,
  OrganizationLoyaltyMessageStatus
} from '@wahyoo/wahyoo-shared';
import { Organization } from 'src/modules/organization/dto/organization.dto';

registerEnumType(OrganizationLoyaltyMessageStatus, {
  name: 'OrganizationLoyaltyMessageStatus',
  description: 'OrganizationLoyaltyMessageStatus'
});

@ObjectType()
export class OrganizationLoyaltyMessage {
  constructor(model: OrganizationLoyaltyMessageModel) {
    this.id = model.id;
    this.organizationId = model.organizationId;
    this.pictureUrl = model.pictureUrl;
    this.message = model.message;
    this.status = model.status;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(() => ID)
  id: string;

  @Field(() => ID)
  organizationId: string;

  @Field(() => Organization)
  organization: Organization;

  @Field(() => String, { nullable: true })
  pictureUrl?: string;

  @Field(() => String)
  message: string;

  @Field(() => OrganizationLoyaltyMessageStatus)
  status: OrganizationLoyaltyMessageStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
