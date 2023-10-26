import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { KnownTypeNamesRule } from 'graphql';

export interface WahyooUserCheckResponseModel {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
}

@ObjectType()
export class WahyooUserCheckResponse {
  constructor(model: WahyooUserCheckResponseModel) {
    this.id = model.id;
    this.name = model.name;
    this.email = model.email;
    this.phoneNumber = model.phoneNumber;
    this.countryCode = model.countryCode;
  }

  @Field(type => ID)
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  countryCode: string;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field({ nullable: true })
  email: string;
}
