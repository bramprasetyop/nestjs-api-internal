import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class XHubsterItemAssignBusinessMenuItemRequest {
  @Field(type => ID)
  xHubsterItemId: string;

  @Field(type => ID)
  businessMenuItemId: string;
}
