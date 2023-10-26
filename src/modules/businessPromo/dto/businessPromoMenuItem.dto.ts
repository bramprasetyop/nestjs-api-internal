import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BusinessPromoMenuItemsModel } from '@wahyoo/wahyoo-shared';

@ObjectType()
export class BusinessPromoMenuItem {
  constructor(model: BusinessPromoMenuItemsModel) {
    this.id = model.id;
    this.businessPromoId = model.businessPromoId;
    this.menuItemName = model.menuItemName;
    this.menuItemDescription = model.menuItemDescription;
    this.priceToBeTransferred = model.priceToBeTransferred;
    this.priceOnlinePlatform = model.priceOnlinePlatform;
    this.estimatedCostAmount = model.estimatedCostAmount;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  businessPromoId: string;

  @Field()
  menuItemName: string;

  @Field()
  menuItemDescription: string;

  @Field()
  priceToBeTransferred: number;

  @Field()
  priceOnlinePlatform: number;

  @Field()
  estimatedCostAmount: number;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
