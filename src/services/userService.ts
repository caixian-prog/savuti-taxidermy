import { IUserInfo } from "../config/interfaces";
import { axiosGet, axiosPost, ENDPOINT_ERROR } from "./ajaxService";
import {
  urlChangeUserPassword,
  urlDeleteUser,
  urlGetUserById,
  urlGetUserList,
  urlUserRegister,
} from "./CONSTANTS";

export const apiGetUserList = () => {
  return axiosGet(urlGetUserList, {}, ENDPOINT_ERROR);
};
export const apiGetUserById = (id: number) => {
  return axiosGet(urlGetUserById, { id: id }, ENDPOINT_ERROR);
};

export const apiChangeUserPassword = (
  id: number,
  old_pass: string,
  new_pass: string
) => {
  return axiosPost(
    urlChangeUserPassword,
    {
      id: id,
      old_password: old_pass,
      new_password: new_pass,
    },
    ENDPOINT_ERROR
  );
};
export const apiDeleteUser = (id: number) => {
  return axiosPost(urlDeleteUser, { id: id }, ENDPOINT_ERROR);
};
