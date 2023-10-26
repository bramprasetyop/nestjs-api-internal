import { ArgsType } from '@nestjs/graphql';
import { Pagination } from 'src/commons/pagination.dto';

@ArgsType()
export class ProvinceGetListRequest extends Pagination {}
