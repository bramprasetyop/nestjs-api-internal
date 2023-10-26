import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Loader } from 'src/commons/loader';
import { CitySingleByIdLoader } from './city.singleById.loader';
import { City } from './dto/city.dto';
import { District } from './dto/district.dto';
import { DistrictGetListRequest } from './dto/districtGetListRequest.dto';
import { DistrictGetListResponse } from './dto/districtGetListResponse.dto';
import { DistrictGetListUseCase } from './useCases/district.getList.usecase';

@Resolver(District)
export class DistrictResolver {
  constructor(
    private readonly districtGetListUseCase: DistrictGetListUseCase
  ) {}

  @Query(() => DistrictGetListResponse)
  async districtList(
    @Args() requestDTO: DistrictGetListRequest
  ): Promise<DistrictGetListResponse> {
    return this.districtGetListUseCase.execute(requestDTO);
  }

  // FIELD DATA LOADER
  @ResolveField(() => City)
  async city(
    @Parent() district: District,
    @Loader(CitySingleByIdLoader.name)
    citySingleByIdLoader: DataLoader<string, City>
  ): Promise<City> {
    try {
      const response = await citySingleByIdLoader.load(String(district.cityId));
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
