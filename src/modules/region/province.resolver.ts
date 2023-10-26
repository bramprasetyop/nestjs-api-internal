import { Args, Query, Resolver } from '@nestjs/graphql';
import { Province } from './dto/province.dto';
import { ProvinceGetListRequest } from './dto/provinceGetListRequest.dto';
import { ProvinceGetListResponse } from './dto/provinceGetListResponse.dto';
import { ProvinceGetListUseCase } from './useCases/province.getList.usecase';

@Resolver(Province)
export class ProvinceResolver {
  constructor(
    private readonly provinceGetListUseCase: ProvinceGetListUseCase
  ) {}

  @Query(() => ProvinceGetListResponse)
  async provinceList(
    @Args() requestDTO: ProvinceGetListRequest
  ): Promise<ProvinceGetListResponse> {
    return this.provinceGetListUseCase.execute(requestDTO);
  }
}
