import { Field, ObjectType } from '@nestjs/graphql';

export interface BusinessOutletAndLeadMapLocationArgs {
  lat: number;
  lng: number;
  name: string;
  address: string;
  type: string;
  status: string;
}

@ObjectType()
export class BusinessOutletAndLeadMapLocation {
  constructor({
    address,
    lat,
    lng,
    name,
    type,
    status
  }: BusinessOutletAndLeadMapLocationArgs) {
    this.address = address;
    this.lat = lat;
    this.lng = lng;
    this.name = name;
    this.type = type;
    this.status = status;
  }

  @Field({ nullable: true })
  lat: number;

  @Field({ nullable: true })
  lng: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  type: string;

  @Field({ nullable: true })
  status: string;
}
