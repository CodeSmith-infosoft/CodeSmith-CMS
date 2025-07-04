import { FaCaretRight, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "../ConfirmationModal";
import { useState } from "react";

type PageTitleType = {
  title: string;
  subTitle?: string;
  cancelBtn?: boolean;
  openCategories?: (isOpen: boolean) => void;
  button?: string;
  path?: string;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  handleProductPopup?: React.Dispatch<React.SetStateAction<boolean>>;
  totalCount?: number;
  subRedirect?: string;
  cancelPath?: string;
  isCancelConfirm?: boolean;
};

const PageTitle = ({
  path,
  title,
  subTitle,
  cancelBtn,
  cancelPath,
  button,
  openCategories,
  onSubmit,
  onCancel,
  totalCount,
  subRedirect,
  isCancelConfirm,
}: PageTitleType) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDeleteConfirm = async () => {
    setShowDeleteModal(false);
    navigate(cancelPath || "");
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleCancel = () => {
    if (isCancelConfirm) {
      setShowDeleteModal(true);
    } else {
      navigate(cancelPath || "");
    }
  };
  return (
    <>
      <section className="page-title">
        <div className="title">
          <h2>
            {title} {totalCount ? `(${totalCount})` : ""}
          </h2>
          <div className="sub-title">
            <Link to="/dashboard">
              {" "}
              <span className="sub-title-1">Dashboard</span>
            </Link>
            {subTitle && (
              <>
                <FaCaretRight />
                <span
                  className="sub-title-1 cursor-pointer"
                  onClick={() =>
                    navigate(
                      subRedirect ? subRedirect : `/${subTitle.toLowerCase()}`
                    )
                  }
                >
                  {subTitle}
                </span>
              </>
            )}
            <FaCaretRight />
            <span>{title}</span>
          </div>
        </div>
        <div className="title-btn">
          {cancelBtn ? (
            <>
              <a onClick={handleCancel}>
                {" "}
                <button className="btn-1-cancel">Cancel</button>
              </a>
              <button className="btn-1-save" onClick={onSubmit}>
                Save
              </button>
            </>
          ) : button === "subCategories" ? (
            <>
              <button className="btn-1-cancel" onClick={onCancel}>
                Cancel{" "}
              </button>
              <button className="btn-1-save" onClick={onSubmit}>
                Save{" "}
              </button>
            </>
          ) : (
            <>
              {path ? (
                <Link rel="stylesheet" to={path}>
                  {" "}
                  <button>
                    <FaPlus /> Add {button}{" "}
                  </button>{" "}
                </Link>
              ) : button ? (
                <button onClick={() => openCategories && openCategories(true)}>
                  <FaPlus /> Add {button}{" "}
                </button>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      </section>
      <ConfirmationModal
        show={showDeleteModal}
        onHide={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Home Banner"
        message={
          <>
            Are you sure you want to cancel this form? This action cannot be
            undone.
          </>
        }
        confirmText="Back"
        cancelText="Cancel"
        variant="danger"
      />
    </>
  );
};

export default PageTitle;
