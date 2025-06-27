import { aboutFormSchemaType } from "@/service/form-schema/about.schema";
import {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

type ItemType = {
  mediaFile: string;
  _id: string;
};

export type aboutModalPropsType = {
  openMarketModal: boolean;
  handleToggle: (isOpen: boolean, setFileList?: React.Dispatch<any>) => void;
  isLoading: boolean;
  control: Control<
    {
      type: string;
      mediaFile: string | File;
    },
    any,
    {
      type: string;
      mediaFile: string | File;
    }
  >;
  register: UseFormRegister<{
    type: string;
    mediaFile: string | File;
  }>;
  handleSubmit: UseFormHandleSubmit<
    {
      type: string;
      mediaFile: string | File;
    },
    {
      type: string;
      mediaFile: string | File;
    }
  >;
  onSubmit: (
    data: aboutFormSchemaType,
    setFileList: React.Dispatch<any>
  ) => void;
  errors: FieldErrors<{
    type: string;
    mediaFile: string | File;
  }>;
  item?: ItemType | null;
  setValue: UseFormSetValue<{
    type: string;
    mediaFile: string | File;
  }>;
  setError: UseFormSetError<{
    type: string;
    mediaFile: string | File;
  }>;
  watch: UseFormWatch<{
    type: string;
    mediaFile: string | File;
  }>;
};
