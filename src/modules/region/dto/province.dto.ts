import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ProvinceModel } from '@wahyoo/wahyoo-shared';

@ObjectType()
export class Province {
  constructor(model: ProvinceModel) {
    this.id = model.id;
    this.code = model.code;
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

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
