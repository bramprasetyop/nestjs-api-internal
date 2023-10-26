import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Kiosk as KioskModel } from 'src/modules/external/interfaces/kiosk.interface';

@ObjectType()
export class Kiosk {
  constructor(model: KioskModel) {
    this.id = model.id;
    this.code = model.code;
    this.name = model.name;
    this.address = model.address;
    this.lat = model.lat;
    this.lng = model.lng;
    this.status = model.status;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  code: string;

  @Field()
  name: string;

  @Field()
  address: string;

  @Field({ nullable: true })
  lat?: number;

  @Field({ nullable: true })
  lng?: number;

  @Field()
  status: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
