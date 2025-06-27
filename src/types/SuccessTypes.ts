import { successFormSchemaType } from "@/service/form-schema/success.schema";
import {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";

export type bannerModalPropsType = {
  openMarketModal: boolean;
  handleToggle: (isOpen: boolean, setFileList?: React.Dispatch<any>) => void;
  isLoading: boolean;
  control: Control<
    {

      image: string | File;
      type: string
    },
    any,
    {

      image: string | File;
      type: string
    }
  >;
  register: UseFormRegister<{
    image: string | File;
    type: string

  }>;
  handleSubmit: UseFormHandleSubmit<
    {

      image: string | File;
      type: string
    },
    {

      image: string | File;
      type: string
    }
  >;
  onSubmit: (
    data: successFormSchemaType,
    setFileList: React.Dispatch<any>
  ) => void;
  errors: FieldErrors<{

    image: string | File;
    type: string
  }>;
  item?: bannerItemType | null;
  setValue: UseFormSetValue<{

    image: string | File;
    type: string
  }>;
  setError: UseFormSetError<{
    image: string | File;
    type: string

  }>;
};

export type bannerItemType = {
  _id: string;
  image: string;
  type: string;
}