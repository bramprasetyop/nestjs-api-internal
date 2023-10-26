import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BusinessMenuModifierItemModel } from '@wahyoo/wahyoo-shared';
import { Business } from 'src/modules/business/dto/business.dto';
import { BusinessMenuModifier } from './businessMenuModifier.dto';

@ObjectType()
export class BusinessMenuModifierItem {
  constructor(model: BusinessMenuModifierItemModel) {
    this.id = model.id;
    this.name = model.name;
    this.businessId = model.businessId;
    this.businessMenuModifierId = model.businessMenuModifierId;
    this.slug = model.slug;
    this.sequence = model.sequence;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  businessId: string;

  @Field(type => ID)
  businessMenuModifierId: string;

  @Field(() => Business)
  business: Business;

  @Field(() => BusinessMenuModifier)
  businessMenuModifier: BusinessMenuModifier;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field()
  sequence: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
