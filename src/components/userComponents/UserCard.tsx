import { UserDataType } from "@/types/userTypes";
import { useRef, useState } from "react";
import { Overlay, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../ConfirmationModal";
import { inActiveUserById } from "@/service/asyncStore/action/user";
import { toast } from "react-toastify";

type UserCardPropType = {
  user: UserDataType;
};

const UserCard = ({ user }: UserCardPropType) => {
  const ref = useRef<any>(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeRef, setActiveRef] = useState(user.isActive);

  const handleShow = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setShow((prev) => !prev);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);

    try {
      inActiveUserById(user._id, !user.isActive).then((res) => {
        const toast2 = res.success ? toast.success : toast.error;
        toast2(res.message);

        if (res.success) {
          setActiveRef(!activeRef);
        }
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleDeleteCancel = () => {
    if (!isDeleting) {
      setShowDeleteModal(false);
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
    setShow(false);
  };

  return (
    <>
      <div
        className={`user-card`}
        onClick={() => navigate(`/user/${user._id}`)}
      >
        <div className="card-header">
          <div className="checkbox-container"></div>
          <>
            <div className="menu-dots" ref={ref} onClick={handleShow}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <Overlay
              placement={"left"}
              target={ref.current}
              show={show}
              onHide={() => setShow(false)}
              rootClose
            >
              <Tooltip id="button-tooltip">
                <div className="tooltip-action-button">
                  <button
                    className="button-primary"
                    onClick={() => navigate(`/user/${user._id}`)}
                  >
                    View
                  </button>
                  <button className="button-danger" onClick={handleDelete}>
                    {activeRef ? "Block" : "Unblock"} User
                  </button>
                </div>
              </Tooltip>
            </Overlay>
          </>
        </div>

        <div className="card-body">
          <div className="avatar">
            <div className="avatar-placeholder">
              <img
                src={import.meta.env.VITE_IMAGE_DOMAIN + user.profilePhoto}
              />
            </div>
          </div>

          <h3 className="user-name">{user.fname}</h3>
          <h3 className="user-name">{user.lname}</h3>

          <span
            className={`status-badge ${activeRef.toString().toLowerCase()}`}
          >
            {activeRef ? "Active" : "Blocked"}
          </span>

          <div className="stats">
            <div className="stat-item">
              <span className="stat-label">Orders</span>
              <span className="stat-value">{user.orderCount}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">State</span>
              <span className="stat-value one-line-clamp">{user.state}</span>
            </div>
          </div>
        </div>
      </div>
      <ConfirmationModal
        show={showDeleteModal}
        onHide={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title={`${activeRef ? "Block" : "Unblock"} User`}
        message={
          <>
            Are you sure you want to {activeRef ? "Block" : "Unblock"}{" "}
            <b>
              {user.fname} {user.lname}
            </b>
            ? This action cannot be undone.
          </>
        }
        confirmText={activeRef ? "Block" : "Unblock"}
        cancelText="Cancel"
        variant="danger"
        loading={isDeleting}
      />
    </>
  );
};

export default UserCard;
