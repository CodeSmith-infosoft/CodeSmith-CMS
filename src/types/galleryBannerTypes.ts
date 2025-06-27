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
  control: Control<{
    images: File[];
  }>;
  register: UseFormRegister<{
    images: File[];
  }>;
  handleSubmit: UseFormHandleSubmit<{
    images: File[];
  }>;
  onSubmit: (
    data: bannerFormSchemaType,
    setFileList: React.Dispatch<any>
  ) => void;
  errors: FieldErrors<{
    images: File[];
  }>;
  item?: bannerItemType | null;
  setValue: UseFormSetValue<{
    images: File[];
  }>;
  setError: UseFormSetError<{
    images: File[];
  }>;
};

export type bannerItemType = {
  _id: string;
  image: string;
};
