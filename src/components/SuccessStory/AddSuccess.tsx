import { toBase64 } from "@/utils/helper";
import { useState } from "react";
import {
  Modal,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "react-bootstrap";
import { Controller } from "react-hook-form";
import { Button } from "rsuite";
import Uploader from "rsuite/esm/Uploader";
import ErrorMessage from "../ErrorMessage";
import { bannerModalPropsType } from "@/types/SuccessTypes";
import { toast } from "react-toastify";
import { FaAngleDown } from "react-icons/fa";
import { maxSizeInBytes } from "@/utils/constant";

const AddSuccess = ({
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

  // Type options for the dropdown
  const typeOptions = [
    { _id: "web", name: "Web" },
    { _id: "mobile", name: "Mobile" },
  ];

  const handleUpload = async (newFileList: any, field: any) => {
    const data = newFileList.at(-1);
    const file = data?.originFileObj || data?.blobFile || data;

    if (!(file instanceof Blob)) {
      return;
    }

    if (file.size > maxSizeInBytes) {
      toast.error("File size must be 1MB or less.");
      setFileList([]);
      return;
    }

    setError("image", { message: `` }); // clear error
    const base64 = await toBase64(file);
    field.onChange(file);
    setFileList([{ ...data, url: base64 }]);
  };

  // Create a wrapper function that handles the setFileList parameter
  const handleFormSubmit = (data: any) => {
    onSubmit(data, setFileList);
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
        <h2>{item?._id ? "Update" : "Add"} Success Story </h2>

        {/* Type Select Field */}
        <div className="form-group mb-3">
          <p>Type</p>
          <div className="img-upload rsuite-image-upload-field">
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Dropdown className="banner-dropdown">
                  <DropdownToggle className="banner-button">
                    {field.value || "Select Type"}
                    <FaAngleDown />
                  </DropdownToggle>
                  <DropdownMenu>
                    {typeOptions.length ? (
                      typeOptions.map((data) => (
                        <DropdownItem
                          key={data._id}
                          onClick={() => {
                            field.onChange(data._id);
                          }}
                        >
                          {data.name}
                        </DropdownItem>
                      ))
                    ) : (
                      <DropdownItem onClick={() => field.onChange("")}>
                        No Data
                      </DropdownItem>
                    )}
                  </DropdownMenu>
                </Dropdown>
              )}
            />
            <ErrorMessage message={errors.type?.message} />
          </div>
        </div>

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
                draggable
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
          {/* Fixed: Show image error message, not type error message */}
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
            onClick={handleSubmit(handleFormSubmit)}
          >
            {item?._id ? "Update" : "Add"} Success Story
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddSuccess;
