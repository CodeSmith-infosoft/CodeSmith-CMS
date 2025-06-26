import { socialMediaFormSchemaType } from "@/service/form-schema/socialMedia.schema";
import { Control, FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from "react-hook-form";

export type socialMediaItemType = {
  _id: string;
  image: string;
  url: string;
  isActive: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};

export type socialMediaModalPropsType = {
  openMarketModal: boolean;
  handleToggle: (isOpen: boolean, setFileList?: React.Dispatch<any>) => void;
  isLoading: boolean;
  control: Control<
    {
      url: string;
      image: string | File;
    },
    any,
    {
      url: string;
      image: string | File;
    }
  >;
  register: UseFormRegister<{
    image: string | File;
    url: string;
  }>;
  handleSubmit: UseFormHandleSubmit<
    {
      url: string;
      image: string | File;
    },
    {
      url: string;
      image: string | File;
    }
  >;
  onSubmit: (
    data: socialMediaFormSchemaType,
    setFileList: React.Dispatch<any>
  ) => void;
  errors: FieldErrors<{
    url: string;
    image: string | File;
  }>;
  item?: socialMediaItemType | null;
  setValue: UseFormSetValue<{
    url: string;
    image: string | File;
  }>;
};