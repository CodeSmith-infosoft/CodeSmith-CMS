import React, { JSX } from "react";
import { Modal, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import {
  FiAlertTriangle,
  FiTrash2,
  FiInfo,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

interface ConfirmationModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  title?: string;
  message?: JSX.Element;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "primary" | "success" | "info";
  loading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  onHide,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to perform this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  loading = false,
}) => {
  const handleConfirm = () => {
    onConfirm();
  };

  // Get icon based on variant
  const getIcon = () => {
    switch (variant) {
      case "danger":
        return (
          <FiAlertTriangle className="confirmation-modal__icon confirmation-modal__icon--danger" />
        );
      case "warning":
        return (
          <FiAlertCircle className="confirmation-modal__icon confirmation-modal__icon--warning" />
        );
      case "info":
        return (
          <FiInfo className="confirmation-modal__icon confirmation-modal__icon--info" />
        );
      case "success":
        return (
          <FiCheckCircle className="confirmation-modal__icon confirmation-modal__icon--success" />
        );
      case "primary":
        return (
          <FiInfo className="confirmation-modal__icon confirmation-modal__icon--primary" />
        );
      default:
        return (
          <FiAlertTriangle className="confirmation-modal__icon confirmation-modal__icon--danger" />
        );
    }
  };

  // Get iconify icon for additional emphasis
  const getIconifyIcon = () => {
    switch (variant) {
      case "danger":
        return "material-symbols:warning-rounded";
      case "warning":
        return "material-symbols:error-rounded";
      case "info":
        return "material-symbols:info-rounded";
      case "success":
        return "material-symbols:check-circle-rounded";
      case "primary":
        return "material-symbols:help-rounded";
      default:
        return "material-symbols:warning-rounded";
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
      className="confirmation-modal"
    >
      <Modal.Header
        closeButton={!loading}
        className="confirmation-modal__header"
      >
        <Modal.Title className="confirmation-modal__title d-flex align-items-center">
          {getIcon()}
          <span className="ms-2">{title}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="confirmation-modal__body">
        <div className=" align-items-center">
          <div className="confirmation-modal__icon-container">
            <Icon
              icon={getIconifyIcon()}
              className="confirmation-modal__iconify-icon"
              width="48"
              height="48"
            />
          </div>
          <div className="justify-content-center d-flex mt-3">
            <p className="confirmation-modal__message mb-0">{message}</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="confirmation-modal__footer">
        <Button
          variant="outline-secondary"
          onClick={onHide}
          disabled={loading}
          className="confirmation-modal__cancel-btn"
        >
          <Icon icon="material-symbols:close-rounded" className="me-1" />
          {cancelText}
        </Button>
        <Button
          variant={variant}
          onClick={handleConfirm}
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
              {variant === "danger" && <FiTrash2 className="me-1" />}
              {variant === "warning" && <FiAlertTriangle className="me-1" />}
              {variant === "success" && <FiCheckCircle className="me-1" />}
              {variant === "info" && <FiInfo className="me-1" />}
              {variant === "primary" && <FiInfo className="me-1" />}
              {confirmText}
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
