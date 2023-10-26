import {
  Field,
  Float,
  ID,
  Int,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql';

import {
  OrganizationCustomerFeedbackModel,
  OrganizationCustomerFeedbackStatus
} from '@wahyoo/wahyoo-shared';
import { OrganizationCustomerFeedbackMediaMapper } from '../mappers/organizationCustomerFeedbackMedia.mapper';
import { OrganizationCustomerFeedbackMedia } from './organizationCustomerFeedbackMedia.dto';
registerEnumType(OrganizationCustomerFeedbackStatus, {
  name: 'OrganizationCustomerFeedbackStatus',
  description: 'OrganizationCustomerFeedbackStatus'
});

@ObjectType()
export class OrganizationCustomerFeedback {
  constructor(model: OrganizationCustomerFeedbackModel) {
    this.id = model.id;
    this._organizationCustomerCountryCode =
      model._organizationCustomerCountryCode;
    this._organizationCustomerName = model._organizationCustomerName;
    this._organizationCustomerPhoneNumber =
      model._organizationCustomerPhoneNumber;
    this._organizationLoyaltyMessageMessage =
      model._organizationLoyaltyMessageMessage;
    this.businessOutletId = model.businessOutletId;
    this.comment = model.comment;
    this.customerLat = model.customerLat;
    this.customerLng = model.customerLng;
    this.organizationCustomerFeedbackMedias = OrganizationCustomerFeedbackMediaMapper.modelsToDTOs(
      model.organizationCustomerFeedbackMedias
    );
    this.organizationCustomerId = model.organizationCustomerId;
    this.organizationLoyaltyMessageId = model.organizationLoyaltyMessageId;
    this.starRating = model.starRating;
    this.status = model.status;
    this.tagPrice = model.tagPrice;
    this.tagTaste = model.tagTaste;
    this.tagFoodQuality = model.tagFoodQuality;
    this.tagDeliveryTime = model.tagDeliveryTime;
    this.tagPackaging = model.tagPackaging;
    this.tagComment = model.tagComment;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id?: string;

  @Field(type => ID)
  organizationCustomerId?: string;

  @Field(type => ID)
  businessOutletId?: string;

  @Field(type => OrganizationCustomerFeedbackStatus)
  status?: string;

  @Field(type => String)
  _organizationCustomerName?: string;

  @Field(type => String)
  _organizationCustomerCountryCode?: string;

  @Field(type => String)
  _organizationCustomerPhoneNumber?: string;

  @Field(type => ID)
  organizationLoyaltyMessageId?: string;

  @Field(type => String)
  _organizationLoyaltyMessageMessage?: string;

  @Field(type => String, { nullable: true })
  comment?: string;

  @Field(type => Int)
  starRating?: number;

  @Field(type => Boolean)
  tagPackaging?: boolean;

  @Field(type => Boolean)
  tagFoodQuality?: boolean;

  @Field(type => Boolean)
  tagTaste?: boolean;

  @Field(type => Boolean)
  tagPrice?: boolean;

  @Field(type => Boolean)
  tagDeliveryTime?: boolean;

  @Field(type => String, { nullable: true })
  tagComment?: string;

  @Field(type => Float, { nullable: true })
  customerLat?: number;

  @Field(type => Float, { nullable: true })
  customerLng?: number;

  @Field(type => Date)
  createdAt?: Date;

  @Field(type => Date)
  updatedAt?: Date;

  @Field(type => Date, { nullable: true })
  deletedAt?: Date;

  @Field(type => OrganizationCustomerFeedbackMedia)
  organizationCustomerFeedbackMedias?: OrganizationCustomerFeedbackMedia[];
}
