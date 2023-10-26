import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class XMenuItemAssignBusinessMenuItemRequest {
  @Field(type => ID, { nullable: true })
  xKlikitItemId: string;

  @Field(type => ID, { nullable: true })
  xHubsterItemId: string;

  @Field(type => ID)
  businessMenuItemId: string;
}
