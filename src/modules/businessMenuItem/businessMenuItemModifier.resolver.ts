import {
  Parent,
  Args,
  Mutation,
  ResolveField,
  Query,
  Resolver
} from '@nestjs/graphql';
import { BusinessMenuItem } from './dto/businessMenuItem.dto';
import { Loader } from 'src/commons/loader';
import DataLoader = require('dataloader');
import { BusinessMenuItemSingleByIdLoader } from './businessMenuItem.singleById.loader';
import { BusinessMenuModifier } from '../businessMenuModifier/dto/businessMenuModifier.dto';
import { BusinessMenuModifierSingleByIdLoader } from '../businessMenuModifier/businessMenuModifier.singleById.loader';
import { BusinessMenuItemModifier } from './dto/businessMenuItemModifier.dto';

@Resolver(BusinessMenuItemModifier)
export class BusinessMenuItemModifierResolver {
  // FIELD DATA LOADER
  @ResolveField(() => BusinessMenuItem)
  async businessMenuItem(
    @Parent() businessMenuItemModifier: BusinessMenuItemModifier,
    @Loader(BusinessMenuItemSingleByIdLoader.name)
    businessMenuItemSingleByIdLoader: DataLoader<string, BusinessMenuItem>
  ): Promise<BusinessMenuItem> {
    try {
      const response = await businessMenuItemSingleByIdLoader.load(
        businessMenuItemModifier.businessMenuItemId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @ResolveField(() => BusinessMenuModifier)
  async businessMenuModifier(
    @Parent() businessMenuItemModifier: BusinessMenuItemModifier,
    @Loader(BusinessMenuModifierSingleByIdLoader.name)
    businessMenuItemSingleByIdLoader: DataLoader<
      BusinessMenuModifier['id'],
      BusinessMenuModifier
    >
  ): Promise<BusinessMenuModifier> {
    try {
      const response = await businessMenuItemSingleByIdLoader.load(
        businessMenuItemModifier.businessMenuModifierId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
