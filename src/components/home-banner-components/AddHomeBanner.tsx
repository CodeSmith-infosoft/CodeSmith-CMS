import { toBase64 } from "@/utils/helper";
import { useState } from "react";
import {
  Modal,
} from "react-bootstrap";
import { Controller } from "react-hook-form";
import { Button } from "rsuite";
import Uploader from "rsuite/esm/Uploader";
import ErrorMessage from "../ErrorMessage";
import { bannerModalPropsType } from "@/types/homeBannerTypes";
import { toast } from "react-toastify";

const AddHomeBanner = ({
  handleToggle,
  openMarketModal,
  control,
  setError,
  handleSubmit,
  onSubmit,
  errors,
  item,
}: bannerModalPropsType) => {
  const [fileList, setFileList] = useState<any | null>(null);

  const handleUpload = async (newFileList: any, field: any) => {
    const data = newFileList[0];
    const file = data?.originFileObj || data?.blobFile || data;

    if (!(file instanceof Blob)) {
      return;
    }

    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    const dimensionsValid = await new Promise<boolean>((resolve) => {
      image.onload = () => {
        const isValid = image.width === 1440 && image.height === 400;
        URL.revokeObjectURL(objectUrl);
        resolve(isValid);
      };
      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        resolve(false);
      };
      image.src = objectUrl;
    });

    if (!dimensionsValid) {
      setFileList([]); // Reset preview
      field.onChange(""); // Clear form field value
      setError("image", {
        message: `Image must be exactly 1440x400 pixels.`,
      });
      toast.error("Only images with 1440x400 resolution are allowed.");
      return;
    }

    setError("image", { message: `` }); // clear error
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

        <p>Image</p>
        <div className="img-upload rsuite-image-upload-field">
          <Controller
            name="image"
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
          <ErrorMessage message={errors.image?.message} />
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

export default AddHomeBanner;
