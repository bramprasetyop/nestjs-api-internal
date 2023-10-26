import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BusinessSalesChannelMenuCategoryModel } from '@wahyoo/wahyoo-shared';

import { BusinessSalesChannelMenuCategoryStatus } from '@wahyoo/wahyoo-shared/dist/constants/enums';
import { BusinessSalesChannel } from 'src/modules/businessSalesChannel/dto/businessSalesChannel.dto';
import { BusinessMenuCategoryMapper } from '../mappers/businessMenuCategory.mapper';
import { BusinessMenuCategory } from './businessMenuCategory.dto';

registerEnumType(BusinessSalesChannelMenuCategoryStatus, {
  name: 'BusinessSalesChannelMenuCategoryStatus',
  description: 'Business Sales Channel Menu Category Status'
});

@ObjectType()
export class BusinessSalesChannelMenuCategory {
  constructor(model: BusinessSalesChannelMenuCategoryModel) {
    this.id = model.id;
    this.businessSalesChannelId = model.businessSalesChannelId;
    this.businessMenuCategoryId = model.businessMenuCategoryId;
    this.businessMenuCategory = model.businessMenuCategory
      ? BusinessMenuCategoryMapper.modelToDTO(model.businessMenuCategory)
      : null;
    this.status = model.status;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  businessSalesChannelId: string;

  @Field(type => ID)
  businessMenuCategoryId: string;

  @Field(type => BusinessSalesChannel)
  businessSalesChannel: BusinessSalesChannel;

  @Field(type => BusinessMenuCategory)
  businessMenuCategory: BusinessMenuCategory;

  @Field(type => BusinessSalesChannelMenuCategoryStatus)
  status: BusinessSalesChannelMenuCategoryStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
