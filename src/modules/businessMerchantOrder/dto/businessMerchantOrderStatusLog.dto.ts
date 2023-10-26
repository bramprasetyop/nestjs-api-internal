import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BusinessMerchantOrderStatusLogModel } from '@wahyoo/wahyoo-shared';

@ObjectType()
export class BusinessMerchantOrderStatusLog {
  constructor(model: BusinessMerchantOrderStatusLogModel) {
    this.id = model.id;
    this.businessMerchantOrderId = model.businessMerchantOrderId;
    this.organizationUserId = model.organizationUserId;
    this.status = model.status;
    this.employeeReason = model.employeeReason;
    this.employeeNotes = model.employeeNotes;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  businessMerchantOrderId: string;

  @Field(type => ID, { nullable: true })
  organizationUserId: string;

  @Field(type => String)
  status: string;

  @Field(type => String)
  employeeReason: string;

  @Field(type => String)
  employeeNotes: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
