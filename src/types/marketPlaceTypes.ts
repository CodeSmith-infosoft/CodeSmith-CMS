import { marketPlaceFormSchemaType } from "@/service/form-schema/marketPlace.schema";
import { Control, FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from "react-hook-form";

export type MarketplaceItemType = {
  _id: string;
  image: string;
  link: string;
  isDelete: boolean;
  isActive: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};

export type MarketPlaceModalPropsType = {
  openMarketModal: boolean;
  handleToggle: (isOpen: boolean, setFileList?: React.Dispatch<any>) => void;
  control: Control<
    {
      link: string;
      image: string | File;
    },
    any,
    {
      link: string;
      image: string | File;
    }
  >;
  register: UseFormRegister<{
    image: string | File;
    link: string;
  }>;
  handleSubmit: UseFormHandleSubmit<
    {
      link: string;
      image: string | File;
    },
    {
      link: string;
      image: string | File;
    }
  >;
  onSubmit: (
    data: marketPlaceFormSchemaType,
    setFileList: React.Dispatch<any>
  ) => void;
  errors: FieldErrors<{
    link: string;
    image: string | File;
  }>;
  item?: MarketplaceItemType | null;
  setValue: UseFormSetValue<{
    link: string;
    image: string | File;
  }>;
};