import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class XHubsterStoreAssignBusinessOutletRequest {
  @Field(type => ID)
  xHubsterStoreId: string;

  @Field(type => ID)
  businessOutletId: string;

  @Field(type => Boolean)
  isDineIn: boolean;
}
