import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaFileCsv } from "react-icons/fa";
import { DatePicker } from "rsuite";

type ExportDatePopupPropType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleExport: (startDate: Date | null, endDate: Date | null) => void;
  loading: boolean;
};

const ExportDatePopup = ({
  isOpen,
  loading,
  setIsOpen,
  handleExport,
}: ExportDatePopupPropType) => {
  const [filter, setFilter] = useState<{
    startDate: null | Date;
    endDate: null | Date;
  }>({
    startDate: null,
    endDate: null,
  });

  const handleCancel = () => {
    setFilter({
      startDate: null,
      endDate: null,
    });
    setIsOpen(false);
  };

  const handleSave = () => {
    handleExport(filter.startDate, filter.endDate);
    setFilter({
      startDate: null,
      endDate: null,
    });
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
      <Modal.Header className="confirmation-modal__header">
        <Modal.Title className="confirmation-modal__title d-flex align-items-center">
          <span className="ms-2">{"Export CSV"}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="confirmation-modal__body">
        <div className="d-flex align-items-center justify-content-center">
          <div className="date-section">
            <label className="section-label">From : </label>
            <DatePicker
              format="yyyy-MM-dd"
              placeholder="Select Start Date"
              placement="bottomStart"
              value={filter.startDate}
              onChange={(value) =>
                setFilter((prev) => ({ ...prev, startDate: value }))
              }
              disabledDate={(date?: Date) => {
                if (!date) return false;
                return filter.endDate ? date > new Date(filter.endDate) : false;
              }}
            />
          </div>
          <div className="date-section">
            <label className="section-label">To : </label>
            <DatePicker
              format="yyyy-MM-dd"
              placeholder="Select Start Date"
              placement="bottomStart"
              value={filter.endDate}
              onChange={(value) =>
                setFilter((prev) => ({ ...prev, endDate: value }))
              }
              disabledDate={(date?: Date) => {
                if (!date) return false;
                return filter.startDate
                  ? date < new Date(filter.startDate)
                  : false;
              }}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="confirmation-modal__footer">
        <Button
          variant="outline-secondary"
          onClick={handleCancel}
          className="confirmation-modal__cancel-btn"
        >
          <Icon icon="material-symbols:close-rounded" className="me-1" />
          {"Cancel"}
        </Button>
        <Button
          variant={"danger"}
          onClick={handleSave}
          disabled={loading}
          className="confirmation-modal__confirm-btn"
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Processing...
            </>
          ) : (
            <>
              <FaFileCsv className="me-1" />
              {"Export"}
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExportDatePopup;
