import { SortBy } from './common.interface';

export enum OrderDeliveryTimeWindowStatus {
  active = 'active',
  inactive = 'inactive'
}

export enum OrderDeliveryTimeWindowDeliveryType {
  all = 'all',
  morning = 'morning',
  scheduled = 'scheduled'
}

export interface OrderDeliveryTimeWindow {
  id: string;
  startTime: string;
  endTime: string;
  label: string;
  deliveryType: OrderDeliveryTimeWindowDeliveryType;
  isDefault: boolean;
  polygonBoundaries: JSON;
  status: OrderDeliveryTimeWindowStatus;
  deliveryFee: number;
  minimumAmount: number;
  freeDeliveryMinAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderDeliveryTimeWindowFilter {
  status: OrderDeliveryTimeWindowStatus;
  deliveryType: OrderDeliveryTimeWindowDeliveryType;
}

export interface ArgGetOrderDeliveryTimeWindowList {
  search: string;
  page: number;
  pageSize: number;
  sortBy: SortBy;
  filter: OrderDeliveryTimeWindowFilter;
}
