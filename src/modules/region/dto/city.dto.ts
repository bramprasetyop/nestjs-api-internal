import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CityModel } from '@wahyoo/wahyoo-shared';
import { Province } from './province.dto';

@ObjectType()
export class City {
  constructor(model: CityModel) {
    this.id = model.id;
    this.code = model.code;
    this.name = model.name;
    this.provinceId = model.provinceId;
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
  provinceId: number;

  @Field(type => Province, { nullable: true })
  province?: Province;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
