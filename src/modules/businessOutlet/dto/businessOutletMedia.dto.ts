import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  BusinessOutletMediaCategory,
  BusinessOutletMediaModel,
  MediaType
} from '@wahyoo/wahyoo-shared';

registerEnumType(BusinessOutletMediaCategory, {
  name: 'BusinessOutletMediaCategory',
  description: 'BusinessOutletMediaCategory'
});

registerEnumType(MediaType, {
  name: 'MediaType',
  description: 'MediaType'
});

@ObjectType()
export class BusinessOutletMedia {
  constructor(model: BusinessOutletMediaModel) {
    this.id = model.id;
    this.businessOutletId = model.businessOutletId;
    this.type = model.type;
    this.url = model.url;
    this.category = model.category;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  businessOutletId: string;

  @Field(type => MediaType)
  type: MediaType;

  @Field()
  url: string;

  @Field(type => BusinessOutletMediaCategory)
  category: BusinessOutletMediaCategory;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
