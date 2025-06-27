import { bannerFormSchemaType } from "@/service/form-schema/gallery.schema";
import {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";

export type galleryModalPropsType = {
  openMarketModal: boolean;
  handleToggle: (isOpen: boolean, setFileList?: React.Dispatch<any>) => void;
  isLoading: boolean;
  control: Control<
    {

      images: string | File;
    },
    any,
    {

      images: string | File;
    }
  >;
  register: UseFormRegister<{
    images: string | File;

  }>;
  handleSubmit: UseFormHandleSubmit<
    {

      images: string | File;
    },
    {

      images: string | File;
    }
  >;
  onSubmit: (
    data: bannerFormSchemaType,
    setFileList: React.Dispatch<any>
  ) => void;
  errors: FieldErrors<{

    images: string | File;
  }>;
  item?: bannerItemType | null;
  setValue: UseFormSetValue<{

    images: string | File;
  }>;
  setError: UseFormSetError<{
    images: string | File;

  }>;
};

export type bannerItemType = {
  _id: string;
  images: string;
}