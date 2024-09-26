import { axiosGet, ENDPOINT_ERROR } from "./ajaxService";
import { urlGetReports, urlSearchOrders } from "./CONSTANTS";

export const apiGetReport = (start: any, end: any) => {
  return axiosGet(urlGetReports, { start, end }, ENDPOINT_ERROR);
};
