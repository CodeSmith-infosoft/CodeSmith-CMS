import { useEffect, useRef, useState } from "react";
import CommonTable from "../CommonComponents/CommonTable";
import { HiDotsVertical } from "react-icons/hi";
import { Overlay, Tooltip } from "react-bootstrap";
import ConfirmationModal from "../ConfirmationModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BlogItemType } from "@/types/blogTypes";
import { CaseStudyItemType } from "@/types/caseStudyTypes";
import { getAllCareer, deleteCareer } from "@/service/asyncStore/action/career";

type ProductPropType = {
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
};

const CareerComponent = ({ setTotalCount }: ProductPropType) => {
  const navigate = useNavigate();
  const [caseStudyData, setCaseStudyData] = useState<CaseStudyItemType[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
    totalRecords: 0,
  });
  const refs = useRef<any>({});
  const [show, setShow] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<BlogItemType | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getCaseStudyData();
  }, [pagination.page]);

  const columns = [
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
      cellClass: "min-w-176",
    },
    {
      title: "Tech Stack Name",
      dataIndex: "techStackName",
      key: "techStackName",
      cellClass: "min-w-176",
    },
    {
      title: "Qualification",
      dataIndex: "qualification",
      key: "qualification",
      // cellClass: "min-w-176",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      cellClass: "min-w-176",
    },
    {
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
      // cellClass: "min-w-176",
    },
    {
      title: "Vacancy",
      dataIndex: "vacancy",
      key: "vacancy",
    },
    {
      title: "Office Time",
      dataIndex: "ofcTime",
      key: "ofcTime",
      render: (value: string) => <p className="two-line-clamp">{value}</p>,
    },
    {
      title: "Action",
      key: "_id",
      dataIndex: "_id",
      render: (value: string, item: BlogItemType) => (
        <>
          <span
            className="cursor-pointer position-relative"
            ref={(el) => {
              refs.current[value] = el;
            }}
            onClick={() => setShow((prev) => (prev === value ? "" : value))}
          >
            <HiDotsVertical />
          </span>
          <Overlay
            placement={"left"}
            target={refs.current[value]}
            show={show === value}
            onHide={() => setShow("")}
            rootClose
          >
            <Tooltip id="button-tooltip">
              <div className="tooltip-action-button">
                <button
                  className="button-primary"
                  onClick={() => handleEdit(value)}
                >
                  Update
                </button>
                <button
                  className="button-danger"
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </button>
              </div>
            </Tooltip>
          </Overlay>
        </>
      ),
    },
  ];

  const getCaseStudyData = () => {
    getAllCareer({ page: pagination.page, limit: pagination.limit }).then(
      (res) => {
        setCaseStudyData(res.data.records);
        setPagination({
          page: res.data.page,
          limit: 10,
          totalPages: res.data.totalPages,
          totalRecords: res.data.totalRecords,
        });
        setTotalCount(res.data.totalRecords || 0);
      }
    );
  };

  const handleDelete = (product: BlogItemType) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
    setShow("");
  };

  const handleEdit = (id: string) => {
    navigate(`/update-career/${id}`);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);

    try {
      deleteCareer(productToDelete._id).then((res) => {
        const toast2 = res.success ? toast.success : toast.error;
        toast2(res.message);
        getCaseStudyData();
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    if (!isDeleting) {
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  return (
    <>
      <section>
        <CommonTable
          header={columns}
          data={caseStudyData}
          isPagination
          limit={pagination.limit}
          page={pagination.page}
          totalPages={pagination.totalPages}
          totalRecords={pagination.totalRecords}
          onPageChange={setPagination}
        />
      </section>
      <ConfirmationModal
        show={showDeleteModal}
        onHide={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        message={
          <>
            Are you sure you want to delete <b>{productToDelete?.title}</b>?
            This action cannot be undone.
          </>
        }
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        loading={isDeleting}
      />
    </>
  );
};

export default CareerComponent;
