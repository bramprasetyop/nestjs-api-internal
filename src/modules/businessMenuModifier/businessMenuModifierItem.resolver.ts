import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Loader } from 'src/commons/loader';
import DataLoader = require('dataloader');
import { BusinessMenuModifierItem } from './dto/businessMenuModifierItem.dto';
import { BusinessMenuModifier } from './dto/businessMenuModifier.dto';
import { BusinessMenuModifierSingleByIdLoader } from './businessMenuModifier.singleById.loader';

@Resolver(BusinessMenuModifierItem)
export class BusinessMenuModifierItemResolver {
  constructor() {}

  // FIELD DATA LOADER
  @ResolveField(() => BusinessMenuModifier)
  async businessMenuModifier(
    @Parent() businessMenuModifierItem: BusinessMenuModifierItem,
    @Loader(BusinessMenuModifierSingleByIdLoader.name)
    businessMenuModifierSingleByIdLoader: DataLoader<
      string,
      BusinessMenuModifier
    >
  ): Promise<BusinessMenuModifier> {
    try {
      const response = await businessMenuModifierSingleByIdLoader.load(
        businessMenuModifierItem.businessMenuModifierId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
