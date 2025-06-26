import { toBase64 } from "@/utils/helper";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Controller } from "react-hook-form";
import { Button } from "rsuite";
import Uploader from "rsuite/esm/Uploader";
import ErrorMessage from "../ErrorMessage";
import { socialMediaModalPropsType } from "@/types/socialMediaDataTypes";

const AddSocialMedia = ({
  handleToggle,
  openMarketModal,
  isLoading,
  control,
  register,
  handleSubmit,
  onSubmit,
  errors,
  item,
  setValue,
}: socialMediaModalPropsType) => {
  const [fileList, setFileList] = useState<any | null>(null);
  const handleUpload = async (newFileList: any, field: any) => {
    const data = newFileList[0];
    field.onChange(data.blobFile);
    setFileList([{ ...data, url: toBase64(newFileList[0].blobFile) }]);
  };

  useEffect(() => {
    if (item?._id) {
      setValue("url", item.url);
      setValue("image", import.meta.env.VITE_IMAGE_DOMAIN + item.image);
      setFileList([
        {
          url: import.meta.env.VITE_IMAGE_DOMAIN + item.image,
          name: item.image.split("/").at(-1),
        },
      ]);
    } else {
      setValue("url", "");
      setValue("image", "");
    }
  }, [item]);

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
        <h2>{item?._id ? "Update" : "Add"} Instagram Feed</h2>
        <p>Instagram Feed</p>
        <input
          type="text"
          placeholder="Instagram Feed Link..."
          {...register("url")}
        />
        <ErrorMessage message={errors.url?.message} />
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
            disabled={isLoading}
          >
            {item?._id ? "Update" : "Add"} Insta Feed
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddSocialMedia;
