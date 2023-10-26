import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BusinessSalesChannel } from '../../businessSalesChannel/dto/businessSalesChannel.dto';
import {
  BusinessSalesChannelMenuItemModel,
  BusinessSalesChannelMenuItemStatus
} from '@wahyoo/wahyoo-shared';
import { BusinessMenuItemMapper } from '../mappers/businessMenuItem.mapper';
import { BusinessMenuItem } from './businessMenuItem.dto';

registerEnumType(BusinessSalesChannelMenuItemStatus, {
  name: 'BusinessSalesChannelMenuItemStatus',
  description: 'Business Sales Channel Menu Item Status'
});

@ObjectType()
export class BusinessSalesChannelMenuItem {
  constructor(model: BusinessSalesChannelMenuItemModel) {
    this.id = model.id;
    this.businessSalesChannelId = model.businessSalesChannelId;
    this.businessMenuItemId = model.businessMenuItemId;
    this.businessMenuItem = model.businessMenuItem
      ? BusinessMenuItemMapper.modelToDTO(model.businessMenuItem)
      : null;
    this.priceFinal = model.priceFinal;
    this.status = model.status;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  businessSalesChannelId: string;

  @Field(() => BusinessSalesChannel, { nullable: true })
  businessSalesChannel: BusinessSalesChannel;

  @Field(() => ID)
  businessMenuItemId: string;

  @Field(() => Number)
  priceFinal: number;

  @Field(() => BusinessSalesChannelMenuItemStatus)
  status: BusinessSalesChannelMenuItemStatus;

  @Field(() => BusinessMenuItem, { nullable: true })
  businessMenuItem?: BusinessMenuItem;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date;
}
