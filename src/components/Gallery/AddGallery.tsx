import { toBase64 } from "@/utils/helper";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Controller } from "react-hook-form";
import { Button } from "rsuite";
import Uploader from "rsuite/esm/Uploader";
import ErrorMessage from "../ErrorMessage";
import { galleryModalPropsType } from "@/types/galleryBannerTypes";

const AddGallery = ({
  handleToggle,
  openMarketModal,
  control,
  setError,
  handleSubmit,
  onSubmit,
  errors,
  item,
}: galleryModalPropsType) => {
  const [fileList, setFileList] = useState<any | null>(null);

  const handleUpload = async (newFileList: any, field: any) => {
    const data = newFileList.at(-1);
    const file = data?.originFileObj || data?.blobFile || data;

    if (!(file instanceof Blob)) {
      return;
    }

    setError("images", { message: `` });
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
        <h2>{item?._id ? "Update" : "Add"} Banner</h2>

        <p>Image</p>
        <div className="img-upload rsuite-image-upload-field">
          <Controller
            name="images"
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
          <ErrorMessage message={errors.images?.message} />
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
            {item?._id ? "Update" : "Add"} Banner
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddGallery;
