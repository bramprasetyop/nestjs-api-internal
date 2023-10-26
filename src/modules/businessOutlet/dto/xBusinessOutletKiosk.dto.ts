// XBusinessOutletKiosk
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { XBusinessOutletKioskModel } from '@wahyoo/wahyoo-shared';

@ObjectType()
export class XBusinessOutletKiosk {
  constructor(model: XBusinessOutletKioskModel) {
    this.id = model.id;
    this.businessOutletId = model.businessOutletId;
    this.xWahyooKioskId = model.xWahyooKioskId;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(() => ID)
  id: string;

  @Field(() => ID)
  businessOutletId: string;

  @Field(() => Int, { nullable: true })
  xWahyooKioskId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
