import { Field, InputType, ID, registerEnumType } from '@nestjs/graphql';
import {
  BusinessLeadStatus,
  BusinessLeadRequirementStatus
} from '@wahyoo/wahyoo-shared/dist/constants/enums';
import { MaxLength } from 'class-validator';
import {
  BusinessLeadInformationHubInput,
  BusinessLeadAttachmentInput,
  BusinessLeadPackageAndPriceInput
} from './businessLeadCreateRequest.dto';

registerEnumType(BusinessLeadStatus, {
  name: 'BusinessLeadStatus',
  description: 'Business Lead Status'
});

registerEnumType(BusinessLeadRequirementStatus, {
  name: 'BusinessLeadRequirementStatus',
  description: 'Business Lead Requirement Status'
});

@InputType()
export class BusinessLeadUpdateRequest {
  @Field(type => ID)
  id: string;

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

  @Field(type => ID, { nullable: true })
  createdBy: string;

  @Field(type => ID, { nullable: true })
  publishedBy: string;

  @Field(type => Date, { nullable: true })
  publishedAt: Date;

  @Field(type => Date, { nullable: true })
  updatedAt: Date;

  @Field(type => ID, { nullable: true })
  updatedBy: string;
}
