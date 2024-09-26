import { IBriefOrderInfo, IOrderItemInfo } from "../config/interfaces";
import { USERTYPE } from "../config/types";
import { axiosGet, axiosPost, ENDPOINT_ERROR } from "./ajaxService";
import {
  urlGetOrderList,
  urlGetOrderById,
  urlGetItemsOfOrder,
  urlCreateOrder,
  urlUpdateOrder,
  urlCreateOrderItem,
  urlUpdateOrderItem,
  urlDeleteOrderItem,
  urlGetSpecieList,
  urlAddSpecie,
  urlCreatePdf,
} from "./CONSTANTS";

export const apiGetOrderList = () => {
  return axiosGet(urlGetOrderList, {}, ENDPOINT_ERROR);
};
export const apiGetOrderById = (id: any) => {
  return axiosGet(urlGetOrderById, { id: id }, ENDPOINT_ERROR);
};
export const apiGetItemsOfOrder = (id: any) => {
  return axiosGet(urlGetItemsOfOrder, { id: id }, ENDPOINT_ERROR);
};
export const apiCreateOrder = (
  orderInfo: IBriefOrderInfo,
  itemsInfo: IOrderItemInfo[]
) => {
  const param = {
    ...orderInfo,
    order_items: [...itemsInfo],
  };
  return axiosPost(urlCreateOrder, param, ENDPOINT_ERROR);
};
export const apiUpdateOrder = (
  orderInfo: IBriefOrderInfo,
  itemsInfo: IOrderItemInfo[]
) => {
  const param = {
    ...orderInfo,
    order_items: [...itemsInfo],
  };
  
  return axiosPost(urlUpdateOrder, param, ENDPOINT_ERROR);
};
export const apiGenerateItemId = (order_id: any) => {
  return axiosPost(urlCreateOrderItem, { order_id: order_id }, ENDPOINT_ERROR);
};
// export const apiCreateOrderItem = (itemsInfo: IOrderItemInfo) => {
//   return axiosPost(urlCreateOrderItem, itemsInfo, ENDPOINT_ERROR);
// };
export const apiUpdateOrderItem = (itemsInfo: IOrderItemInfo) => {
  return axiosPost(urlUpdateOrderItem, itemsInfo, ENDPOINT_ERROR);
};
export const apiDeleteOrderItem = (id: any) => {
  return axiosPost(urlDeleteOrderItem, { id: id }, ENDPOINT_ERROR);
};

export const apiGetSpecieList = () => {
  return axiosGet(urlGetSpecieList, {}, ENDPOINT_ERROR);
};
export const apiAddSpecie = (name: string) => {
  return axiosPost(urlAddSpecie, { name: name }, ENDPOINT_ERROR);
};

export const apiCreatePdf = (order_id: string, send: number)=>{
  return axiosGet(urlCreatePdf, {order_id:order_id, send: send}, ENDPOINT_ERROR)
}