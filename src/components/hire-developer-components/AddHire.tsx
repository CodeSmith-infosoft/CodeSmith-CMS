import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
} from "react-bootstrap";
import { Button } from "rsuite";
import { Controller } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { FaAngleDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import { hireDevModalPropsType } from "@/types/hireDevTypes";
import { Uploader } from "rsuite";
import { toast } from "react-toastify";
import { toBase64 } from "@/utils/helper";

const AddHire = ({
  handleToggle,
  openMarketModal,
  control,
  handleSubmit,
  onSubmit,
  errors,
  item,
  register,
  setValue,
  setError,
}: hireDevModalPropsType) => {
  const [fileList, setFileList] = useState<any | null>(null);

  useEffect(() => {
    if (item?._id) {
      setValue("logo", import.meta.env.VITE_IMAGE_DOMAIN + item.logo);
      setValue("title", item.title);
      setValue("url", item.url);
      setFileList([
        {
          url: import.meta.env.VITE_IMAGE_DOMAIN + item.logo,
          name: item.logo.split("/").at(-1),
        },
      ]);
    }

    if (!openMarketModal) {
      setValue("logo", "");
      setValue("title", "");
      setValue("url", "");
    }
  }, [item, openMarketModal]);

  const handleUpload = async (newFileList: any, field: any) => {
    const data = newFileList.at(-1);
    const file = data?.originFileObj || data?.blobFile || data;

    if (!(file instanceof Blob)) {
      return;
    }

    setError("logo", { message: `` }); // clear error
    const base64 = await toBase64(file);
    field.onChange(file);
    setFileList([{ ...data, url: base64 }]);
  };

  console.log(fileList);

  return (
    <Modal
      show={openMarketModal}
      onHide={() => handleToggle(false, setFileList)}
      size="lg"
      className="custom-modal-dialog"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h2>{item?._id ? "Update" : "Add"} Hire Dev</h2>

        <p>Logo</p>
        <div className="img-upload rsuite-image-upload-field">
          <Controller
            name="logo"
            control={control}
            render={({ field }) => (
              <Uploader
                onChange={(fileList) => handleUpload(fileList, field)}
                listType="picture-text"
                multiple={true}
                action=""
                accept="image/*"
                fileList={fileList}
              >
                <div className="upload-trigger">
                  <Button
                    appearance="ghost"
                    color="red"
                    className="add-file-btn"
                  >
                    Add File
                  </Button>
                  <div className="drag-text">Or drag and drop files</div>
                </div>
              </Uploader>
            )}
          />
          <ErrorMessage message={errors.logo?.message} />
        </div>

        <p>Title</p>
        <input
          type="text"
          placeholder="Hire Developer Title..."
          {...register("title")}
        />
        <ErrorMessage message={errors.title?.message} />

        <p>URL</p>
        <input
          type="text"
          placeholder="Hire Developer Link..."
          {...register("url")}
        />
        <ErrorMessage message={errors.url?.message} />

        <div className="btn-common">
          <button
            className="btn-cencal"
            onClick={() => handleToggle(false, setFileList)}
          >
            Cancel
          </button>
          <button
            className="me-0 btn-add"
            onClick={handleSubmit((data) => onSubmit(data, setFileList))}
          >
            {item?._id ? "Update" : "Add"} Hire Dev
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddHire;
