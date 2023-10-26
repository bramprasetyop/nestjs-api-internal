import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class BusinessOutletLeadRegisterRequest {
  @Field(type => ID)
  businessId: string;

  @Field(type => Float)
  lat: number;

  @Field(type => Float)
  lng: number;

  @Field()
  address: string;

  @Field(type => ID)
  villageId: string;

  @Field(type => ID)
  districtId: string;

  @Field(type => ID)
  cityId: string;

  @Field(type => ID)
  provinceId: string;

  @Field()
  name: string;

  @Field()
  @MaxLength(30)
  phoneNumber: string;

  @Field()
  @MaxLength(5)
  countryCode: string;

  @Field()
  email: string;

  @Field()
  ktpNumber: string;

  @Field()
  onboardingResponseJson: string;

  @Field({ nullable: true })
  notes?: string;

  @Field(type => ID)
  businessMerchantProductId: string;

  ongoingStatus: string;
  organizationId: string;
  organizationUserId: string;
  updatedBy: string;
}
