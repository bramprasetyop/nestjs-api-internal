import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Loader } from 'src/commons/loader';
import { City } from './dto/city.dto';
import { CityGetListRequest } from './dto/cityGetListRequest.dto';
import { CityGetListResponse } from './dto/cityGetListResponse.dto';
import { Province } from './dto/province.dto';
import { ProvinceSingleByIdLoader } from './province.singleById.loader';
import { CityGetListUseCase } from './useCases/city.getList.usecase';

@Resolver(City)
export class CityResolver {
  constructor(private readonly cityGetListUseCase: CityGetListUseCase) {}

  @Query(() => CityGetListResponse)
  async cityList(
    @Args() requestDTO: CityGetListRequest
  ): Promise<CityGetListResponse> {
    return this.cityGetListUseCase.execute(requestDTO);
  }

  // FIELD DATA LOADER
  @ResolveField(() => Province)
  async province(
    @Parent() city: City,
    @Loader(ProvinceSingleByIdLoader.name)
    provinceSingleByIdLoader: DataLoader<string, Province>
  ): Promise<Province> {
    try {
      const response = await provinceSingleByIdLoader.load(
        String(city.provinceId)
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
