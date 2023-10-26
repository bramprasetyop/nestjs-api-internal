import {
  Field,
  Float,
  ID,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql';
import {
  BusinessOutletModel,
  BusinessOutletStatus
} from '@wahyoo/wahyoo-shared';
import { Business } from 'src/modules/business/dto/business.dto';
import { BusinessOutletLead } from 'src/modules/businessOutletLead/dto/businessOutletLead.dto';
import { BusinessOutletProperty } from 'src/modules/businessOutletProperty/dto/businessOutletProperty.dto';
import { XHubsterStore } from 'src/modules/hubster/dto/xHubsterStore';
import { City } from 'src/modules/region/dto/city.dto';
import { District } from 'src/modules/region/dto/district.dto';
import { Province } from 'src/modules/region/dto/province.dto';
import { Village } from 'src/modules/region/dto/village.dto';
import { OrganizationUser } from 'src/modules/user/dto/user.dto';
import { UserMapper } from 'src/modules/user/mappers/user.mapper';
import { XBusinessOutletKioskMapper } from '../mappers/xBusinessOutletKiosk.mapper';
import { XBusinessOutletKiosk } from './xBusinessOutletKiosk.dto';

registerEnumType(BusinessOutletStatus, {
  name: 'BusinessOutletStatus',
  description: 'BusinessOutletStatus'
});

@ObjectType()
export class BusinessOutlet {
  constructor(model: BusinessOutletModel) {
    this.id = model.id;
    this.businessId = model.businessId;
    this.xBusinessOutletKiosk = model.xBusinessOutletKiosk
      ? XBusinessOutletKioskMapper.modelToDTO(model.xBusinessOutletKiosk)
      : null;
    this.code = model.code;
    this.name = model.name;
    this.status = model.status;
    this.posAvailable = model.posAvailable;
    this.lat = model.lat;
    this.lng = model.lng;
    this.bankAccountProviderName = model.bankAccountProviderName;
    this.bankAccountName = model.bankAccountName;
    this.bankAccountNumber = model.bankAccountNumber;
    this.ktpNumber = model.ktpNumber;
    this.tkbRegion = model.tkbRegion;
    this.picName = model.picName;
    this.picPhoneNumber = model.picPhoneNumber;
    this.email = model.email;
    this.phoneNumber = model.phoneNumber;
    this.address = model.address;
    this.villageId = model.villageId;
    this.districtId = model.districtId;
    this.cityId = model.cityId;
    this.provinceId = model.provinceId;
    this.createdBy = model.createdBy;
    this.creator = model.creator ? UserMapper.modelToDTO(model.creator) : null;
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

  @Field(type => ID)
  code: string;

  @Field({ nullable: true })
  name: string;

  @Field()
  businessId: string;

  @Field({ nullable: true })
  address?: string;

  @Field(type => Business, { nullable: true })
  business?: Business;

  @Field(type => XBusinessOutletKiosk, { nullable: true })
  xBusinessOutletKiosk?: XBusinessOutletKiosk;

  @Field({ nullable: true })
  xBusinessOutletKioskName?: string;

  @Field(type => [XHubsterStore], { nullable: true })
  xHubsterStores?: XHubsterStore[];

  @Field(type => Float, { nullable: true })
  distance?: number;

  @Field(type => Float, { nullable: true })
  lat?: number;

  @Field(type => Float, { nullable: true })
  lng?: number;

  @Field(type => Boolean)
  posAvailable: boolean;

  @Field(() => BusinessOutletStatus)
  status: BusinessOutletStatus;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field(type => BusinessOutletProperty, { nullable: true })
  businessOutletProperty?: BusinessOutletProperty;

  @Field(type => BusinessOutletLead, { nullable: true })
  businessOutletLead?: BusinessOutletLead;

  @Field({ nullable: true })
  bankAccountProviderName?: string;

  @Field({ nullable: true })
  bankAccountName?: string;

  @Field({ nullable: true })
  bankAccountNumber?: string;

  @Field({ nullable: true })
  ktpNumber: string;

  @Field({ nullable: true })
  tkbRegion?: string;

  @Field({ nullable: true })
  picName?: string;

  @Field({ nullable: true })
  picPhoneNumber?: string;

  @Field(type => Village, { nullable: true })
  village?: Village;

  @Field({ nullable: true })
  villageId?: number;

  @Field(type => District, { nullable: true })
  district?: District;

  @Field({ nullable: true })
  districtId?: number;

  @Field(type => City, { nullable: true })
  city?: City;

  @Field({ nullable: true })
  cityId?: number;

  @Field(type => Province, { nullable: true })
  province?: Province;

  @Field({ nullable: true })
  provinceId?: number;

  @Field(type => ID, { nullable: true })
  createdBy?: string;

  @Field(type => ID, { nullable: true })
  updatedBy?: string;

  @Field(type => OrganizationUser, { nullable: true })
  creator?: OrganizationUser;

  @Field(type => OrganizationUser, { nullable: true })
  modifier?: OrganizationUser;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;

  businessOutletIds?: string[];
}
