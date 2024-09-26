import axios from "axios";
export const SYSTEM_ERROR = "System error. Please try again later!";
export const ENDPOINT_ERROR =
  "The endpoint is not working now, try again later!";

export const axiosPost = (
  url: string,
  param: any,
  errorMessage = ""
): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(url, param)
        .then((res: any) => {
          const { data } = res;
          if (data.status === true) {
            resolve(data.data);
          } else {
            reject(data.message);
          }
        })
        .catch((err: any) => {
          reject(err);
        });
    } catch (error) {
      console.error(errorMessage, error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const axiosGet = (url: string, param: any, errorMessage = "") => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(url, { params: param })
        .then((res: any) => {
          const { data } = res;
          if (data.status === true) {
            resolve(data.data);
          } else {
            reject(data.message);
          }
        })
        .catch((err: any) => {
          reject(err);
        });
    } catch (error) {
      console.error(errorMessage, error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const axiosFormPost = (
  url: string,
  formData: FormData,
  errorMessage = ""
) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(url, formData, config)
        .then((res: any) => {
          const { data } = res;
          if (data.status === true) {
            resolve(data.data);
          } else {
            reject(data.message);
          }
        })
        .catch((err: any) => {
          reject(err);
        });
    } catch (error) {
      reject(SYSTEM_ERROR);
    }
  });
};
