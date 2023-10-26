import {
  Field,
  ID,
  InputType,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql';
import { BusinessMenuItemModifierStatus } from '@wahyoo/wahyoo-shared';

registerEnumType(BusinessMenuItemModifierStatus, {
  name: 'BusinessMenuItemModifierStatus',
  description: 'Business Menu Item Modifier Status'
});

@InputType()
export class BusinessMenuItemModifierCreateRequest {
  @Field(type => ID)
  businessMenuModifierId: string;

  @Field(() => Number)
  sequence: number;

  @Field(() => BusinessMenuItemModifierStatus)
  status: BusinessMenuItemModifierStatus;
}
