import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  BusinessMenuItemModifierModel,
  BusinessMenuItemModifierStatus
} from '@wahyoo/wahyoo-shared';
import { BusinessMenuModifier } from 'src/modules/businessMenuModifier/dto/businessMenuModifier.dto';
import { BusinessMenuItem } from './businessMenuItem.dto';

registerEnumType(BusinessMenuItemModifierStatus, {
  name: 'BusinessMenuItemModifierStatus',
  description: 'Business Menu Item Modifier Status'
});

@ObjectType()
export class BusinessMenuItemModifier {
  constructor(model: BusinessMenuItemModifierModel) {
    this.id = model.id;
    this.businessMenuModifierId = model.businessMenuModifierId;
    this.businessMenuItemId = model.businessMenuItemId;
    this.sequence = model.sequence;
    this.status = model.status;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  businessMenuModifierId: string;

  @Field(type => BusinessMenuModifier, { nullable: true })
  businessMenuModifier?: BusinessMenuModifier;

  @Field(() => String)
  businessMenuItemId: string;

  @Field(() => BusinessMenuItem, { nullable: true })
  businessMenuItem?: BusinessMenuItem;

  @Field(() => Number)
  sequence: number;

  @Field(() => BusinessMenuItemModifierStatus)
  status: BusinessMenuItemModifierStatus;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date;
}
