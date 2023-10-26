import {
  Field,
  Float,
  ID,
  InputType,
  Int,
  registerEnumType
} from '@nestjs/graphql';
import { SalesOrderStatus } from '@wahyoo/wahyoo-shared';

registerEnumType(SalesOrderStatus, {
  name: 'SalesOrderStatus',
  description: 'sales order status'
});

@InputType()
export class SalesOrderBusinessMenuModifierItemInput {
  salesOrderId?: string;

  @Field(type => ID)
  salesOrderBusinessMenuItemId: string;

  @Field(type => ID)
  businessMenuModifierItemId: string;

  @Field(type => String)
  _businessMenuModifierItemName: string;

  @Field(type => String)
  _businessMenuModifierName: string;

  @Field(type => Int)
  sequence: number;
}

@InputType()
export class SalesOrderBusinessMenuItemInput {
  salesOrderId?: string;

  @Field(type => ID)
  businessMenuItemId: string;

  @Field(type => Int)
  sequence: number;

  @Field(type => Int)
  quantity: number;

  @Field()
  _businessItemName: String;

  @Field(type => Float)
  _businessItemPrice: number;

  @Field(type => Float)
  _businessItemBasePrice: number;

  @Field()
  notes: string;

  @Field(type => [SalesOrderBusinessMenuModifierItemInput])
  salesOrderBusinessMenuModifierItems: SalesOrderBusinessMenuModifierItemInput[];
}

@InputType()
export class SalesOrderSyncInput {
  organizationId: string;

  businessId: string;

  @Field(type => ID)
  businessOutletId: string;

  @Field(type => ID)
  businessSalesChannelId: string;

  @Field(type => ID, { nullable: true })
  businessPaymentTypeId?: string;

  @Field({ nullable: true })
  businessPaymentTypeOther?: string;

  @Field(type => SalesOrderStatus)
  status: SalesOrderStatus;

  @Field()
  startDate: Date;

  @Field()
  finishDate: Date;

  @Field()
  invoice: string;

  @Field({ nullable: true })
  notes?: string;

  @Field({ nullable: true })
  salesChannelIdentifier?: string;

  @Field({ nullable: true })
  userName?: string;

  @Field({ nullable: true })
  userPhoneNumber?: string;

  @Field(type => Float, { nullable: true })
  totalCashPayment: number;

  _totalPrice: number;

  _totalBasePrice: number;

  @Field(type => ID)
  refId: string;

  @Field(type => [SalesOrderBusinessMenuItemInput])
  salesOrderBusinessMenuItems: SalesOrderBusinessMenuItemInput[];

  organizationUserId: string;
}

@InputType()
export class SalesOrderSyncRequest {
  @Field(type => [SalesOrderSyncInput])
  salesOrderSyncInputs: SalesOrderSyncInput[];

  organizationUserId: string;
}
