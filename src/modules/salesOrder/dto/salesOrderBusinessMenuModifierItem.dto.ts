import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { SalesOrderBusinessMenuModifierItemModel } from '@wahyoo/wahyoo-shared';

@ObjectType()
export class SalesOrderBusinessMenuModifierItem {
  constructor(model: SalesOrderBusinessMenuModifierItemModel) {
    this.id = model.id;
    this.salesOrderId = model.salesOrderId;
    this.salesOrderBusinessMenuItemId = model.salesOrderBusinessMenuItemId;
    this.businessMenuModifierItemId = model.businessMenuModifierItemId;
    this.sequence = model.sequence;
    this._businessMenuModifierName = model._businessMenuModifierName;
    this._businessMenuModifierItemName = model._businessMenuModifierItemName;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  salesOrderId: string;

  @Field(type => ID)
  salesOrderBusinessMenuItemId: string;

  @Field(type => ID)
  businessMenuModifierItemId: string;

  @Field(type => Int)
  sequence: number;

  @Field()
  _businessMenuModifierName: string;

  @Field()
  _businessMenuModifierItemName: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  deletedAt?: Date;
}
