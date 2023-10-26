import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BusinessModel } from '@wahyoo/wahyoo-shared';
import { BusinessStatus } from '@wahyoo/wahyoo-shared/dist/constants/enums';
import { BusinessProperty } from 'src/modules/businessProperty/dto/businessProperty.dto';
import { Organization } from 'src/modules/organization/dto/organization.dto';
import { BusinessLead } from 'src/modules/businessLead/dto/businessLead.dto';
import { BusinessMerchantProduct } from 'src/modules/businessMerchantOrder/dto/businessMerchantProduct.dto';
import { OrganizationMapper } from 'src/modules/organization/mappers/organization.mapper';

registerEnumType(BusinessStatus, {
  name: 'BusinessStatus',
  description: 'business status'
});

@ObjectType()
export class Business {
  constructor(model: BusinessModel) {
    this.id = model.id;
    this.name = model.name;
    this.code = model.code;
    this.organizationId = model.organizationId;
    this.organization = model.organization
      ? OrganizationMapper.modelToDTO(model.organization)
      : null;
    this.status = model.status;
    this.leadTermsAndConditions = model.leadTermsAndConditions;
    this.isHiddenToPublic = model.isHiddenToPublic;
    this.xNotionSopUrl = model.xNotionSopUrl;
    this.logoUrl = model.logoUrl;
    this.description = model.description;
    this.attachmentJson = model.attachmentJson;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  organizationId: string;

  @Field(() => Organization)
  organization: Organization;

  @Field()
  name: string;

  @Field({ nullable: true })
  fullName?: string;

  @Field({ nullable: true })
  code: string;

  @Field()
  status: BusinessStatus;

  @Field({ nullable: true })
  xNotionSopUrl?: string;

  @Field({ nullable: true })
  logoUrl?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  attachmentJson?: string;

  @Field()
  isHiddenToPublic: boolean;

  @Field({ nullable: true })
  leadTermsAndConditions?: string;

  @Field(() => [BusinessLead])
  businessLead: BusinessLead[];

  @Field(() => [BusinessMerchantProduct], { nullable: true })
  businessMerchantProducts: BusinessMerchantProduct[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
