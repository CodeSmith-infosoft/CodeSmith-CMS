import { MainContextType, MainProviderProps } from "@/types/contextTypes";
import { createContext, useState } from "react";

export const MainContext = createContext<MainContextType | null>(null);

export const MainProvider = ({ children }: MainProviderProps) => {
  const [categoryChange, setCategoryChange] = useState(true);
  const [notification, setNotification] = useState(0)

  return (
    <MainContext.Provider value={{ categoryChange, setCategoryChange, notification, setNotification }}>
      {children}
    </MainContext.Provider>
  );
};
