import { USERTYPE } from "../config/types";
import {
  urlUserLogin,
  urlUserMe,
  urlUserRegister,
} from "./CONSTANTS";
import { ENDPOINT_ERROR, axiosGet, axiosPost } from "./ajaxService";

export const apiLogin = (
  email: string,
  password: string,
  role: number = USERTYPE.employee
) => {
  return axiosPost(
    urlUserLogin,
    {
      email: email,
      password: password,
    //   role: role,
    },
    ENDPOINT_ERROR
  );
};

export const apiRegister = (
  name: string,
  email: string,
  phone: string,
  password: string,
  role: number = USERTYPE.employee
) => {
  return axiosPost(
    urlUserRegister,
    {
      name: name,
      email: email,
      phone: phone,
      password: password,
      role: role,
    },
    ENDPOINT_ERROR
  );
};

export const apiUserMe = () => {
  return axiosGet(urlUserMe, {}, ENDPOINT_ERROR);
};
