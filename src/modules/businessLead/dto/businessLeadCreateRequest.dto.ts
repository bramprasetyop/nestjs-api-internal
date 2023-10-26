import { Field, InputType, Float, ID, registerEnumType } from '@nestjs/graphql';
import {
  BusinessLeadStatus,
  BusinessLeadRequirementStatus
} from '@wahyoo/wahyoo-shared/dist/constants/enums';
import { MaxLength } from 'class-validator';

export enum PackageTypeInput {
  gold = 'gold',
  silver = 'silver'
}

registerEnumType(PackageTypeInput, {
  name: 'PackageTypeInput',
  description: 'PackageTypeInput'
});

registerEnumType(BusinessLeadStatus, {
  name: 'BusinessLeadStatus',
  description: 'Business Lead Status'
});

registerEnumType(BusinessLeadRequirementStatus, {
  name: 'BusinessLeadRequirementStatus',
  description: 'Business Lead Requirement Status'
});

@InputType()
export class BusinessLeadInformationHubInput {
  @Field(type => String)
  name: string;

  @Field(type => String)
  url: string;
}

@InputType()
export class BusinessLeadAttachmentInput {
  @Field(type => String, { nullable: true })
  name: string;

  @Field(type => String, { nullable: true })
  url: string;
}

@InputType()
export class BusinessLeadPackageAndPriceInput {
  @Field(type => String)
  name: string;

  @Field(type => Float)
  price: number;

  @Field({ nullable: true, defaultValue: false })
  isFavorite: boolean;

  @Field(type => PackageTypeInput, { nullable: true })
  packageType: PackageTypeInput;

  @Field(type => Float)
  priceBeforeDiscount: number;

  @Field(type => String)
  description: string;
}

@InputType()
export class BusinessLeadCreateRequest {
  @Field()
  @MaxLength(255)
  name: string;

  @Field()
  @MaxLength(10)
  code: string;

  @Field(type => ID, { nullable: true })
  organizationId: string;

  @Field()
  logoUrl: string;

  @Field()
  description: string;

  @Field()
  termsAndConditions: string;

  @Field(type => [BusinessLeadPackageAndPriceInput])
  packageAndPriceJson: BusinessLeadPackageAndPriceInput[];

  @Field(type => [BusinessLeadInformationHubInput])
  informationHubJson: BusinessLeadInformationHubInput[];

  @Field(type => [BusinessLeadAttachmentInput], { nullable: true })
  attachmentJson?: BusinessLeadAttachmentInput[];

  @Field()
  productCategoryIconUrl: string;

  status: BusinessLeadStatus;

  @Field(() => BusinessLeadRequirementStatus, { nullable: true })
  requirementStatus: BusinessLeadRequirementStatus;

  createdBy: string;

  publishedBy: string;

  publishedAt: Date;

  updatedAt: Date;
}
