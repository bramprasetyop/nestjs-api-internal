import { Field, ID, ObjectType } from '@nestjs/graphql';
import JSON from 'graphql-type-json';
import {
  OrderDeliveryTimeWindow as OrderDeliveryTimeWindowModel,
  OrderDeliveryTimeWindowDeliveryType,
  OrderDeliveryTimeWindowStatus
} from 'src/modules/external/interfaces/order.interface';

@ObjectType()
export class OrderDeliveryTimeWindow {
  constructor(model: OrderDeliveryTimeWindowModel) {
    this.id = model.id;
    this.startTime = model.startTime;
    this.endTime = model.endTime;
    this.label = model.label;
    this.deliveryType = model.deliveryType;
    this.isDefault = model.isDefault;
    this.polygonBoundaries = model.polygonBoundaries;
    this.status = model.status;
    this.deliveryFee = model.deliveryFee;
    this.minimumAmount = model.minimumAmount;
    this.freeDeliveryMinAmount = model.freeDeliveryMinAmount;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
  }

  @Field(type => ID)
  id: string;

  @Field()
  startTime: string;

  @Field()
  endTime: string;

  @Field()
  label: string;

  @Field(() => OrderDeliveryTimeWindowDeliveryType)
  deliveryType: OrderDeliveryTimeWindowDeliveryType;

  @Field(() => Boolean)
  isDefault: boolean;

  @Field(() => JSON)
  polygonBoundaries: any;

  @Field(() => OrderDeliveryTimeWindowStatus)
  status: OrderDeliveryTimeWindowStatus;

  @Field()
  deliveryFee: number;

  @Field()
  minimumAmount: number;

  @Field()
  freeDeliveryMinAmount: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
