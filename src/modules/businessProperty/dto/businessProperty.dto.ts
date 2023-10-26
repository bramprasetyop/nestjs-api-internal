import {
  Field,
  Float,
  ID,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql';
import JSON from 'graphql-type-json';
import { BusinessModel, BusinessPropertyModel } from '@wahyoo/wahyoo-shared';
import { BusinessStatus } from '@wahyoo/wahyoo-shared/dist/constants/enums';
import { Business } from 'src/modules/business/dto/business.dto';
import { Organization } from 'src/modules/organization/dto/organization.dto';
import { OrganizationMapper } from 'src/modules/organization/mappers/organization.mapper';

registerEnumType(BusinessStatus, {
  name: 'BusinessStatus',
  description: 'business status'
});

@ObjectType()
export class BusinessProperty {
  constructor(model: BusinessPropertyModel) {
    this.id = model.id;
    this.businessId = model.businessId;
    this.xDocusignTemplateId = model.xDocusignTemplateId;
    this.xInterviewJotformUrl = model.xInterviewJotformUrl;
    this.xTrainingJotformUrl = model.xTrainingJotformUrl;
    this.xSurveyJotformUrl = model.xSurveyJotformUrl;
    this.minDistanceBetweenOutletsInKm = model.minDistanceBetweenOutletsInKm;
    this.intersectionDistanceDividerInKm =
      model.intersectionDistanceDividerInKm;
    this.outletCircleRadiusInKm = model.outletCircleRadiusInKm;
    this.expirationTimeInDays = model.expirationTimeInDays;
    this.qcTemplateJson = model.qcTemplateJson;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  businessId: string;

  @Field(type => Business)
  business: Business;

  @Field(type => ID)
  xDocusignTemplateId: string;

  @Field({ nullable: true })
  xInterviewJotformUrl: string;

  @Field({ nullable: true })
  xTrainingJotformUrl: string;

  @Field({ nullable: true })
  xSurveyJotformUrl: string;

  @Field({ nullable: true })
  minDistanceBetweenOutletsInKm: number;

  @Field(type => Float)
  intersectionDistanceDividerInKm: number;

  @Field({ nullable: true })
  outletCircleRadiusInKm: number;

  @Field({ nullable: true })
  expirationTimeInDays: number;

  @Field(() => JSON, { nullable: true })
  qcTemplateJson?: object;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
