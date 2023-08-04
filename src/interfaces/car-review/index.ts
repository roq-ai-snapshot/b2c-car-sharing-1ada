import { GetQueryInterface } from 'interfaces';

export interface CarReviewInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  condition?: number;
  year?: boolean;
  advisor?: string;

  _count?: {};
}

export interface CarReviewGetQueryInterface extends GetQueryInterface {
  id?: string;
  advisor?: string;
}
