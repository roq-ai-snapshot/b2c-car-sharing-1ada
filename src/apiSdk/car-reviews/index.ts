import axios from 'axios';
import queryString from 'query-string';
import { CarReviewInterface, CarReviewGetQueryInterface } from 'interfaces/car-review';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCarReviews = async (
  query?: CarReviewGetQueryInterface,
): Promise<PaginatedInterface<CarReviewInterface>> => {
  const response = await axios.get('/api/car-reviews', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createCarReview = async (carReview: CarReviewInterface) => {
  const response = await axios.post('/api/car-reviews', carReview);
  return response.data;
};

export const updateCarReviewById = async (id: string, carReview: CarReviewInterface) => {
  const response = await axios.put(`/api/car-reviews/${id}`, carReview);
  return response.data;
};

export const getCarReviewById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/car-reviews/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCarReviewById = async (id: string) => {
  const response = await axios.delete(`/api/car-reviews/${id}`);
  return response.data;
};
