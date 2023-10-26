import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Business } from 'src/modules/business/dto/business.dto';
import { BusinessMenuItem } from 'src/modules/businessMenuItem/dto/businessMenuItem.dto';

export interface XMenuItemArgs {
  xHubsterItemId: string;
  xKlikitItemId: string;
  name: string;
  businessMenuItemId: string;
  businessId: string;
  source: string;
}

@ObjectType()
export class XMenuItem {
  constructor({
    xHubsterItemId,
    xKlikitItemId,
    businessMenuItemId,
    name,
    businessId,
    source
  }: XMenuItemArgs) {
    this.xHubsterItemId = xHubsterItemId;
    this.xKlikitItemId = xKlikitItemId;
    this.name = name;
    this.businessMenuItemId = businessMenuItemId;
    this.businessId = businessId;
    this.source = source;
  }

  @Field(type => ID, { nullable: true })
  xHubsterItemId: string;

  @Field(type => ID, { nullable: true })
  xKlikitItemId: string;

  @Field({ nullable: true })
  name: string;

  @Field(type => ID, { nullable: true })
  businessMenuItemId: string;

  @Field(type => BusinessMenuItem, { nullable: true })
  businessMenuItem: BusinessMenuItem;

  @Field(type => ID, { nullable: true })
  businessId: string;

  @Field(type => Business, { nullable: true })
  business: Business;

  @Field()
  source: string;
}
