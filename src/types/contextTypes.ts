import { ReactNode } from "react";

export type MainContextType = {
  categoryChange: boolean;
  setCategoryChange: React.Dispatch<React.SetStateAction<boolean>>;
  notification: number;
  setNotification: React.Dispatch<React.SetStateAction<number>>;
};

export type MainProviderProps = {
  children: ReactNode;
};