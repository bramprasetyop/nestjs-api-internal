import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BusinessMenuCategoryModel } from '@wahyoo/wahyoo-shared';
import { Business } from 'src/modules/business/dto/business.dto';
import { BusinessMapper } from 'src/modules/business/mappers/business.mapper';
import { OrganizationUser } from 'src/modules/user/dto/user.dto';
import { UserMapper } from 'src/modules/user/mappers/user.mapper';
import { BusinessMenuCategoryMapper } from '../mappers/businessMenuCategory.mapper';
import { BusinessSalesChannelMenuCategory } from './businessSalesChannelMenuCategory.dto';

@ObjectType()
export class BusinessMenuCategory {
  constructor(model: BusinessMenuCategoryModel) {
    this.id = model.id;
    this.businessId = model.businessId;
    this.createdBy = model.createdBy;
    this.updatedBy = model.updatedBy;
    this.parentId = model.parentId;
    this.creator = model.creator ? UserMapper.modelToDTO(model.creator) : null;
    this.modifier = model.modifier
      ? UserMapper.modelToDTO(model.modifier)
      : null;
    this.business = model.business
      ? BusinessMapper.modelToDTO(model.business)
      : null;
    this.parent = model.parent
      ? BusinessMenuCategoryMapper.modelToDTO(model.parent)
      : null;
    this.name = model.name;
    this.sequence = model.sequence;
    this.picture = model.picture;
    this.isRoot = model.isRoot;
    this.isLeaf = model.isLeaf;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  businessId: string;

  @Field(type => Business)
  business: Business;

  @Field(type => BusinessMenuCategory)
  parent: BusinessMenuCategory;

  @Field(type => [BusinessSalesChannelMenuCategory])
  businessSalesChannelMenuCategories: BusinessSalesChannelMenuCategory[];

  @Field(type => ID, { nullable: true })
  createdBy?: string;

  @Field(type => ID, { nullable: true })
  updatedBy?: string;

  @Field(type => OrganizationUser, { nullable: true })
  creator?: OrganizationUser;

  @Field(type => OrganizationUser, { nullable: true })
  modifier?: OrganizationUser;

  @Field(type => ID, { nullable: true })
  parentId: string;

  @Field(type => String)
  name: string;

  @Field(type => String, { nullable: true })
  picture?: string;

  @Field(type => Number)
  sequence: number;

  @Field()
  isRoot: boolean;

  @Field()
  isLeaf: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
