import { Field, ID, Int, Float, ObjectType } from '@nestjs/graphql';
import { SalesOrderBusinessMenuItemModel } from '@wahyoo/wahyoo-shared';
import { BusinessMenuItem } from 'src/modules/businessMenuItem/dto/businessMenuItem.dto';
import { SalesOrderBusinessMenuModifierItem } from './salesOrderBusinessMenuModifierItem.dto';

@ObjectType()
export class SalesOrderBusinessMenuItem {
  constructor(model: SalesOrderBusinessMenuItemModel) {
    this.id = model.id;
    this.salesOrderId = model.salesOrderId;
    this.businessMenuItemId = model.businessMenuItemId;
    this.sequence = model.sequence;
    this.quantity = model.quantity;
    this.notes = model.notes;
    this._businessItemName = model._businessItemName;
    this._businessItemPrice = model._businessItemPrice;
    this._businessItemBasePrice = model._businessItemBasePrice;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  salesOrderId: string;

  @Field(type => ID)
  businessMenuItemId: string;

  @Field(type => BusinessMenuItem)
  businessMenuItem: BusinessMenuItem;

  @Field(type => Int)
  sequence: number;

  @Field(type => Int)
  quantity: number;

  @Field(type => String)
  _businessItemName: string;

  @Field(type => Float)
  _businessItemPrice: number;

  @Field(type => Float)
  _businessItemBasePrice: number;

  @Field({ nullable: true })
  notes?: string;

  @Field(type => [SalesOrderBusinessMenuModifierItem], { nullable: true })
  salesOrderBusinessMenuModifierItems?: SalesOrderBusinessMenuModifierItem[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  deletedAt?: Date;
}
