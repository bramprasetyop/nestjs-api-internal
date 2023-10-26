import { HttpService, Injectable } from '@nestjs/common';
import {
  Kiosk,
  ArgsGetKioskList,
  ArgsGetKioskNearestList
} from './interfaces/kiosk.interface';
import { JWTService } from './jwt.service';
import { catchError, map } from 'rxjs/operators';
import { config } from '@wahyoo/wahyoo-shared';
import { PaginationMeta } from './interfaces/common.interface';
import { User } from './interfaces/user.interface';
import {
  ArgGetOrderDeliveryTimeWindowList,
  OrderDeliveryTimeWindow
} from './interfaces/order.interface';
import { OrderDeliveryTimeWindowGetListResponse } from '../salesOrder/dto/orderDeliveryTimeWindowGetListResponse.dto';

interface KioskListReponse {
  kiosks: Kiosk[];
  meta: PaginationMeta;
}

@Injectable()
export class InternalAPIService {
  jwtToken: string;
  constructor(
    private httpService: HttpService,
    private jwtService: JWTService
  ) {
    this.httpService.axiosRef.defaults.baseURL = config.internalAPIEndpoint;
    this.jwtToken = this.jwtService.createTokenInternalAPI();
    this.httpService.axiosRef.defaults.headers = {
      Authorization: `Bearer ${this.jwtToken}`
    };
  }

  private refreshToken() {
    const newToken = this.jwtService.renewTokenInternalAPI(this.jwtToken);
    this.httpService.axiosRef.defaults.headers = {
      Authorization: `Bearer ${this.jwtToken}`
    };
    if (newToken !== this.jwtToken) {
      this.jwtToken = newToken;
      this.httpService.axiosRef.defaults.headers = {
        Authorization: `Bearer ${this.jwtToken}`
      };
    }
  }

  async getKioskNearestList(args: ArgsGetKioskNearestList): Promise<Kiosk[]> {
    this.refreshToken();
    const data = {
      query: `query kioskNearestList($lat: Float!, $lng: Float!, $search:String, $tags:[String]!, $pageSize: Int) {
        kioskNearestList(lat: $lat, lng: $lng, tags: $tags, search:$search, pageSize: $pageSize) {
          id
          distance
        }
      }`,
      variables: {
        lat: args.lat,
        lng: args.lng,
        search: args.search,
        tags: args.tags,
        pageSize: args.pageSize
      }
    };

    return this.httpService
      .post('', data)
      .pipe(
        map(res => res.data.data.kioskNearestList),
        catchError(err => {
          // handle custom error
          throw err;
        })
      )
      .toPromise();
  }

  async getKioskList(args: ArgsGetKioskList): Promise<KioskListReponse> {
    this.refreshToken();
    const data = {
      query: `query ($search: String, $page: Int, $pageSize: Int, $sortBy: SortBy, $filter: KioskAdminFilter) {
        kioskListAdmin(page: $page, search: $search, pageSize: $pageSize, sort: $sortBy, filter: $filter) {
          kiosks {
            id
            name 
            code 
            address
            lat
            lng
            status
            createdAt
            updatedAt
            deletedAt
          }
          meta {
            total
            pageSize
            currentPage
            totalPage
          }
        }
      }`,
      variables: {
        search: args.search,
        page: args.page,
        pageSize: args.pageSize,
        filter: args.filter,
        sortBy: args.sortBy
      }
    };

    return this.httpService
      .post('', data)
      .pipe(
        map(res => res.data.data.kioskListAdmin),
        catchError(err => {
          // handle custom error
          throw err;
        })
      )
      .toPromise();
  }

  async getOrderDeliveryTimeWindowList(
    args: ArgGetOrderDeliveryTimeWindowList
  ): Promise<OrderDeliveryTimeWindowGetListResponse> {
    this.refreshToken();
    const data = {
      query: `query ($search: String, $page: Int, $pageSize: Int, $sortBy: SortBy, $filter: OrderDeliveryTimeWindowFilter) {
        orderDeliveryTimeWindowList(page: $page, search: $search, pageSize: $pageSize, sort: $sortBy, filter: $filter) {
          orderDeliveryTimeWindows {
            id
            startTime
            endTime
            startTime
            endTime
            label
            deliveryType
            isDefault
            polygonBoundaries
            status
            deliveryFee
            minimumAmount
            freeDeliveryMinAmount
            createdAt
            updatedAt
          }
          meta {
            total
            pageSize
            currentPage
            totalPage
          }
        }
      }`,
      variables: {
        search: args.search,
        page: args.page,
        pageSize: args.pageSize,
        filter: args.filter,
        sortBy: args.sortBy
      }
    };

    return this.httpService
      .post('', data)
      .pipe(
        map(res => res.data.data.orderDeliveryTimeWindowList),
        catchError(err => {
          // handle custom error
          throw err;
        })
      )
      .toPromise();
  }

  async getKioskById(id: string): Promise<Kiosk> {
    this.refreshToken();
    const data = {
      query: `query ($id: ID!) {
        kioskDetail(id: $id) {
          id
          name 
          code 
          address
          lat
          lng
          status
          createdAt
          updatedAt
          deletedAt
        }
      }`,
      variables: {
        id
      }
    };

    return this.httpService
      .post('', data)
      .pipe(
        map(res => res.data.data.kioskDetail),
        catchError(err => {
          // handle custom error
          throw err;
        })
      )
      .toPromise();
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<User | null> {
    this.refreshToken();
    const data = {
      query: `query ($phoneNumber: String!) {
        userDetailByPhoneNumber(phoneNumber: $phoneNumber) {
          id
          firstName
          lastName
          name
          phoneNumber
          countryCode
          email
          address
          status
        }
      }`,
      variables: {
        phoneNumber
      }
    };

    return this.httpService
      .post('', data)
      .pipe(
        map(res => res.data.data.userDetailByPhoneNumber),
        catchError(err => {
          // handle custom error
          throw err;
        })
      )
      .toPromise();
  }

  async getOrderDeliveryTimeWindowCoverageListByLatLng(
    lat: number,
    lng: number
  ): Promise<OrderDeliveryTimeWindow[]> {
    this.refreshToken();
    const data = {
      query: `query ($lat: Float!, $lng: Float!) {
        orderDeliveryTimeWindowCoverageListByLatLng(lat: $lat, lng: $lng) {
          id
        }
      }`,
      variables: {
        lat,
        lng
      }
    };

    return this.httpService
      .post('', data)
      .pipe(
        map(res => res.data.data.orderDeliveryTimeWindowCoverageListByLatLng),
        catchError(err => {
          // handle custom error
          throw err;
        })
      )
      .toPromise();
  }
}
