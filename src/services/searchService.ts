import { axiosGet, ENDPOINT_ERROR } from "./ajaxService";
import { urlSearchOrders } from "./CONSTANTS";

export const apiSearchOrders = (keyword: string, type: number) => {
  return axiosGet(
    urlSearchOrders,
    { keyword: keyword, type: type },
    ENDPOINT_ERROR
  );
};
