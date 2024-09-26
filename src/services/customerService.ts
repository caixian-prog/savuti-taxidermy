import { ICustomerInfo } from "../config/interfaces";
import { axiosGet, axiosPost, ENDPOINT_ERROR } from "./ajaxService";
import {
  urlCreateCustomer,
  urlDeleteCustomer,
  urlGetCustomerById,
  urlGetCustomers,
  urlUpdateCustomer,
} from "./CONSTANTS";

export const apiGetCustomers = () => {
  return axiosGet(urlGetCustomers, {}, ENDPOINT_ERROR);
};
export const apiGetCustomerById = (id: number) => {
  return axiosGet(urlGetCustomerById, { id: id }, ENDPOINT_ERROR);
};

export const apiCreateCustomer = (param: ICustomerInfo) => {
  return axiosPost(urlCreateCustomer, param, ENDPOINT_ERROR);
};
export const apiUpdateCustomer = (param: ICustomerInfo) => {
  return axiosPost(urlUpdateCustomer, param, ENDPOINT_ERROR);
};
export const apiDeleteCustomer = (id: number) => {
  return axiosPost(urlDeleteCustomer, { id: id }, ENDPOINT_ERROR);
};
