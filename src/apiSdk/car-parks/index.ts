import axios from 'axios';
import queryString from 'query-string';
import { CarParkInterface, CarParkGetQueryInterface } from 'interfaces/car-park';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCarParks = async (query?: CarParkGetQueryInterface): Promise<PaginatedInterface<CarParkInterface>> => {
  const response = await axios.get('/api/car-parks', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createCarPark = async (carPark: CarParkInterface) => {
  const response = await axios.post('/api/car-parks', carPark);
  return response.data;
};

export const updateCarParkById = async (id: string, carPark: CarParkInterface) => {
  const response = await axios.put(`/api/car-parks/${id}`, carPark);
  return response.data;
};

export const getCarParkById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/car-parks/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCarParkById = async (id: string) => {
  const response = await axios.delete(`/api/car-parks/${id}`);
  return response.data;
};
