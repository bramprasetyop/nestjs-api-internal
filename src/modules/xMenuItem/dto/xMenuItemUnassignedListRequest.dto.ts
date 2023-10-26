import {
  ArgsType,
  Field,
  InputType,
  registerEnumType,
  ID
} from '@nestjs/graphql';

export enum XMenuItemUnassignedSource {
  hubster = 'hubster',
  klikit = 'klikit'
}

registerEnumType(XMenuItemUnassignedSource, {
  name: 'XMenuItemUnassignedSource',
  description: 'XMenuItemUnassignedSource'
});

@InputType()
export class XMenuItemUnassignedFilter {
  @Field(type => ID, { nullable: true })
  businessId: string;

  @Field(type => XMenuItemUnassignedSource, { nullable: true })
  source: XMenuItemUnassignedSource;
}
@ArgsType()
export class XMenuItemGetUnassignListRequest {
  @Field(type => String, { nullable: true })
  search: string;

  @Field({ nullable: true })
  filter: XMenuItemUnassignedFilter;
}
