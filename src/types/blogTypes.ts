import { techStackFormData } from "@/service/form-schema/techStack.schema";
import {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";
import { TechStackItemType } from "./techStackTypes";

export type getBlogPayloadType = {
  page?: number;
  limit?: number;
};

export type BlogDetail = {
  p: string;
  h: string;
};

export type BlogItemType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  details: BlogDetail[];
  isActive: boolean;
  createdAt: string; // or Date if you're parsing it
  updatedAt: string; // or Date if you're parsing it
  __v: number;
  techStackId: string;
  techStackName: string;
  bgColor: string;
  textColor: string;
};

export type techStackModalPropsType = {
  openMarketModal: boolean;
  handleToggle: (isOpen: boolean, setFileList?: React.Dispatch<any>) => void;
  isLoading: boolean;
  control: Control<
    {
      name: string;
      bgColor: string;
      textColor: string;
    },
    any,
    {
      name: string;
      bgColor: string;
      textColor: string;
    }
  >;
  register: UseFormRegister<{
    name: string;
    bgColor: string;
    textColor: string;
  }>;
  handleSubmit: UseFormHandleSubmit<
    {
      name: string;
      bgColor: string;
      textColor: string;
    },
    {
      name: string;
      bgColor: string;
      textColor: string;
    }
  >;
  onSubmit: (data: techStackFormData) => void;
  errors: FieldErrors<{
    name: string;
    bgColor: string;
    textColor: string;
  }>;
  item?: TechStackItemType | null;
  setValue: UseFormSetValue<{
    name: string;
    bgColor: string;
    textColor: string;
  }>;
  setError: UseFormSetError<{
    name: string;
    bgColor: string;
    textColor: string;
  }>;
};
