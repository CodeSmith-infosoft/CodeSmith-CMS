import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
} from "react-bootstrap";
import { Controller } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { techStackModalPropsType } from "@/types/blogTypes";
import { FaAngleDown } from "react-icons/fa";
import { useEffect } from "react";

const AddTechstack = ({
  handleToggle,
  openMarketModal,
  control,
  handleSubmit,
  onSubmit,
  errors,
  item,
  register,
  setValue,
}: techStackModalPropsType) => {
  useEffect(() => {
    if (item?._id) {
      setValue("bgColor", item.bgColor);
      setValue("name", item.name);
      setValue("textColor", item.textColor);
    }
  }, [item, openMarketModal]);

  return (
    <Modal
      show={openMarketModal}
      onHide={() => handleToggle(false)}
      size="lg"
      className="custom-modal-dialog"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h2>{item?._id ? "Update" : "Add"} Tech Stack</h2>

        <p>Tech Name</p>
        <input
          type="text"
          placeholder="Market Place Link..."
          {...register("name")}
        />
        <ErrorMessage message={errors.name?.message} />

        <p>Bg Color</p>
        <div className="img-upload rsuite-image-upload-field">
          <Controller
            name="bgColor"
            control={control}
            render={({ field }) => (
              <Dropdown className="banner-dropdown">
                <DropdownToggle className="banner-button">
                  {field.value || "Select Bg Color"}
                  <FaAngleDown />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => {
                      field.onChange("#E7F4FB");
                      setValue("textColor", "#3098D4");
                    }}
                    className="d-flex gap-2 align-items-center"
                  >
                    <div
                      style={{ backgroundColor: "#E7F4FB" }}
                      className="color-preview"
                    />{" "}
                    {"#E7F4FB"} -
                    <div
                      style={{ backgroundColor: "#3098D4" }}
                      className="color-preview"
                    />{" "}
                    {"#3098D4"}
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      field.onChange("#F2F4FE");
                      setValue("textColor", "#273974");
                    }}
                    className="d-flex gap-2 align-items-center"
                  >
                    <div
                      style={{ backgroundColor: "#F2F4FE" }}
                      className="color-preview"
                    />{" "}
                    {"#F2F4FE"} -
                    <div
                      style={{ backgroundColor: "#273974" }}
                      className="color-preview"
                    />{" "}
                    {"#273974"}
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      field.onChange("#E7F4ED");
                      setValue("textColor", "#119448");
                    }}
                    className="d-flex gap-2 align-items-center"
                  >
                    <div
                      style={{ backgroundColor: "#E7F4ED" }}
                      className="color-preview"
                    />{" "}
                    {"#E7F4ED"} -
                    <div
                      style={{ backgroundColor: "#119448" }}
                      className="color-preview"
                    />{" "}
                    {"#119448"}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          />
          <ErrorMessage message={errors.bgColor?.message} />
        </div>
        <div className="btn-common">
          <button className="btn-cencal" onClick={() => handleToggle(false)}>
            Cancel
          </button>
          <button
            className="me-0 btn-add"
            onClick={handleSubmit((data) => onSubmit(data))}
          >
            {item?._id ? "Update" : "Add"} Tech Stack
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddTechstack;
