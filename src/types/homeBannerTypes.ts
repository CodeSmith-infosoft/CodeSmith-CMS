import { bannerFormSchemaType } from "@/service/form-schema/banner.schema";
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
    },
    any,
    {

      image: string | File;
    }
  >;
  register: UseFormRegister<{
    image: string | File;

  }>;
  handleSubmit: UseFormHandleSubmit<
    {

      image: string | File;
    },
    {

      image: string | File;
    }
  >;
  onSubmit: (
    data: bannerFormSchemaType,
    setFileList: React.Dispatch<any>
  ) => void;
  errors: FieldErrors<{

    image: string | File;
  }>;
  item?: bannerItemType | null;
  setValue: UseFormSetValue<{

    image: string | File;
  }>;
  setError: UseFormSetError<{
    image: string | File;

  }>;
};

export type bannerItemType = {
  _id: string;
  image: string;
}