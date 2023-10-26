import { SortBy } from './common.interface';

export interface Kiosk {
  id: string;
  code: string;
  name: string;
  address: string;
  lat?: number;
  lng?: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  distance: number;
}

export interface ArgsGetKioskNearestList {
  lat: number;
  lng: number;
  search: string;
  tags: string[];
  pageSize?: number;
}

export enum FilterKioskStatus {
  active = 'active',
  inactive = 'inactive',
  suspended = 'suspended',
  in_verification = 'in_verification',
  closed = 'closed'
}

export interface WahyooKioskFilter {
  kioskId: string;
  provinceId: string;
  cityId: string;
  villageId: string;
  userId: string;
  status: FilterKioskStatus;
  lat: number;
  lng: number;
}

export interface ArgsGetKioskList {
  search: string;
  page: number;
  pageSize: number;
  sortBy: SortBy;
  filter: WahyooKioskFilter;
}
