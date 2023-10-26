import {
  Field,
  Float,
  ID,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql';
import { XKlikitItemModel } from '@wahyoo/wahyoo-shared';
import { Business } from 'src/modules/business/dto/business.dto';
import { BusinessMapper } from 'src/modules/business/mappers/business.mapper';
import { BusinessMenuItem } from 'src/modules/businessMenuItem/dto/businessMenuItem.dto';
import { BusinessMenuItemMapper } from 'src/modules/businessMenuItem/mappers/businessMenuItem.mapper';

@ObjectType()
export class XKlikitItem {
  constructor(model: XKlikitItemModel) {
    this.id = model.id;
    this.businessMenuItemId = model.businessMenuItemId;
    this.businessMenuItem = model.businessMenuItem
      ? BusinessMenuItemMapper.modelToDTO(model.businessMenuItem)
      : null;
    this.businessId = model.businessId;
    this.business = model.business
      ? BusinessMapper.modelToDTO(model.business)
      : null;
    this.name = model.name;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID, { nullable: true })
  businessMenuItemId: string;

  @Field(type => BusinessMenuItem, { nullable: true })
  businessMenuItem: BusinessMenuItem;

  @Field(type => ID)
  businessId: string;

  @Field(type => Business, { nullable: true })
  business: Business;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
