import { Field, Float, ID, InputType, Int } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class OrganizationCustomerFeedbackCreateRequest {
  @Field(type => ID)
  businessOutletId: string;

  @Field(type => String)
  imageUrl: string;

  @Field(type => String)
  @MaxLength(255)
  fullName: string;

  @Field(type => String)
  @MaxLength(20)
  phoneNumber: string;

  @Field(type => String, { nullable: true })
  comment: string;

  @Field(type => Int)
  starRating: number;

  @Field(type => Boolean)
  tagPackaging: boolean;

  @Field(type => Boolean)
  tagFoodQuality: boolean;

  @Field(type => Boolean)
  tagTaste: boolean;

  @Field(type => Boolean)
  tagPrice: boolean;

  @Field(type => Boolean)
  tagDeliveryTime: boolean;

  @Field(type => String, { nullable: true })
  tagComment: string;

  @Field(type => Float, { nullable: true })
  customerLat: number;

  @Field(type => Float, { nullable: true })
  customerLng: number;
}
