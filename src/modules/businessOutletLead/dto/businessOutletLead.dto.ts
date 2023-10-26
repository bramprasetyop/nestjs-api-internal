import {
  Field,
  Float,
  ID,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql';
import {
  BusinessOutletLeadModel,
  BusinessOutletLeadOngoingStatus,
  BusinessOutletLeadRejectedReason,
  BusinessOutletLeadStatus
} from '@wahyoo/wahyoo-shared';
import JSON from 'graphql-type-json';
import { OrganizationMapper } from 'src/modules/organization/mappers/organization.mapper';
import { BusinessMapper } from 'src/modules/business/mappers/business.mapper';
import { BusinessOutletMapper } from 'src/modules/businessOutlet/mappers/businessOutlet.mapper';
import { UserMapper } from 'src/modules/user/mappers/user.mapper';
import { Business } from 'src/modules/business/dto/business.dto';
import { BusinessOutlet } from 'src/modules/businessOutlet/dto/businessOutlet.dto';
import { Organization } from 'src/modules/organization/dto/organization.dto';
import { OrganizationUser } from 'src/modules/user/dto/user.dto';
import { BusinessMerchantOrder } from 'src/modules/businessMerchantOrder/dto/businessMerchantOrder.dto';
import { BusinessMerchantOrderMapper } from 'src/modules/businessMerchantOrder/mappers/businessMerchantOrder.mapper';
import { BusinessOutletLeadMedia } from './businessOutletLeadMedia.dto';

registerEnumType(BusinessOutletLeadStatus, {
  name: 'BusinessOutletLeadStatus',
  description: 'BusinessOutletLeadStatus'
});

registerEnumType(BusinessOutletLeadOngoingStatus, {
  name: 'BusinessOutletLeadOngoingStatus',
  description: 'BusinessOutletLeadOngoingStatus'
});

registerEnumType(BusinessOutletLeadRejectedReason, {
  name: 'BusinessOutletLeadRejectedReason',
  description: 'BusinessOutletLeadRejectedReason'
});

@ObjectType()
export class BusinessOutletLead {
  constructor(model: BusinessOutletLeadModel) {
    this.id = model.id;
    this.businessId = model.businessId;
    this.business = model.business
      ? BusinessMapper.modelToDTO(model.business)
      : null;
    this.organizationId = model.organizationId;
    this.organization = model.organization
      ? OrganizationMapper.modelToDTO(model.organization)
      : null;
    this.businessOutletId = model.businessOutletId;
    this.businessOutlet = model.businessOutlet
      ? BusinessOutletMapper.modelToDTO(model.businessOutlet)
      : null;
    this.organizationUserId = model.organizationUserId;
    this.organizationUser = model.organizationUser
      ? UserMapper.modelToDTO(model.organizationUser)
      : null;
    this.lat = model.lat;
    this.lng = model.lng;
    this.address = model.address;
    this.villageId = model.villageId;
    this.districtId = model.districtId;
    this.cityId = model.cityId;
    this.provinceId = model.provinceId;
    this.status = model.status;
    this.ongoingStatus = model.ongoingStatus;
    this.rejectedReason = model.rejectedReason;
    this.name = model.name;
    this.phoneNumber = model.phoneNumber;
    this.countryCode = model.countryCode;
    this.email = model.email;
    this.ktpNumber = model.ktpNumber;
    this.ktpAddress = model.ktpAddress;
    this.ktpVillageName = model.ktpVillageName;
    this.ktpDistrictName = model.ktpDistrictName;
    this.ktpCityName = model.ktpCityName;
    this.ktpProvinceName = model.ktpProvinceName;
    this.bankAccountProviderName = model.bankAccountProviderName;
    this.bankAccountName = model.bankAccountName;
    this.bankAccountNumber = model.bankAccountNumber;
    this.domicileAddress = model.domicileAddress;
    this.termSheetAgreementNumber = model.termSheetAgreementNumber;
    this.onboardingResponseJson = model.onboardingResponseJson;
    this.interviewResponseJson = model.interviewResponseJson;
    this.surveyResponseJson = model.surveyResponseJson;
    this.trainingResponseJson = model.trainingResponseJson;
    this.interviewResponseParsedJson = model.interviewResponseParsedJson;
    this.surveyResponseParsedJson = model.surveyResponseParsedJson;
    this.trainingResponseParsedJson = model.trainingResponseParsedJson;
    this.interviewMeetUrl = model.interviewUrl;
    this.surveyUrl = model.surveyUrl;
    this.trainingUrl = model.trainingUrl;
    this.notes = model.notes;
    this.depositPaymentUrl = model.depositPaymentUrl;
    this.finalFeePaymentUrl = model.finalFeePaymentUrl;
    this.interviewMeetUrl = model.interviewMeetUrl;
    this.interviewSchedule = model.interviewSchedule;
    this.surveySchedule = model.surveySchedule;
    this.trainingSchedule = model.trainingSchedule;
    this.expiredSchedule = model.expiredSchedule;
    this.xDocusignEnvelopId = model.xDocusignEnvelopId;
    this.updatedBy = model.updatedBy;
    this.modifier = model.modifier
      ? UserMapper.modelToDTO(model.modifier)
      : null;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  organizationId: string;
  @Field(type => Organization)
  organization: Organization;

  businessId: string;
  @Field(type => Business)
  business: Business;

  businessOutletId?: string;
  @Field(type => BusinessOutlet, { nullable: true })
  businessOutlet: BusinessOutlet;

  organizationUserId: string;
  @Field(type => OrganizationUser)
  organizationUser: OrganizationUser;

  @Field(type => Float)
  lat: number;

  @Field(type => Float)
  lng: number;

  @Field()
  address: string;

  @Field()
  villageId: number;

  @Field()
  districtId: number;

  @Field()
  cityId: number;

  @Field()
  provinceId: number;

  @Field()
  name: string;

  @Field(type => BusinessOutletLeadStatus)
  status: BusinessOutletLeadStatus;

  @Field(type => BusinessOutletLeadOngoingStatus)
  ongoingStatus: BusinessOutletLeadOngoingStatus;

  @Field(type => BusinessOutletLeadRejectedReason, { nullable: true })
  rejectedReason: BusinessOutletLeadRejectedReason;

  @Field()
  phoneNumber: string;

  @Field()
  countryCode: string;

  @Field()
  email: string;

  @Field()
  ktpNumber: string;

  @Field({ nullable: true })
  ktpAddress?: string;

  @Field({ nullable: true })
  ktpVillageName?: string;

  @Field({ nullable: true })
  ktpDistrictName: string;

  @Field({ nullable: true })
  ktpCityName?: string;

  @Field({ nullable: true })
  ktpProvinceName?: string;

  @Field({ nullable: true })
  bankAccountProviderName?: string;

  @Field({ nullable: true })
  bankAccountName?: string;

  @Field({ nullable: true })
  bankAccountNumber?: string;

  @Field({ nullable: true })
  domicileAddress?: string;

  @Field({ nullable: true })
  termSheetAgreementNumber?: string;

  @Field(() => JSON, { nullable: true })
  onboardingResponseJson: object;

  @Field(() => JSON, { nullable: true })
  interviewResponseJson?: object;

  @Field(() => JSON, { nullable: true })
  surveyResponseJson?: object;

  @Field(() => JSON, { nullable: true })
  trainingResponseJson?: object;

  @Field(() => JSON, { nullable: true })
  interviewResponseParsedJson?: object;

  @Field(() => JSON, { nullable: true })
  surveyResponseParsedJson?: object;

  @Field(() => JSON, { nullable: true })
  trainingResponseParsedJson?: object;

  @Field({ nullable: true })
  interviewUrl?: string;

  @Field({ nullable: true })
  surveyUrl?: string;

  @Field({ nullable: true })
  trainingUrl?: string;

  @Field({ nullable: true })
  notes: string;

  @Field({ nullable: true })
  interviewSchedule: Date;

  @Field({ nullable: true })
  surveySchedule: Date;

  @Field({ nullable: true })
  trainingSchedule: Date;

  @Field({ nullable: true })
  expiredSchedule: Date;

  @Field({ nullable: true })
  depositPaymentUrl?: string;

  @Field({ nullable: true })
  finalFeePaymentUrl?: string;

  @Field({ nullable: true })
  interviewMeetUrl?: string;

  @Field({ nullable: true })
  xDocusignEnvelopId?: string;

  @Field({ nullable: true })
  termSheetLink?: string;

  @Field(() => [BusinessMerchantOrder])
  businessMerchantOrders: BusinessMerchantOrder[];

  @Field(() => [BusinessOutletLeadMedia], { nullable: true })
  businessOutletLeadMedias?: BusinessOutletLeadMedia[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(type => ID, { nullable: true })
  updatedBy: string;

  @Field(type => OrganizationUser, { nullable: true })
  modifier: OrganizationUser;

  @Field({ nullable: true })
  deletedAt?: Date;
}
