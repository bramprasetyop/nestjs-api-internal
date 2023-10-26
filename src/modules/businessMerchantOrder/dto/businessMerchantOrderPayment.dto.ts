import {
  Field,
  Float,
  ID,
  Int,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql';
import {
  BusinessMerchantOrderPaymentProcessor,
  BusinessMerchantOrderPaymentStatus,
  BusinessMerchantOrderPaymentModel
} from '@wahyoo/wahyoo-shared';
import { BusinessMerchantOrderMapper } from '../mappers/businessMerchantOrder.mapper';
import { XXenditPaymentMapper } from '../mappers/XXenditPayment.mapper';
import { BusinessMerchantOrder } from './businessMerchantOrder.dto';
import { XXenditPayment } from './XXenditPayment.dto';

registerEnumType(BusinessMerchantOrderPaymentProcessor, {
  name: 'BusinessMerchantOrderPaymentProcessor',
  description: 'BusinessMerchantOrderPaymentProcessor'
});

registerEnumType(BusinessMerchantOrderPaymentStatus, {
  name: 'BusinessMerchantOrderPaymentStatus',
  description: 'BusinessMerchantOrderPaymentStatus'
});

@ObjectType()
export class BusinessMerchantOrderPayment {
  constructor(model: BusinessMerchantOrderPaymentModel) {
    this.id = model.id;
    this.businessMerchantOrderId = model.businessMerchantOrderId;
    this.businessMerchantOrder = model.businessMerchantOrder
      ? BusinessMerchantOrderMapper.modelToDTO(model.businessMerchantOrder)
      : null;
    this.description = model.description;
    this.paymentProcessor = model.paymentProcessor;
    this.status = model.status;
    this.description = model.description;
    this._amountToBePaid = model._amountToBePaid;
    this.amountTotal = model.amountTotal;
    this._processorFee = model._processorFee;
    this.paidAt = model.paidAt;
    this.expiredAt = model.expiredAt;
    this.status = model.status;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
    this.xXenditPayment = model.xXenditPayment
      ? XXenditPaymentMapper.modelToDTO(model.xXenditPayment)
      : null;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  businessMerchantOrderId: string;

  @Field(type => BusinessMerchantOrder)
  businessMerchantOrder: BusinessMerchantOrder;

  @Field(type => String)
  description: string;

  @Field(type => BusinessMerchantOrderPaymentProcessor)
  paymentProcessor: BusinessMerchantOrderPaymentProcessor;

  @Field(type => BusinessMerchantOrderPaymentStatus)
  status: BusinessMerchantOrderPaymentStatus;

  @Field(type => Float)
  _amountToBePaid: number;

  @Field(type => Float)
  amountTotal: number;

  @Field(type => Float)
  _processorFee: number;

  @Field({ nullable: true })
  paidAt?: Date;

  @Field({ nullable: true })
  expiredAt?: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;

  @Field(() => XXenditPayment)
  xXenditPayment: XXenditPayment;
}
