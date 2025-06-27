import { hireDevFormSchemaType } from "@/service/form-schema/hiredev.schema";
import {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";

export type getAllHireOurDevelopersType = {
  page?: number | boolean;
  limit?: number;
};

export type HireDevItemType = {
  logo: string;
  title: string;
  url: string;
  _id: string;
};

export type hireDevModalPropsType = {
  openMarketModal: boolean;
  handleToggle: (isOpen: boolean, setFileList?: React.Dispatch<any>) => void;
  isLoading: boolean;
  control: Control<
    {
      title: string;
      url: string;
      logo: string | File;
    },
    any,
    {
      title: string;
      url: string;
      logo: string | File;
    }
  >;
  register: UseFormRegister<{
    title: string;
    url: string;
    logo: string | File;
  }>;
  handleSubmit: UseFormHandleSubmit<
    {
      title: string;
      url: string;
      logo: string | File;
    },
    {
      title: string;
      url: string;
      logo: string | File;
    }
  >;
  onSubmit: (
    data: hireDevFormSchemaType,
    setFileList: React.Dispatch<any>
  ) => void;
  errors: FieldErrors<{
    title: string;
    url: string;
    logo: string | File;
  }>;
  item?: HireDevItemType | null;
  setValue: UseFormSetValue<{
    title: string;
    url: string;
    logo: string | File;
  }>;
  setError: UseFormSetError<{
    title: string;
    url: string;
    logo: string | File;
  }>;
};
