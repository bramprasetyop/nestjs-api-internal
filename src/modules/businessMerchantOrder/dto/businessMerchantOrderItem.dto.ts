import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { BusinessMerchantOrderItemModel } from '@wahyoo/wahyoo-shared';
import { BusinessMerchantOrderMapper } from '../mappers/businessMerchantOrder.mapper';
import { BusinessMerchantProductMapper } from '../mappers/businessMerchantProduct.mapper';
import { BusinessMerchantOrder } from './businessMerchantOrder.dto';
import { BusinessMerchantProduct } from './businessMerchantProduct.dto';

@ObjectType()
export class BusinessMerchantOrderItem {
  constructor(model: BusinessMerchantOrderItemModel) {
    this.id = model.id;
    this.businessMerchantOrderId = model.businessMerchantOrderId;
    this.businessMerchantOrder = model.businessMerchantOrder
      ? BusinessMerchantOrderMapper.modelToDTO(model.businessMerchantOrder)
      : null;
    this.businessMerchantProductId = model.businessMerchantProductId;
    this.businessMerchantProduct = model.businessMerchantProduct
      ? BusinessMerchantProductMapper.modelToDTO(model.businessMerchantProduct)
      : null;
    this._businessMerchantProductName = model._businessMerchantProductName;
    this._businessMerchantProductCode = model._businessMerchantProductCode;
    this._businessMerchantProductDescription =
      model._businessMerchantProductDescription;
    this._businessMerchantProductTermsAndConditions =
      model._businessMerchantProductTermsAndConditions;
    this._businessMerchantProductPriceInIdr =
      model._businessMerchantProductPriceInIdr;
    this.qty = model.qty;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  businessMerchantOrderId: string;

  @Field(type => BusinessMerchantOrder)
  businessMerchantOrder: BusinessMerchantOrder;

  @Field(type => ID)
  businessMerchantProductId: string;

  @Field(type => BusinessMerchantProduct)
  businessMerchantProduct: BusinessMerchantProduct;

  @Field(type => ID)
  _businessMerchantProductName: string;

  @Field(type => String)
  _businessMerchantProductCode: string;

  @Field(type => String)
  _businessMerchantProductDescription: string;

  @Field(type => String)
  _businessMerchantProductTermsAndConditions: string;

  @Field(type => Float)
  _businessMerchantProductPriceInIdr: number;

  @Field(type => Int)
  qty: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
