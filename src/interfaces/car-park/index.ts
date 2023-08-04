import { GetQueryInterface } from 'interfaces';

export interface CarParkInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  parking?: string;
  note?: string;
  feedback?: string;
  amount?: number;

  _count?: {};
}

export interface CarParkGetQueryInterface extends GetQueryInterface {
  id?: string;
  parking?: string;
  note?: string;
  feedback?: string;
}
