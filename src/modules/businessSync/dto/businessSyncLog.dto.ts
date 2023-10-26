import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BusinessSyncLogModel } from '@wahyoo/wahyoo-shared';
import JSON from 'graphql-type-json';

@ObjectType()
export class BusinessSyncLog {
  constructor(model: BusinessSyncLogModel) {
    this.id = model.id;
    this.businessId = model.businessId;
    this.dataJson = model.dataJson;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id?: string;

  @Field(type => ID)
  businessId: string;

  @Field(type => JSON)
  dataJson: any;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
