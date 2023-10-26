import {
  Parent,
  Args,
  Mutation,
  ResolveField,
  Query,
  Resolver
} from '@nestjs/graphql';
import { BusinessSalesChannel } from './dto/businessSalesChannel.dto';
import { Business } from '../business/dto/business.dto';
import { Loader } from 'src/commons/loader';
import DataLoader = require('dataloader');
import { BusinessSalesChannelPaymentType } from './dto/businessSalesChannelPaymentType.dto';
import { BusinessSalesChannelSingleByIdLoader } from './businessSalesChannel.singleById.loader';
import { BusinessPaymentTypeSingleByIdLoader } from '../businessPaymentType/businessPaymentType.singleById.loader';
import { BusinessPaymentType } from '../businessPaymentType/dto/businessPaymentType.dto';

@Resolver(BusinessSalesChannelPaymentType)
export class BusinessSalesChannelPaymentTypeResolver {
  // FIELD DATA LOADER
  @ResolveField(() => BusinessSalesChannel)
  async businessSalesChannel(
    @Parent() businessSalesChannelPaymentType: BusinessSalesChannelPaymentType,
    @Loader(BusinessSalesChannelSingleByIdLoader.name)
    businessSalesChannelSingleByIdLoader: DataLoader<
      BusinessSalesChannel['id'],
      BusinessSalesChannel
    >
  ): Promise<BusinessSalesChannel> {
    try {
      const response = await businessSalesChannelSingleByIdLoader.load(
        businessSalesChannelPaymentType.businessSalesChannelId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  // FIELD DATA LOADER
  @ResolveField(() => BusinessPaymentType)
  async businessPaymentType(
    @Parent() businessSalesChannelPaymentType: BusinessSalesChannelPaymentType,
    @Loader(BusinessPaymentTypeSingleByIdLoader.name)
    businessPaymentTypeSingleByIdLoader: DataLoader<string, BusinessPaymentType>
  ): Promise<BusinessPaymentType> {
    try {
      let response = await businessPaymentTypeSingleByIdLoader.load(
        businessSalesChannelPaymentType.businessPaymentTypeId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
