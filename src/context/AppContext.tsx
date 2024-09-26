import React, { useMemo, useRef, useState } from "react";
// import { format, parse, startOfDay, sub } from "date-fns";
import { setStorage } from "../utils/storage";
import { notification } from "antd";
import { NotificationType } from "../config/types";

interface AppContextInterface {
  isBusy?: boolean;
  values: Record<string, any>;
  controlValue: Record<string, any>;
  setControlValue: (key: string, value: any) => void;
  apply: () => void;
  setIsBusy: (e: boolean) => void;
  showToast: (
    title?: string,
    description?: string,
    type?: NotificationType
  ) => void;
}

export const AppContext = React.createContext<AppContextInterface | undefined>(
  undefined
);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [values, setValues] = useState<AppContextInterface["values"]>({});
  const valueRef = useRef<AppContextInterface["values"]>({});
  const [busy, setBusy] = useState<AppContextInterface["isBusy"]>(false);
  const [api, contextHolder] = notification.useNotification();

  const setControlValue = (key: string, value: string) => {
    valueRef.current[key] = value;
  };

  const apply = () => {
    setValues({ ...valueRef.current });
    Object.keys(valueRef.current).map((key) => {
      setStorage(key, valueRef.current[key]);
    });
  };
  const setIsBusy = (busy: boolean) => {
    setBusy(busy);
  };

  const showToast = (
    title: string = "",
    description: string = "",
    type: NotificationType = "success"
  ) => {
    api[type]({
      message: title,
      description: description,
    });
  };

  // console.log(`cai:AppProvider`, { values, valuesRef: valueRef.current });
  return (
    <AppContext.Provider
      value={{
        values,
        controlValue: valueRef.current,
        setControlValue,
        apply,
        isBusy: busy,
        setIsBusy,
        showToast,
      }}
    >
      {contextHolder}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};
