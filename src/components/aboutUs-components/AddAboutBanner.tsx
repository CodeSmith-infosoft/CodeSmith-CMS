import { toBase64 } from "@/utils/helper";
import { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
} from "react-bootstrap";
import { Controller } from "react-hook-form";
import { Button } from "rsuite";
import Uploader from "rsuite/esm/Uploader";
import ErrorMessage from "../ErrorMessage";
import { toast } from "react-toastify";
import { aboutModalPropsType } from "@/types/aboutUsTypes";
import { FaAngleDown } from "react-icons/fa";
import { maxSizeInBytes } from "@/utils/constant";

const AddAboutBanner = ({
  handleToggle,
  openMarketModal,
  control,
  setError,
  handleSubmit,
  onSubmit,
  errors,
  item,
  watch,
}: aboutModalPropsType) => {
  const [fileList, setFileList] = useState<any | null>(null);

  useEffect(() => {
    setFileList(null);
  }, [watch("type")]);

  const handleUpload = async (newFileList: any, field: any) => {
    const data = newFileList[0];
    const file = data?.originFileObj || data?.blobFile || data;

    if (!(file instanceof Blob)) {
      return;
    }

    if (file.size > maxSizeInBytes && watch("type") === "image") {
      toast.error("File size must be 1MB or less.");
      setFileList([]);
      return;
    }

    setError("mediaFile", { message: `` }); // clear error
    const base64 = await toBase64(file);
    field.onChange(file);
    setFileList([{ ...data, url: base64 }]);
  };

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
        <h2>{item?._id ? "Update" : "Add"} Home Banner</h2>

        <p>Upload Type</p>
        <div className="img-upload rsuite-image-upload-field">
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Dropdown className="banner-dropdown">
                <DropdownToggle className="banner-button">
                  {field.value || "Select upload type"}
                  <FaAngleDown />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => {
                      field.onChange("video");
                    }}
                    className="d-flex gap-2 align-items-center"
                  >
                    Video
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      field.onChange("image");
                    }}
                    className="d-flex gap-2 align-items-center"
                  >
                    Image
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          />
          <ErrorMessage message={errors.type?.message} />
        </div>

        <p>{watch("type") === "video" ? "Video" : "Image"}</p>
        <div className="img-upload rsuite-image-upload-field">
          <Controller
            name="mediaFile"
            control={control}
            render={({ field }) => (
              <Uploader
                onChange={(fileList) => handleUpload(fileList, field)}
                listType="picture-text"
                multiple={true}
                action=""
                accept={watch("type") === "video" ? "video/*" : "image/*"}
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
          <ErrorMessage message={errors.mediaFile?.message} />
        </div>

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
            {item?._id ? "Update" : "Add"} Home Banner
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddAboutBanner;
