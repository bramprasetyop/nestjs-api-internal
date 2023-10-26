import { Field, InputType, ID, registerEnumType } from '@nestjs/graphql';
import { BusinessPromosStatus } from '@wahyoo/wahyoo-shared/dist/constants/enums';
import { MaxLength } from 'class-validator';
import { BusinessPromoMenuItemCreateRequest } from './businessPromoMenuItemCreateRequest.dto';

registerEnumType(BusinessPromosStatus, {
  name: 'BusinessPromosStatus',
  description: 'Business Promo Status'
});

@InputType()
export class BusinessPromoUpdateRequest {
  @Field(type => ID, { nullable: true })
  id: string;

  @Field()
  @MaxLength(255)
  name: string;

  @Field(type => ID)
  businessId: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  bannerImageUrl: string;

  @Field({ nullable: true })
  posterUrl: string;

  @Field(() => BusinessPromosStatus)
  status: BusinessPromosStatus;

  @Field(type => [BusinessPromoMenuItemCreateRequest])
  menuItems: BusinessPromoMenuItemCreateRequest[];

  @Field(type => ID, { nullable: true })
  createdBy: string;

  @Field(type => ID, { nullable: true })
  publishedBy: string;

  @Field(type => Date, { nullable: true })
  publishedAt: Date;

  @Field(type => Date, { nullable: true })
  updatedAt: Date;

  @Field(type => ID, { nullable: true })
  updatedBy: string;
}
