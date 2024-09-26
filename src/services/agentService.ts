import { IFreightAgentInfo } from "../config/interfaces";
import { axiosGet, axiosPost, ENDPOINT_ERROR } from "./ajaxService";
import {
  urlGetAgents,
  urlGetAgentById,
  urlCreateAgent,
  urlUpdateAgent,
  urlDeleteAgent,
} from "./CONSTANTS";

export const apiGetAgents = () => {
  return axiosGet(urlGetAgents, {}, ENDPOINT_ERROR);
};
export const apiGetAgentById = (id: number) => {
  return axiosGet(urlGetAgentById, { id: id }, ENDPOINT_ERROR);
};

export const apiCreateAgent = (param: IFreightAgentInfo) => {
  return axiosPost(urlCreateAgent, param, ENDPOINT_ERROR);
};
export const apiUpdateAgent = (param: IFreightAgentInfo) => {
  return axiosPost(urlUpdateAgent, param, ENDPOINT_ERROR);
};
export const apiDeleteAgent = (id: number) => {
  return axiosPost(urlDeleteAgent, { id: id }, ENDPOINT_ERROR);
};
