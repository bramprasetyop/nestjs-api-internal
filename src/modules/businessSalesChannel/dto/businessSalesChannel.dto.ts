import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BusinessSalesChannelModel } from '@wahyoo/wahyoo-shared';
import { BusinessSalesChannelCategory } from 'src/modules/businessSalesChannelCategory/dto/businessSalesChannelCategory.dto';
import { Business } from 'src/modules/business/dto/business.dto';
import { BusinessSalesChannelPaymentType } from './businessSalesChannelPaymentType.dto';
import { BusinessSalesChannelMenuCategory } from 'src/modules/businessMenuCategory/dto/businessSalesChannelMenuCategory.dto';
import { BusinessSalesChannelMenuItemMapper } from 'src/modules/businessMenuItem/mappers/businessSalesChannelMenuItem.mapper';
import { BusinessSalesChannelMenuCategoryMapper } from 'src/modules/businessMenuCategory/mappers/businessSalesChannelMenuCategory.mapper';
import { BusinessSalesChannelMenuItem } from 'src/modules/businessMenuItem/dto/businessSalesChannelMenuItem.dto';
import { BusinessSalesChannelPaymentTypeMapper } from '../mappers/businessSalesChannelPaymentType.mapper';

@ObjectType()
export class BusinessSalesChannel {
  constructor(model: BusinessSalesChannelModel) {
    this.id = model.id;
    this.name = model.name;
    this.label = model.label;
    this.businessSalesChannelCategoryId = model.businessSalesChannelCategoryId;
    this.businessSalesChannelMenuCategories = model.businessSalesChannelMenuCategories
      ? BusinessSalesChannelMenuCategoryMapper.modelsToDTOs(
          model.businessSalesChannelMenuCategories
        )
      : [];
    this.businessSalesChannelMenuItems = model.businessSalesChannelMenuItems
      ? BusinessSalesChannelMenuItemMapper.modelsToDTOs(
          model.businessSalesChannelMenuItems
        )
      : [];
    this.businessSalesChannelPaymentTypes = model.businessSalesChannelPaymentTypes
      ? BusinessSalesChannelPaymentTypeMapper.modelsToDTOs(
          model.businessSalesChannelPaymentTypes
        )
      : [];
    this.businessId = model.businessId;
    this.picture = model.picture;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  businessSalesChannelCategoryId: string;

  @Field(type => ID)
  businessId: string;

  @Field(() => BusinessSalesChannelCategory, { nullable: true })
  businessSalesChannelCategory?: BusinessSalesChannelCategory;

  @Field(() => [BusinessSalesChannelPaymentType], { nullable: true })
  businessSalesChannelPaymentTypes?: BusinessSalesChannelPaymentType[];

  @Field(() => Business)
  business: Business;

  @Field()
  name: string;

  @Field()
  label: string;

  @Field()
  picture: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;

  @Field(type => [BusinessSalesChannelMenuCategory], { nullable: true })
  businessSalesChannelMenuCategories: BusinessSalesChannelMenuCategory[];

  @Field(type => [BusinessSalesChannelMenuItem], { nullable: true })
  businessSalesChannelMenuItems: BusinessSalesChannelMenuItem[];
}
