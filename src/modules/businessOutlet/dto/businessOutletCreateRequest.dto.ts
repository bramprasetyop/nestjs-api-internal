import { Field, InputType, ID } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { BusinessOutletStatus } from '@wahyoo/wahyoo-shared';

@InputType()
export class xHubsterStoreInput {
  @Field(type => ID)
  xHubsterStoreId: string;

  @Field(type => Boolean)
  isDineIn: boolean;
}

@InputType()
export class BusinessOutletCreateRequest {
  @Field()
  @MaxLength(100)
  name: string;

  @Field(type => ID)
  businessId: string;

  @Field(type => Boolean)
  posAvailable: boolean;

  @Field(type => BusinessOutletStatus)
  status: BusinessOutletStatus;

  @Field(type => ID, { nullable: true })
  xWahyooKioskId: string;

  @Field(type => [xHubsterStoreInput], { nullable: true })
  xHubsterStores: xHubsterStoreInput[];

  @Field(type => ID, { nullable: true })
  createdBy: string;

  code: string;

  updatedBy: string;
}
