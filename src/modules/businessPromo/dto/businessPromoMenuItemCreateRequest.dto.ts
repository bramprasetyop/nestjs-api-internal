import { Field, InputType, ID, Float } from '@nestjs/graphql';

@InputType()
export class BusinessPromoMenuItemCreateRequest {
  @Field(type => ID, { nullable: true })
  id: string;

  @Field()
  menuItemName: string;

  @Field()
  menuItemDescription: string;

  @Field(type => Float)
  priceToBeTransferred: number;

  @Field(type => Float)
  priceOnlinePlatform: number;

  @Field(type => Float)
  estimatedCostAmount: number;
}
