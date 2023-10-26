import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BusinessOutletQualityControlLogModel } from '@wahyoo/wahyoo-shared';

@ObjectType()
export class businessOutletQualityControlLog {
  constructor(model: BusinessOutletQualityControlLogModel) {
    this.id = model.id;
    this.businessOutletQualityControlId = model.businessOutletQualityControlId;
    this.status = model.status;
    this.reviewedBy = model.reviewedBy;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  businessOutletQualityControlId: string;

  @Field()
  status: string;

  @Field(type => ID, { nullable: true })
  reviewedBy?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
