import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Loader } from 'src/commons/loader';
import { DistrictSingleByIdLoader } from './district.singleById.loader';
import { District } from './dto/district.dto';
import { Village } from './dto/village.dto';
import { VillageGetListRequest } from './dto/villageGetListRequest.dto';
import { VillageGetListResponse } from './dto/villageGetListResponse.dto';
import { VillageGetListUseCase } from './useCases/village.getList.usecase';

@Resolver(Village)
export class VillageResolver {
  constructor(private readonly villageGetListUseCase: VillageGetListUseCase) {}

  @Query(() => VillageGetListResponse)
  async villageList(
    @Args() requestDTO: VillageGetListRequest
  ): Promise<VillageGetListResponse> {
    return this.villageGetListUseCase.execute(requestDTO);
  }

  // FIELD DATA LOADER
  @ResolveField(() => District)
  async district(
    @Parent() village: Village,
    @Loader(DistrictSingleByIdLoader.name)
    districtSingleByIdLoader: DataLoader<string, District>
  ): Promise<District> {
    try {
      const response = await districtSingleByIdLoader.load(
        String(village.districtId)
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
