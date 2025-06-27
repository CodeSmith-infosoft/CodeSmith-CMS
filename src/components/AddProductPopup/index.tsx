import { uploadBulkProductsFile } from "@/service/asyncStore/action/hireDev";
import { useRef } from "react";
import { Modal } from "react-bootstrap";
import { FaFileCsv } from "react-icons/fa";
import { toast } from "react-toastify";

type AddProductPopupPropType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const AddProductPopup = ({ isOpen, setIsOpen }: AddProductPopupPropType) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      uploadBulkProductsFile(formData).then((res) => {
        const toast2 = res.success ? toast.success : toast.error;
        toast2(res.message);
        setIsOpen(false)
      });
    }
  };

  return (
    <Modal
      show={isOpen}
      onHide={() => setIsOpen(false)}
      centered
      backdrop="static"
      keyboard={false}
      className="confirmation-modal"
    >
      <Modal.Header
        className="confirmation-modal__header"
      >
        <Modal.Title className="confirmation-modal__title d-flex align-items-center">
          <span className="ms-2">{"Add Multiple Product"}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="confirmation-modal__body">
        <div className="d-flex align-items-center justify-content-center">
          <button className="upload-csv-btn" onClick={handleButtonClick}>
            Upload CSV <FaFileCsv size={30} />
          </button>
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddProductPopup;
