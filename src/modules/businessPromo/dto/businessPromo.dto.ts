import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  BusinessPromosModel,
  BusinessPromoLogModel
} from '@wahyoo/wahyoo-shared';
import { BusinessPromosStatus } from '@wahyoo/wahyoo-shared/dist/constants/enums';
import { Business } from 'src/modules/business/dto/business.dto';
import { UserMapper } from 'src/modules/user/mappers/user.mapper';
import { BusinessPromoMenuItemMapper } from 'src/modules/businessPromo/mappers/businessPromoMenuItem.mapper';
import { OrganizationUser } from 'src/modules/user/dto/user.dto';
import { BusinessPromoMenuItem } from 'src/modules/businessPromo/dto/businessPromoMenuItem.dto';

registerEnumType(BusinessPromosStatus, {
  name: 'BusinessPromosStatus',
  description: 'Business Promo Status'
});

@ObjectType()
export class BusinessPromo {
  constructor(model: BusinessPromosModel) {
    this.id = model.id;
    this.businessId = model.businessId;
    this.name = model.name;
    this.startDate = model.startDate;
    this.endDate = model.endDate;
    this.description = model.description;
    this.posterUrl = model.posterUrl;
    this.bannerImageUrl = model.bannerImageUrl;
    this.status = model.status;
    this.publishedAt = model.publishedAt;
    this.publishedBy = model.publishedBy;
    this.publishedByUser = model.publishedByUser
      ? UserMapper.modelToDTO(model.publishedByUser)
      : null;
    this.closedAt = model.closedAt;
    this.closedBy = model.closedBy;
    this.closedByUser = model.closedByUser
      ? UserMapper.modelToDTO(model.publishedByUser)
      : null;
    this.createdAt = model.createdAt;
    this.createdBy = model.createdBy;
    this.createdByUser = model.createdByUser
      ? UserMapper.modelToDTO(model.publishedByUser)
      : null;
    this.updatedAt = model.updatedAt;
    this.updatedBy = model.updatedBy;
    this.updatedByUser = model.updatedByUser
      ? UserMapper.modelToDTO(model.publishedByUser)
      : null;
    this.deletedAt = model.deletedAt;
    this.businessPromoMenuItems = model.businessPromoMenuItems
      ? BusinessPromoMenuItemMapper.modelsToDTOs(model.businessPromoMenuItems)
      : [];
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  businessId: string;

  @Field(type => Business, { nullable: true })
  business?: Business;

  @Field()
  name: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field()
  description: string;

  @Field({ nullable: true })
  posterUrl: string;

  @Field({ nullable: true })
  bannerImageUrl: string;

  @Field(() => BusinessPromosStatus)
  status: BusinessPromosStatus;

  @Field({ nullable: true })
  publishedAt: Date;

  @Field({ nullable: true })
  publishedBy: string;

  @Field(type => OrganizationUser, { nullable: true })
  publishedByUser?: OrganizationUser;

  @Field({ nullable: true })
  closedAt: Date;

  @Field({ nullable: true })
  closedBy: string;

  @Field(type => OrganizationUser, { nullable: true })
  closedByUser?: OrganizationUser;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  createdBy: string;

  @Field(type => OrganizationUser, { nullable: true })
  createdByUser?: OrganizationUser;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field({ nullable: true })
  updatedBy: string;

  @Field(type => OrganizationUser, { nullable: true })
  updatedByUser?: OrganizationUser;

  @Field({ nullable: true })
  deletedAt?: Date;

  @Field(type => [BusinessPromoMenuItem], { nullable: true })
  businessPromoMenuItems: BusinessPromoMenuItem[];

  businessPromoLogs: BusinessPromoLogModel[];
}
