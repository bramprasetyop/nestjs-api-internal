import { Field, ID, ObjectType } from '@nestjs/graphql';
import { XXenditPaymentModel } from '@wahyoo/wahyoo-shared';
import JSON from 'graphql-type-json';

@ObjectType()
export class XXenditPayment {
  constructor(model: XXenditPaymentModel) {
    this.id = model.id;
    this.xOrderId = model.xOrderId;
    this.xTransactionId = model.xTransactionId;
    this.xStatus = model.xStatus;
    this.xToken = model.xToken;
    this.xPaymentUrl = model.xPaymentUrl;
    this.xRequestJson = model.xRequestJson;
    this.xChargeResponseJson = model.xChargeResponseJson;
    this.xPaymentResponseJson = model.xPaymentResponseJson;
    this.businessMerchantOrderPaymentId = model.businessMerchantOrderPaymentId;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID, { nullable: true })
  xOrderId?: string;

  @Field(type => ID, { nullable: true })
  xTransactionId?: string;

  @Field(type => String)
  xStatus: string;

  @Field(type => String, { nullable: true })
  xToken?: string;

  @Field(type => String, { nullable: true })
  xPaymentUrl?: string;

  @Field(type => JSON, { nullable: true })
  xRequestJson?: object;

  @Field(type => JSON, { nullable: true })
  xChargeResponseJson?: object;

  @Field(type => JSON, { nullable: true })
  xPaymentResponseJson?: object;

  @Field(type => ID, { nullable: true })
  businessMerchantOrderPaymentId?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
