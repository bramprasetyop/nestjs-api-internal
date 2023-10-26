import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DistrictModel } from '@wahyoo/wahyoo-shared';
import { City } from './city.dto';

@ObjectType()
export class District {
  constructor(model: DistrictModel) {
    this.id = model.id;
    this.code = model.code;
    this.name = model.name;
    this.cityId = model.cityId;
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

  @Field(type => ID)
  cityId: number;

  @Field(type => City, { nullable: true })
  city?: City;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
