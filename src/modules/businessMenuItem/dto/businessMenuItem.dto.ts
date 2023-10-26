import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BusinessMenuItemModel } from '@wahyoo/wahyoo-shared';
import { BusinessMenuCategory } from 'src/modules/businessMenuCategory/dto/businessMenuCategory.dto';
import { BusinessMenuItemModifier } from './businessMenuItemModifier.dto';
import { BusinessSalesChannelMenuItem } from './businessSalesChannelMenuItem.dto';
import { BusinessMenuItemModifierMapper } from '../mappers/businessMenuItemModifier.mapper';
import { OrganizationUser } from 'src/modules/user/dto/user.dto';
import { UserMapper } from 'src/modules/user/mappers/user.mapper';
import { BusinessMenuCategoryMapper } from 'src/modules/businessMenuCategory/mappers/businessMenuCategory.mapper';
import { Business } from 'src/modules/business/dto/business.dto';
import { BusinessMapper } from 'src/modules/business/mappers/business.mapper';
import { XHubsterItem } from 'src/modules/hubster/dto/xHubsterItem';
import { XKlikitItem } from 'src/modules/klikit/dto/xKlikitItem';

@ObjectType()
export class BusinessMenuItem {
  constructor(model: BusinessMenuItemModel) {
    this.id = model.id;
    this.businessMenuCategoryId = model.businessMenuCategoryId;
    this.businessMenuCategory = model.businessMenuCategory
      ? BusinessMenuCategoryMapper.modelToDTO(model.businessMenuCategory)
      : null;
    this.businessMenuItemModifiers = model.businessMenuItemModifiers
      ? BusinessMenuItemModifierMapper.modelsToDTOs(
          model.businessMenuItemModifiers
        )
      : [];
    this.modifier = model.modifier
      ? UserMapper.modelToDTO(model.modifier)
      : null;
    this.creator = model.creator ? UserMapper.modelToDTO(model.creator) : null;
    this.businessId = model.businessId;
    this.business = model.business
      ? BusinessMapper.modelToDTO(model.business)
      : null;
    this.createdBy = model.createdBy;
    this.updatedBy = model.updatedBy;
    this.name = model.name;
    this.description = model.description;
    this.slug = model.slug;
    this.priceBase = model.priceBase;
    this.estimatedCogsPrice = model.estimatedCogsPrice;
    this.breakevenPrice = model.breakevenPrice;
    this.effectivePrice = model.effectivePrice;
    this.sequence = model.sequence;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  businessMenuCategoryId: string;

  @Field(type => ID)
  businessId: string;

  @Field(type => Business)
  business: Business;

  @Field(type => ID, { nullable: true })
  createdBy: string;

  @Field(type => ID, { nullable: true })
  updatedBy: string;

  @Field(type => OrganizationUser, { nullable: true })
  creator?: OrganizationUser;

  @Field(type => OrganizationUser, { nullable: true })
  modifier?: OrganizationUser;

  @Field(() => BusinessMenuCategory)
  businessMenuCategory: BusinessMenuCategory;

  @Field(() => [BusinessMenuItemModifier], { nullable: true })
  businessMenuItemModifiers?: BusinessMenuItemModifier[];

  @Field(() => [BusinessSalesChannelMenuItem])
  businessSalesChannelMenuItems: BusinessSalesChannelMenuItem[];

  @Field(() => String)
  name: string;

  @Field(() => Number)
  totalActiveChannel: Number;

  @Field(() => String)
  description: string;

  @Field(() => String)
  slug: string;

  @Field(() => Number)
  priceBase: number;

  @Field(type => Number)
  estimatedCogsPrice: number;

  @Field(type => Number)
  breakevenPrice: number;

  @Field(type => Number)
  effectivePrice: number;

  @Field(() => Number)
  sequence: number;

  @Field(type => [XHubsterItem], { nullable: true })
  xHubsterItems?: [XHubsterItem];

  @Field(type => [XKlikitItem], { nullable: true })
  xKlikitItems?: [XKlikitItem];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date;
}
