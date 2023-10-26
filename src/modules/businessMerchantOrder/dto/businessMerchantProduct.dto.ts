import {
  Field,
  Float,
  ID,
  Int,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql';
import {
  BusinessMerchantProductModel,
  BusinessMerchantProductType,
  BusinessMerchantProductStatus
} from '@wahyoo/wahyoo-shared';
import { Business } from 'src/modules/business/dto/business.dto';
import { BusinessMapper } from 'src/modules/business/mappers/business.mapper';

registerEnumType(BusinessMerchantProductType, {
  name: 'BusinessMerchantProductType',
  description: 'BusinessMerchantProductType'
});

registerEnumType(BusinessMerchantProductStatus, {
  name: 'BusinessMerchantProductStatus',
  description: 'BusinessMerchantProductStatus'
});

@ObjectType()
export class BusinessMerchantProduct {
  constructor(model: BusinessMerchantProductModel) {
    this.id = model.id;
    this.businessId = model.businessId;
    this.business = model.business
      ? BusinessMapper.modelToDTO(model.business)
      : null;
    this.name = model.name;
    this.slug = model.slug;
    this.code = model.code;
    this.description = model.description;
    this.termsAndConditions = model.termsAndConditions;
    this.priceInIdr = model.priceInIdr;
    this.priceBeforeDiscount = model.priceBeforeDiscount;
    this.imageUrl = model.imageUrl;
    this.type = model.type;
    this.status = model.status;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  businessId: string;

  @Field(type => Business)
  business: Business;

  @Field(type => String)
  name: string;

  @Field(type => String)
  slug: string;

  @Field(type => String)
  code: string;

  @Field(type => String, { nullable: true })
  description?: string;

  @Field(type => String, { nullable: true })
  termsAndConditions?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field(type => Float, { nullable: true })
  priceBeforeDiscount?: number;

  @Field(type => Float)
  priceInIdr: number;

  @Field(type => BusinessMerchantProductType)
  type: BusinessMerchantProductType;

  @Field(type => BusinessMerchantProductStatus)
  status: BusinessMerchantProductStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
