import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BusinessPaymentTypeModel } from '@wahyoo/wahyoo-shared';
import { Business } from 'src/modules/business/dto/business.dto';

@ObjectType()
export class BusinessPaymentType {
  constructor(model: BusinessPaymentTypeModel) {
    this.id = model.id;
    this.name = model.name;
    this.picture = model.picture;
    this.businessId = model.businessId;
    this.isCash = model.isCash;
    this.sequence = model.sequence;
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

  @Field()
  name: string;

  @Field({ nullable: true })
  picture?: string;

  @Field(type => Boolean)
  isCash: boolean;

  @Field()
  sequence: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
