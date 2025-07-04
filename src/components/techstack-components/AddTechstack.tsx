import {
  Modal,
} from "react-bootstrap";
import ErrorMessage from "../ErrorMessage";
import { techStackModalPropsType } from "@/types/blogTypes";
import { useEffect } from "react";

const AddTechstack = ({
  handleToggle,
  openMarketModal,
  handleSubmit,
  onSubmit,
  errors,
  item,
  register,
  setValue,
}: techStackModalPropsType) => {
  useEffect(() => {
    if (item?._id) {
      setValue("name", item.name);
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
