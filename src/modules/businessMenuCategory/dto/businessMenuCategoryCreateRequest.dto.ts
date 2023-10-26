import { Field, InputType, ID } from '@nestjs/graphql';
import { MaxLength, Min } from 'class-validator';
import { BusinessSalesChannelMenuCategoryCreateRequest } from './businessSalesChannelMenuCategoryCreateRequest.dto';

@InputType()
export class BusinessMenuCategoryCreateRequest {
  @Field(type => ID)
  businessId: string;

  @Field(type => ID, { nullable: true })
  parentId: string;

  @Field(type => ID, { nullable: true })
  createdBy: string;

  @Field(type => ID, { nullable: true })
  updatedBy: string;

  @Field()
  @MaxLength(255)
  name: string;

  @Field(type => String, { nullable: true })
  picture?: string;

  @Field(type => Number)
  @Min(0)
  sequence: number;

  @Field(type => Boolean)
  isRoot: boolean;

  @Field(type => Boolean)
  isLeaf: boolean;

  @Field(() => [BusinessSalesChannelMenuCategoryCreateRequest])
  businessSalesChannelMenuCategories: BusinessSalesChannelMenuCategoryCreateRequest[];
}
