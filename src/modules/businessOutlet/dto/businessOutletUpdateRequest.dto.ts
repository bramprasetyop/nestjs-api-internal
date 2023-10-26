import { Field, InputType, ID, Float, Int } from '@nestjs/graphql';
import { IsPhoneNumber, MaxLength } from 'class-validator';
import { BusinessOutletStatus } from '@wahyoo/wahyoo-shared';
import { xHubsterStoreInput } from './businessOutletCreateRequest.dto';

@InputType()
export class BusinessOutletUpdateRequest {
  @Field(type => ID)
  id: string;

  @Field()
  @MaxLength(100)
  name: string;

  @Field(type => ID)
  businessId: string;

  @Field({ nullable: true })
  address: string;

  @Field(() => Int, { nullable: true })
  villageId: number;

  @Field(() => Int, { nullable: true })
  districtId: number;

  @Field(() => Int, { nullable: true })
  cityId: number;

  @Field(() => Int, { nullable: true })
  provinceId: number;

  @Field(type => Float, { nullable: true })
  lat?: number;

  @Field(type => Float, { nullable: true })
  lng?: number;

  @Field(type => Boolean, { nullable: true })
  posAvailable: boolean;

  @Field({ nullable: true })
  bankAccountProviderName?: string;

  @Field({ nullable: true })
  bankAccountName?: string;

  @Field({ nullable: true })
  bankAccountNumber?: string;

  @Field({ nullable: true })
  ktpNumber: string;

  @Field({ nullable: true })
  tkbRegion?: string;

  @Field({ nullable: true })
  picName?: string;

  @Field({ nullable: true })
  @IsPhoneNumber('ID')
  picPhoneNumber?: number;

  @Field(type => BusinessOutletStatus)
  status: BusinessOutletStatus;

  @Field(type => ID, { nullable: true })
  xWahyooKioskId: string;

  @Field(type => [xHubsterStoreInput], { nullable: true })
  xHubsterStores: xHubsterStoreInput[];

  @Field(type => ID, { nullable: true })
  updatedBy: string;
}
