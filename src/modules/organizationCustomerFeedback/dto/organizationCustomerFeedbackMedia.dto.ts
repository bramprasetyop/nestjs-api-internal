import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { OrganizationCustomerFeedbackMediaModel } from '@wahyoo/wahyoo-shared';
import {
  OrganizationCustomerFeedbackMediaCategory,
  OrganizationCustomerFeedbackMediaType
} from '@wahyoo/wahyoo-shared/dist/constants/enums';

registerEnumType(OrganizationCustomerFeedbackMediaType, {
  name: 'OrganizationCustomerFeedbackMediaType',
  description: 'OrganizationCustomerFeedbackMediaType'
});

registerEnumType(OrganizationCustomerFeedbackMediaCategory, {
  name: 'OrganizationCustomerFeedbackMediaCategory',
  description: 'OrganizationCustomerFeedbackMediaCategory'
});

@ObjectType()
export class OrganizationCustomerFeedbackMedia {
  constructor(model: OrganizationCustomerFeedbackMediaModel) {
    this.id = model.id;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id?: string;

  @Field(type => ID)
  organizationCustomerFeedbackId?: string;

  @Field(type => OrganizationCustomerFeedbackMediaType)
  type: string;

  @Field(type => String)
  url: string;

  @Field(type => OrganizationCustomerFeedbackMediaCategory)
  category?: string;

  @Field(type => Date)
  createdAt?: Date;

  @Field(type => Date)
  updatedAt?: Date;

  @Field(type => Date, { nullable: true })
  deletedAt?: Date;
}
