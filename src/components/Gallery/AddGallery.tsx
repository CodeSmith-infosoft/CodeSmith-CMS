import { toBase64 } from "@/utils/helper";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Controller } from "react-hook-form";
import { Button } from "rsuite";
import Uploader from "rsuite/esm/Uploader";
import ErrorMessage from "../ErrorMessage";
import { galleryModalPropsType } from "@/types/galleryBannerTypes";
import { maxSizeInBytes } from "@/utils/constant";
import { toast } from "react-toastify";

const AddGallery = ({
  handleToggle,
  openMarketModal,
  control,
  handleSubmit,
  onSubmit,
  errors,
  item,
}: galleryModalPropsType) => {
  const [fileList, setFileList] = useState<any | null>(null);

  const handleFeildChange = async (newFileList: any[], field: any) => {
    const formValue: File[] = [];
    console.log(newFileList)

    let exceedLength = newFileList.filter(file => file.blobFile.size > maxSizeInBytes)

    if (exceedLength.length) {
      toast.error("All file size must be 1MB or less.");
      newFileList = newFileList.filter(file => file.blobFile.size <= maxSizeInBytes)
    }

    const updatedList = await Promise.all(
      newFileList.map(async (fileWrapper: any) => {
        if (!fileWrapper.url && fileWrapper.blobFile) {
          const base64 = await toBase64(fileWrapper.blobFile);
          formValue.push(fileWrapper.blobFile);
          return {
            ...fileWrapper,
            url: base64,
            name: fileWrapper.name,
          };
        }
        return fileWrapper;
      })
    );

    setFileList(updatedList);
    field.onChange(formValue);
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
                onChange={(fileList) => handleFeildChange(fileList, field)}
                listType="picture-text"
                multiple
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
