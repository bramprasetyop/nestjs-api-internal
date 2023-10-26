import { Field, InputType, ID, registerEnumType } from '@nestjs/graphql';
import { BusinessPromosStatus } from '@wahyoo/wahyoo-shared/dist/constants/enums';

registerEnumType(BusinessPromosStatus, {
  name: 'BusinessPromosStatus',
  description: 'Business Promo Status'
});

@InputType()
export class BusinessPromoClosedRequest {
  @Field(type => ID)
  id: string;

  @Field(() => BusinessPromosStatus)
  status: BusinessPromosStatus;

  @Field(type => Date, { nullable: true })
  closedAt: Date;

  @Field(type => ID, { nullable: true })
  closedBy: string;
}
