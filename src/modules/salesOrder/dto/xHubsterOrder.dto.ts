import { Field, ID, Float, ObjectType } from '@nestjs/graphql';
import { XHubsterOrderModel } from '@wahyoo/wahyoo-shared';

@ObjectType()
export class XHubsterOrder {
  constructor(model: XHubsterOrderModel) {
    this.id = model.id;
    this.salesOrderId = model.salesOrderId;
    this.xHubsterStoreId = model.xHubsterStoreId;
    this.friendlyId = model.friendlyId;
    this.source = model.source;
    this.status = model.status;
    this.customerName = model.customerName;
    this.customerPhone = model.customerPhone;
    this.customerEmail = model.customerEmail;
    this.customerNote = model.customerNote;
    this.destinationPostalCode = model.destinationPostalCode;
    this.destinationCity = model.destinationCity;
    this.destinationState = model.destinationState;
    this.destinationCountryCode = model.destinationCountryCode;
    this.destinationAddressLines = model.destinationAddressLines;
    this.destinationLat = model.destinationLat;
    this.destinationLng = model.destinationLng;
    this.subTotal = model.subTotal;
    this.discount = model.discount;
    this.tax = model.tax;
    this.tip = model.tip;
    this.deliveryFee = model.deliveryFee;
    this.total = model.total;
    this.couponCode = model.couponCode;
    this.orderedAt = model.orderedAt;
    this.pickupTime = model.pickupTime;
    this.deliveryTime = model.deliveryTime;
    this.fulfillmentMode = model.fulfillmentMode;
    this.schedulingType = model.schedulingType;
    this.courierStatus = model.courierStatus;
  }

  @Field(type => ID)
  id: string;

  @Field(type => String)
  salesOrderId: string;

  // @Field(type => SalesOrder)
  // salesOrder: SalesOrderModel;

  @Field(type => String)
  xHubsterStoreId: string;

  // @Field(type => XHubsterStore)
  // xHubsterStore: XHubsterStore;

  @Field(type => String)
  friendlyId: string;

  @Field(type => String)
  source: string;

  @Field(type => String)
  status: string;

  @Field(type => String, { nullable: true })
  customerName?: string;

  @Field(type => String, { nullable: true })
  customerPhone?: string;

  @Field(type => String, { nullable: true })
  customerEmail?: string;

  @Field(type => String, { nullable: true })
  customerNote?: string;

  @Field(type => String, { nullable: true })
  destinationPostalCode?: string;

  @Field(type => String, { nullable: true })
  destinationCity?: string;

  @Field(type => String, { nullable: true })
  destinationState?: string;

  @Field(type => String, { nullable: true })
  destinationCountryCode?: string;

  @Field(type => String, { nullable: true })
  destinationAddressLines?: string;

  @Field(type => Float)
  destinationLat: number;

  @Field(type => Float)
  destinationLng: number;

  @Field(type => Float)
  subTotal: number;

  @Field(type => Float)
  discount: number;

  @Field(type => Float)
  tax: number;

  @Field(type => Float)
  tip: number;

  @Field(type => Float)
  deliveryFee: number;

  @Field(type => Float)
  total: number;

  @Field(type => String, { nullable: true })
  couponCode?: string;

  @Field()
  orderedAt: Date;

  @Field()
  pickupTime: Date;

  @Field()
  deliveryTime: Date;

  @Field(type => String, { nullable: true })
  fulfillmentMode?: string;

  @Field(type => String, { nullable: true })
  schedulingType?: string;

  @Field(type => String, { nullable: true })
  courierStatus?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  deletedAt?: Date;
}
