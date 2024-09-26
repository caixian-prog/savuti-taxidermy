import { IOutfitterInfo } from "../config/interfaces";
import { axiosGet, axiosPost, ENDPOINT_ERROR } from "./ajaxService";
import {
  urlCreateOutfitter,
  urlDeleteOutfitter,
  urlGetOutfitterById,
  urlGetOutfitters,
  urlUpdateOutfitter,
} from "./CONSTANTS";

export const apiGetOutfitters = () => {
  return axiosGet(urlGetOutfitters, {}, ENDPOINT_ERROR);
};
export const apiGetOutfitterById = (id: number) => {
  return axiosGet(urlGetOutfitterById, { id: id }, ENDPOINT_ERROR);
};

export const apiCreateOutfitter = (param: IOutfitterInfo) => {
  return axiosPost(urlCreateOutfitter, param, ENDPOINT_ERROR);
};
export const apiUpdateOutfitter = (param: IOutfitterInfo) => {
  return axiosPost(urlUpdateOutfitter, param, ENDPOINT_ERROR);
};
export const apiDeleteOutfitter = (id: number) => {
  return axiosPost(urlDeleteOutfitter, { id: id }, ENDPOINT_ERROR);
};
