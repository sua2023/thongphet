"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface IRefreshTypes {
  children: ReactNode;
}
interface IInitialState {
  isAutoClose: boolean;
  isStatus: string;
}
const AutoRefreshContext = createContext<{
  refreshAuto: IInitialState | null;
  setRefreshAuto: React.Dispatch<React.SetStateAction<IInitialState | null>>;
} | null>(null);
export const AutoRefreshProvider = ({ children }: IRefreshTypes) => {
  const [refreshAuto, setRefreshAuto] = useState<IInitialState | null>({
    isAutoClose: false,
    isStatus: "",
  });

  React.useEffect(() => {
    if (refreshAuto?.isAutoClose) {
      const timeoutId = setTimeout(() => {
        setRefreshAuto((prevState) => ({
          ...prevState,
          isAutoClose: false,
          isStatus: "",
        }));
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [refreshAuto?.isAutoClose]);

  return (
    <AutoRefreshContext.Provider value={{ refreshAuto, setRefreshAuto }}>
      {children}
    </AutoRefreshContext.Provider>
  );
};

export const useRefreshState = () => {
  const context = useContext(AutoRefreshContext);
  if (!context) {
    throw new Error("useRefresh must be used within a RefreshProvider");
  }
  return context;
};
