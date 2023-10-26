import { Field, ID, ObjectType } from '@nestjs/graphql';
import { VillageModel } from '@wahyoo/wahyoo-shared';
import { District } from './district.dto';

@ObjectType()
export class Village {
  constructor(model: VillageModel) {
    this.id = model.id;
    this.code = model.code;
    this.zipCode = model.zipCode;
    this.districtId = model.districtId;
    this.name = model.name;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: number;

  @Field({ nullable: true })
  code: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  zipCode: string;

  @Field(type => ID)
  districtId: number;

  @Field(type => District, { nullable: true })
  district?: District;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
