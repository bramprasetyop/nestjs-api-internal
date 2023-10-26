import {
  Field,
  ID,
  Float,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql';
import { SalesOrderModel, SalesOrderStatus } from '@wahyoo/wahyoo-shared';
import { BusinessPaymentType } from 'src/modules/businessPaymentType/dto/businessPaymentType.dto';
import { BusinessSalesChannel } from 'src/modules/businessSalesChannel/dto/businessSalesChannel.dto';
import { SalesOrderBusinessMenuItemMapper } from '../mappers/salesOrderBusinessMenuItem.mapper';
import { XHubsterOrderMapper } from '../mappers/xHubsterOrder.mapper';
import { SalesOrderBusinessMenuItem } from './salesOrderBusinessMenuItem.dto';
import { XHubsterOrder } from './xHubsterOrder.dto';

registerEnumType(SalesOrderStatus, {
  name: 'SalesOrderStatus',
  description: 'sales order status'
});

@ObjectType()
export class SalesOrder {
  constructor(model: SalesOrderModel) {
    this.id = model.id;
    this.organizationId = model.organizationId;
    this.businessId = model.businessId;
    this.businessOutletId = model.businessOutletId;
    this.businessSalesChannelId = model.businessSalesChannelId;
    this.businessPaymentTypeId = model.businessPaymentTypeId;
    this.businessPaymentTypeOther = model.businessPaymentTypeOther;
    this.status = model.status;
    this.startDate = model.startDate;
    this.finishDate = model.finishDate;
    this.invoice = model.invoice;
    this.notes = model.notes;
    this.salesChannelIdentifier = model.salesChannelIdentifier;
    this.userName = model.userName;
    this.userPhoneNumber = model.userPhoneNumber;
    this.totalCashPayment = model.totalCashPayment;
    this._totalPrice = model._totalPrice;
    this._totalBasePrice = model._totalBasePrice;
    this.refId = model.refId;
    this.xHubsterOrder = model.xHubsterOrder
      ? XHubsterOrderMapper.modelToDTO(model.xHubsterOrder)
      : null;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
    this.salesOrderBusinessMenuItems = model.salesOrderBusinessMenuItems
      ? SalesOrderBusinessMenuItemMapper.modelsToDTOs(
          model.salesOrderBusinessMenuItems
        )
      : null;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  organizationId: string;

  @Field(type => ID)
  businessId: string;

  @Field(type => ID)
  businessOutletId: string;

  @Field(type => ID)
  businessSalesChannelId: string;

  @Field(type => BusinessSalesChannel, { nullable: true })
  businessSalesChannel?: BusinessSalesChannel;

  @Field(type => ID, { nullable: true })
  businessPaymentTypeId?: string;

  @Field({ nullable: true })
  businessPaymentTypeOther?: string;

  @Field(type => BusinessPaymentType, { nullable: true })
  businessPaymentType?: BusinessPaymentType;

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
  totalCashPayment?: number;

  @Field(type => Float)
  _totalPrice: number;

  @Field(type => Float)
  _totalBasePrice: number;

  @Field()
  refId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  deletedAt?: Date;

  @Field(type => [SalesOrderBusinessMenuItem])
  salesOrderBusinessMenuItems: SalesOrderBusinessMenuItem[];

  @Field(type => XHubsterOrder, { nullable: true })
  xHubsterOrder: XHubsterOrder;
}
