import React, { useEffect, useMemo, useRef, useState } from "react";
import { USERTYPE } from "../config/types";
import { apiLogin, apiUserMe } from "../services/authService";
import { getStorage, removeStorage, setStorage } from "../utils/storage";
import axios from "axios";
import { IUserInfo } from "../config/interfaces";

interface AuthContextInterface {
  busy: boolean;
  userInfo?: IUserInfo;
  values: Record<string, string | null>;
  controlValue: Record<string, string | null>;
  setControlValue: (key: string, value: string) => void;
  apply: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextInterface | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [values, setValues] = useState<AuthContextInterface["values"]>({});
  const [busy, setBusy] = useState<AuthContextInterface["busy"]>(true);
  const [userInfo, setUserInfo] = useState<AuthContextInterface["userInfo"]>();

  const valueRef = useRef<AuthContextInterface["values"]>({});

  useEffect(() => {
    setBusy(true);
    // To check storage when the site is opened.
    const token = getStorage("token");
    const role = getStorage("role");
    // console.log(role, token);
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      apiUserMe()
        .then((res) => {
          // console.log("stored token: ", token);
          setControlValue("token", token ?? "");
          setControlValue("role", role ?? "");
          setUserInfo(res as IUserInfo);
          apply();

          setTimeout(() => {
            setBusy(false);
          }, 100);
        })
        .catch((err) => {
          setBusy(false);
        });
    } else {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    const { token } = values;
    axios.defaults.headers.common["Content-Type"] =
      "application/json; charset=UTF-8";

    if (token == null || token == "") {
      delete axios.defaults.headers.common["Authorization"];
    } else {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
  }, [values]);

  const setControlValue = (key: string, value: any) => {
    valueRef.current[key] = value;
  };

  const apply = () => {
    setValues({ ...valueRef.current });
  };

  const signIn = async (
    email: string,
    password: string,
  ): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      console.log(email, password)
      apiLogin(email, password)
        .then(async (token: any) => {
          // store token info to local storage
          setStorage("token", token);

          // set context value
          setControlValue("token", token);

          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          const _userInfo = await apiUserMe();
          setUserInfo(_userInfo as IUserInfo);
          setControlValue("role", (_userInfo as IUserInfo).role);
          setStorage("role", (_userInfo as IUserInfo).role);
          // apply
          apply();

          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const signOut = async (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      try {
        // store token info to local storage
        removeStorage("token");
        removeStorage("role");

        // set context value
        setControlValue("token", "");
        setControlValue("role", "");

        // apply
        apply();

        resolve();
      } catch (err) {
        reject(err);
      }
    });
  };

  // console.log(`cai:AuthProvider`, { values, valuesRef: valueRef.current });
  return (
    <AuthContext.Provider
      value={{
        userInfo,
        busy: busy,
        values,
        controlValue: valueRef.current,
        setControlValue,
        apply,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};
