import {
  Field,
  Float,
  ID,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql';
import { BusinessMerchantOrderModel } from '@wahyoo/wahyoo-shared';
import {
  BusinessMerchantOrderStatus,
  BusinessMerchantOrderType
} from '@wahyoo/wahyoo-shared/dist/constants/enums';
import { Business } from 'src/modules/business/dto/business.dto';
import { BusinessMapper } from 'src/modules/business/mappers/business.mapper';
import { BusinessOutlet } from 'src/modules/businessOutlet/dto/businessOutlet.dto';
import { BusinessOutletMapper } from 'src/modules/businessOutlet/mappers/businessOutlet.mapper';
import { BusinessOutletLead } from 'src/modules/businessOutletLead/dto/businessOutletLead.dto';
import { BusinessOutletLeadMapper } from 'src/modules/businessOutletLead/mappers/businessOutletLead.mapper';
import { Organization } from 'src/modules/organization/dto/organization.dto';
import { OrganizationMapper } from 'src/modules/organization/mappers/organization.mapper';
import { City } from 'src/modules/region/dto/city.dto';
import { District } from 'src/modules/region/dto/district.dto';
import { Province } from 'src/modules/region/dto/province.dto';
import { Village } from 'src/modules/region/dto/village.dto';
import { CityMapper } from 'src/modules/region/mappers/city.mapper';
import { DistrictMapper } from 'src/modules/region/mappers/district.mapper';
import { ProvinceMapper } from 'src/modules/region/mappers/province.mapper';
import { VillageMapper } from 'src/modules/region/mappers/village.mapper';
import { OrganizationUser } from 'src/modules/user/dto/user.dto';
import { BusinessMerchantOrderItemMapper } from '../mappers/businessMerchantOrderItem.mapper';
import { BusinessMerchantOrderPaymentMapper } from '../mappers/businessMerchantOrderPayment.mapper';
import { BusinessMerchantOrderItem } from './businessMerchantOrderItem.dto';
import { BusinessMerchantOrderPayment } from './businessMerchantOrderPayment.dto';

registerEnumType(BusinessMerchantOrderStatus, {
  name: 'BusinessMerchantOrderStatus',
  description: 'BusinessMerchantOrderStatus'
});

registerEnumType(BusinessMerchantOrderType, {
  name: 'BusinessMerchantOrderType',
  description: 'BusinessMerchantOrderType'
});

@ObjectType()
export class BusinessMerchantOrder {
  constructor(model: BusinessMerchantOrderModel) {
    this.id = model.id;
    this.organizationUserId = model.organizationUserId;
    this.businessOutletLeadId = model.businessOutletLeadId;
    this.businessOutletLead = model.businessOutletLead
      ? BusinessOutletLeadMapper.modelToDTO(model.businessOutletLead)
      : null;
    this.businessOutletId = model.businessOutletId;
    this.businessOutlet = model.businessOutlet
      ? BusinessOutletMapper.modelToDTO(model.businessOutlet)
      : null;
    this.businessId = model.businessId;
    this.business = model.business
      ? BusinessMapper.modelToDTO(model.business)
      : null;
    this.organizationId = model.organizationId;
    this.organization = model.organization
      ? OrganizationMapper.modelToDTO(model.organization)
      : null;
    this.code = model.code;
    this.deliveryAddress = model.deliveryAddress;
    this.deliveryVillageId = model.deliveryVillageId;
    this.deliveryVillage = model.deliveryVillage
      ? VillageMapper.modelToDTO(model.deliveryVillage)
      : null;
    this.deliveryDistrictId = model.deliveryDistrictId;
    this.deliveryDistrict = model.deliveryDistrict
      ? DistrictMapper.modelToDTO(model.deliveryDistrict)
      : null;
    this.deliveryCityId = model.deliveryCityId;
    this.deliveryCity = model.deliveryCity
      ? CityMapper.modelToDTO(model.deliveryCity)
      : null;
    this.deliveryProvinceId = model.deliveryProvinceId;
    this.deliveryProvince = model.deliveryProvince
      ? ProvinceMapper.modelToDTO(model.deliveryProvince)
      : null;
    this._deliveryVillage = model._deliveryVillage;
    this._deliveryDistrict = model._deliveryDistrict;
    this._deliveryCity = model._deliveryCity;
    this._deliveryZipCode = model._deliveryZipCode;
    this._deliveryLat = model._deliveryLat;
    this._deliveryLng = model._deliveryLng;
    this.status = model.status;
    this._totalInIdr = model._totalInIdr;
    this.userNotes = model.userNotes;
    this.employeeReason = model.employeeReason;
    this.employeeNotes = model.employeeNotes;
    this.type = model.type;
    this.businessMerchantOrderItems = model.businessMerchantOrderItems
      ? BusinessMerchantOrderItemMapper.modelsToDTOs(
          model.businessMerchantOrderItems
        )
      : [];
    this.businessMerchantOrderPayment = model.businessMerchantOrderPayment
      ? BusinessMerchantOrderPaymentMapper.modelToDTO(
          model.businessMerchantOrderPayment
        )
      : null;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.deletedAt = model.deletedAt;
  }

  @Field(type => ID)
  id: string;

  @Field(type => ID)
  organizationUserId: string;

  @Field(type => OrganizationUser)
  organizationUser: OrganizationUser;

  @Field(type => ID, { nullable: true })
  businessOutletLeadId?: string;

  @Field(type => BusinessOutletLead)
  businessOutletLead: BusinessOutletLead;

  @Field(type => ID, { nullable: true })
  businessOutletId?: string;

  @Field(type => BusinessOutlet)
  businessOutlet: BusinessOutlet;

  @Field(type => ID)
  businessId: string;

  @Field(type => Business)
  business: Business;

  @Field(type => ID)
  organizationId: string;

  @Field(type => Organization)
  organization: Organization;

  @Field(type => String)
  code: string;

  @Field(type => String, { nullable: true })
  deliveryAddress?: string;

  @Field(type => ID, { nullable: true })
  deliveryVillageId: number;

  @Field(type => Village)
  deliveryVillage: Village;

  @Field(type => ID, { nullable: true })
  deliveryDistrictId: number;

  @Field(type => District)
  deliveryDistrict: District;

  @Field(type => ID, { nullable: true })
  deliveryCityId: number;

  @Field(type => City)
  deliveryCity: City;

  @Field(type => ID, { nullable: true })
  deliveryProvinceId: number;

  @Field(type => Province)
  deliveryProvince: Province;

  @Field(type => String, { nullable: true })
  _deliveryVillage?: string;

  @Field(type => String, { nullable: true })
  _deliveryDistrict?: string;

  @Field(type => String, { nullable: true })
  _deliveryCity?: string;

  @Field(type => String, { nullable: true })
  _deliveryZipCode?: string;

  @Field(type => Float, { nullable: true })
  _deliveryLat?: number;

  @Field(type => Float, { nullable: true })
  _deliveryLng?: number;

  @Field(type => BusinessMerchantOrderStatus)
  status: BusinessMerchantOrderStatus;

  @Field(type => Float)
  _totalInIdr: number;

  @Field(type => String, { nullable: true })
  userNotes?: string;

  @Field(type => String, { nullable: true })
  employeeReason?: string;

  @Field(type => String, { nullable: true })
  employeeNotes?: string;

  @Field(type => BusinessMerchantOrderType)
  type: BusinessMerchantOrderType;

  @Field(type => [BusinessMerchantOrderItem])
  businessMerchantOrderItems: BusinessMerchantOrderItem[];

  @Field(type => BusinessMerchantOrderPayment, { nullable: true })
  businessMerchantOrderPayment?: BusinessMerchantOrderPayment;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
