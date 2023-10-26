import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BusinessMenuModifierModel } from '@wahyoo/wahyoo-shared';
import { Business } from 'src/modules/business/dto/business.dto';
import { BusinessMapper } from 'src/modules/business/mappers/business.mapper';
import { OrganizationUser } from 'src/modules/user/dto/user.dto';
import { UserMapper } from 'src/modules/user/mappers/user.mapper';
import { BusinessMenuModifierItem } from './businessMenuModifierItem.dto';

@ObjectType()
export class BusinessMenuModifier {
  constructor(model: BusinessMenuModifierModel) {
    this.id = model.id;
    this.name = model.name;
    this.businessId = model.businessId;
    this.createdBy = model.createdBy;
    this.updatedBy = model.updatedBy;
    this.modifier = model.modifier
      ? UserMapper.modelToDTO(model.modifier)
      : null;
    this.creator = model.creator ? UserMapper.modelToDTO(model.creator) : null;
    this.business = model.business
      ? BusinessMapper.modelToDTO(model.business)
      : null;
    this.description = model.description;
    this.slug = model.slug;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  businessId: string;

  @Field(() => Business)
  business: Business;

  @Field(() => [BusinessMenuModifierItem], { nullable: true })
  businessModifierItems?: BusinessMenuModifierItem[];

  @Field(type => ID, { nullable: true })
  createdBy: string;

  @Field(type => ID, { nullable: true })
  updatedBy: string;

  @Field(type => OrganizationUser, { nullable: true })
  creator?: OrganizationUser;

  @Field(type => OrganizationUser, { nullable: true })
  modifier?: OrganizationUser;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  slug: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
