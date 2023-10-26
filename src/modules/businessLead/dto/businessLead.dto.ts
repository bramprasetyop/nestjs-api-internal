import { Organization } from 'src/modules/organization/dto/organization.dto';
import {
  Field,
  ID,
  ObjectType,
  registerEnumType,
  Float
} from '@nestjs/graphql';
import { BusinessLeadModel, BusinessLeadLogModel } from '@wahyoo/wahyoo-shared';
import {
  BusinessLeadStatus,
  BusinessLeadRequirementStatus
} from '@wahyoo/wahyoo-shared/dist/constants/enums';
import { Business } from 'src/modules/business/dto/business.dto';
import { UserMapper } from 'src/modules/user/mappers/user.mapper';
import { OrganizationUser } from 'src/modules/user/dto/user.dto';

export enum PackageType {
  gold = 'gold',
  silver = 'silver'
}

registerEnumType(PackageType, {
  name: 'PackageType',
  description: 'PackageType'
});

registerEnumType(BusinessLeadStatus, {
  name: 'BusinessLeadStatus',
  description: 'Business Lead Status'
});

registerEnumType(BusinessLeadRequirementStatus, {
  name: 'BusinessLeadRequirementStatus',
  description: 'Business Lead Requirement Status'
});

@ObjectType()
export class BusinessLeadInformationHub {
  @Field(type => String)
  name: string;

  @Field(type => String)
  url: string;
}

@ObjectType()
export class BusinessLeadAttachment {
  @Field(type => String, { nullable: true })
  name: string;

  @Field(type => String, { nullable: true })
  url: string;
}

@ObjectType()
export class BusinessLeadPackageAndPrice {
  @Field(type => String)
  name: string;

  @Field(type => Float)
  price: number;

  @Field({ nullable: true, defaultValue: false })
  isFavorite: boolean;

  @Field(type => PackageType, { nullable: true })
  packageType: PackageType;

  @Field(type => Float)
  priceBeforeDiscount: number;

  @Field(type => String)
  description: string;
}

@ObjectType()
export class BusinessLead {
  constructor(model: BusinessLeadModel) {
    this.id = model.id;
    this.businessId = model.businessId;
    this.organizationId = model.organizationId;
    this.name = model.name;
    this.code = model.code;
    this.logoUrl = model.logoUrl;
    this.description = model.description;
    this.termsAndConditions = model.termsAndConditions;
    this.packageAndPriceJson = model.packageAndPriceJson;
    this.informationHubJson = model.informationHubJson;
    this.attachmentJson = model.attachmentJson;
    this.productCategoryIconUrl = model.productCategoryIconUrl;
    this.status = model.status;
    this.requirementStatus = model.requirementStatus;
    this.publishedAt = model.publishedAt;
    this.publishedBy = model.publishedBy;
    this.publishedByUser = model.publishedByUser
      ? UserMapper.modelToDTO(model.publishedByUser)
      : null;
    this.closedAt = model.closedAt;
    this.closedBy = model.closedBy;
    this.closedByUser = model.closedByUser
      ? UserMapper.modelToDTO(model.publishedByUser)
      : null;
    this.createdAt = model.createdAt;
    this.createdBy = model.createdBy;
    this.createdByUser = model.createdByUser
      ? UserMapper.modelToDTO(model.publishedByUser)
      : null;
    this.updatedAt = model.updatedAt;
    this.updatedBy = model.updatedBy;
    this.updatedByUser = model.updatedByUser
      ? UserMapper.modelToDTO(model.publishedByUser)
      : null;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID, { nullable: true })
  businessId: string;

  @Field(type => Business, { nullable: true })
  business?: Business;

  @Field()
  organizationId: string;

  @Field(type => Organization, { nullable: true })
  organization?: Organization;

  @Field()
  name: string;

  @Field({ nullable: true })
  code: string;

  @Field()
  logoUrl: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  termsAndConditions: string;

  @Field(type => [BusinessLeadPackageAndPrice])
  packageAndPriceJson: BusinessLeadPackageAndPrice[];

  @Field(type => [BusinessLeadInformationHub])
  informationHubJson: BusinessLeadInformationHub[];

  @Field(type => [BusinessLeadAttachment], { nullable: true })
  attachmentJson?: BusinessLeadAttachment[];

  @Field({ nullable: true })
  productCategoryIconUrl: string;

  @Field(() => BusinessLeadStatus)
  status: BusinessLeadStatus;

  @Field(() => BusinessLeadRequirementStatus)
  requirementStatus: BusinessLeadRequirementStatus;

  @Field({ nullable: true })
  publishedAt: Date;

  @Field({ nullable: true })
  publishedBy: string;

  @Field(type => OrganizationUser, { nullable: true })
  publishedByUser?: OrganizationUser;

  @Field({ nullable: true })
  closedAt: Date;

  @Field({ nullable: true })
  closedBy: string;

  @Field(type => OrganizationUser, { nullable: true })
  closedByUser?: OrganizationUser;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  createdBy: string;

  @Field(type => OrganizationUser, { nullable: true })
  createdByUser?: OrganizationUser;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field({ nullable: true })
  updatedBy: string;

  @Field(type => OrganizationUser, { nullable: true })
  updatedByUser?: OrganizationUser;

  @Field({ nullable: true })
  deletedAt?: Date;

  businessLeadLogs: BusinessLeadLogModel[];
}
