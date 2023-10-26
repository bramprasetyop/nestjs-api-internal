import { UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Loader } from 'src/commons/loader';
import { BusinessOutletLeadSingleByIdLoader } from '../businessOutletLead/businessOutletLead.singleById.loader';
import { BusinessMerchantOrder } from './dto/businessMerchantOrder.dto';
import { BusinessOutletLead } from '../businessOutletLead/dto/businessOutletLead.dto';
import { BusinessOutlet } from '../businessOutlet/dto/businessOutlet.dto';
import { BusinessOutletSingleByIdLoader } from '../businessOutlet/businessOutlet.singleById.loader';
import { Business } from '../business/dto/business.dto';
import { BusinessSingleByIdLoader } from '../business/business.singleById.loader';
import { Organization } from '../organization/dto/organization.dto';
import { OrganizationSingleByIdLoader } from '../organization/organization.singleById.loader';
import { Village } from '../region/dto/village.dto';
import { VillageSingleByIdLoader } from '../region/village.singleById.loader';
import { DistrictSingleByIdLoader } from '../region/district.singleById.loader';
import { District } from '../region/dto/district.dto';
import { City } from '../region/dto/city.dto';
import { CitySingleByIdLoader } from '../region/city.singleById.loader';
import { Province } from '../region/dto/province.dto';
import { ProvinceSingleByIdLoader } from '../region/province.singleById.loader';
import { BusinessMerchantOrderItem } from './dto/businessMerchantOrderItem.dto';
import { BusinessMerchantOrderItemBatchByBusinessMerchantOrderIdLoader } from './businessMerchantOrderItem.batchByBusinessMerchantOrderId.loader';
import { BusinessMerchantOrderPayment } from './dto/businessMerchantOrderPayment.dto';
import { BusinessMerchantOrderPaymentSingleByBusinessMerchantOrderIdLoader } from './businessMerchantOrderPayment.singleByBusinessMerchantOrderId.loader';

@Resolver(BusinessMerchantOrder)
export class BusinessMerchantOrderResolver {
  //  FIELD DATA LOADER
  @ResolveField(() => BusinessOutletLead)
  async businessOutletLead(
    @Parent() businessMerchantOrder: BusinessMerchantOrder,
    @Loader(BusinessOutletLeadSingleByIdLoader.name)
    businessOutletLeadSingleByIdLoader: DataLoader<
      BusinessOutletLead['id'],
      BusinessOutletLead
    >
  ): Promise<BusinessOutletLead> {
    try {
      const response = await businessOutletLeadSingleByIdLoader.load(
        businessMerchantOrder.businessOutletLeadId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //  FIELD DATA LOADER
  @ResolveField(() => BusinessOutlet)
  async businessOutlet(
    @Parent() businessMerchantOrder: BusinessMerchantOrder,
    @Loader(BusinessOutletSingleByIdLoader.name)
    businessOutletSingleByIdLoader: DataLoader<string, BusinessOutlet>
  ): Promise<BusinessOutlet> {
    try {
      const response = await businessOutletSingleByIdLoader.load(
        businessMerchantOrder.businessOutletId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //  FIELD DATA LOADER
  @ResolveField(() => Business)
  async business(
    @Parent() businessMerchantOrder: BusinessMerchantOrder,
    @Loader(BusinessSingleByIdLoader.name)
    businessSingleByIdLoader: DataLoader<string, Business>
  ): Promise<Business> {
    try {
      const response = await businessSingleByIdLoader.load(
        businessMerchantOrder.businessId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //  FIELD DATA LOADER
  @ResolveField(() => Organization)
  async organization(
    @Parent() businessMerchantOrder: BusinessMerchantOrder,
    @Loader(OrganizationSingleByIdLoader.name)
    organizationSingleByIdLoader: DataLoader<string, Organization>
  ): Promise<Organization> {
    try {
      const response = await organizationSingleByIdLoader.load(
        businessMerchantOrder.organizationId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //  FIELD DATA LOADER
  @ResolveField(() => Village)
  async deliveryVillage(
    @Parent() businessMerchantOrder: BusinessMerchantOrder,
    @Loader(VillageSingleByIdLoader.name)
    villageSingleByIdLoader: DataLoader<string, Village>
  ): Promise<Village> {
    try {
      if (!businessMerchantOrder.deliveryVillageId) return null;
      const response = await villageSingleByIdLoader.load(
        businessMerchantOrder.deliveryVillageId.toString()
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //  FIELD DATA LOADER
  @ResolveField(() => District)
  async deliveryDistrict(
    @Parent() businessMerchantOrder: BusinessMerchantOrder,
    @Loader(DistrictSingleByIdLoader.name)
    districtSingleByIdLoader: DataLoader<string, District>
  ): Promise<District> {
    try {
      if (!businessMerchantOrder.deliveryDistrictId) return null;
      const response = await districtSingleByIdLoader.load(
        businessMerchantOrder.deliveryDistrictId.toString()
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //  FIELD DATA LOADER
  @ResolveField(() => City)
  async deliveryCity(
    @Parent() businessMerchantOrder: BusinessMerchantOrder,
    @Loader(CitySingleByIdLoader.name)
    citySingleByIdLoader: DataLoader<string, City>
  ): Promise<City> {
    try {
      if (!businessMerchantOrder.deliveryCityId) return null;
      const response = await citySingleByIdLoader.load(
        businessMerchantOrder.deliveryCityId.toString()
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //  FIELD DATA LOADER
  @ResolveField(() => Province)
  async deliveryProvince(
    @Parent() businessMerchantOrder: BusinessMerchantOrder,
    @Loader(ProvinceSingleByIdLoader.name)
    provinceSingleByIdLoader: DataLoader<string, Province>
  ): Promise<Province> {
    try {
      if (!businessMerchantOrder.deliveryProvinceId) return null;
      const response = await provinceSingleByIdLoader.load(
        businessMerchantOrder.deliveryProvinceId.toString()
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //  FIELD DATA LOADER
  @ResolveField(() => [BusinessMerchantOrderItem])
  async businessMerchantOrderItems(
    @Parent() businessMerchantOrder: BusinessMerchantOrder,
    @Loader(BusinessMerchantOrderItemBatchByBusinessMerchantOrderIdLoader.name)
    businessMerchantOrderItemLoader: DataLoader<
      string,
      BusinessMerchantOrderItem[]
    >
  ): Promise<BusinessMerchantOrderItem[]> {
    try {
      const response = await businessMerchantOrderItemLoader.load(
        businessMerchantOrder.id
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //  FIELD DATA LOADER
  @ResolveField(() => BusinessMerchantOrderPayment)
  async businessMerchantOrderPayment(
    @Parent() businessMerchantOrder: BusinessMerchantOrder,
    @Loader(
      BusinessMerchantOrderPaymentSingleByBusinessMerchantOrderIdLoader.name
    )
    businessMerchantOrderPaymentLoader: DataLoader<
      string,
      BusinessMerchantOrderPayment
    >
  ): Promise<BusinessMerchantOrderPayment> {
    try {
      const response = await businessMerchantOrderPaymentLoader.load(
        businessMerchantOrder.id
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
