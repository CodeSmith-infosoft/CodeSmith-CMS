import { useEffect, useRef, useState } from "react";
import CommonTable from "../CommonComponents/CommonTable";
import { HiDotsVertical } from "react-icons/hi";
import { Overlay, Tooltip } from "react-bootstrap";
import ConfirmationModal from "../ConfirmationModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { deleteBlog, getAllBlog } from "@/service/asyncStore/action/blog";
import { BlogItemType } from "@/types/blogTypes";

type ProductPropType = {
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
};

const Blog = ({ setTotalCount }: ProductPropType) => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState<BlogItemType[]>([]);
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
    getBlogData();
  }, [pagination.page]);

  const columns = [
    {
      // title: <div className='d-flex align-items-center'><input className='input-box me-2' type="checkbox" />Products</div>,
      title: "Image",
      dataIndex: "image",
      key: "image",
      cellClass: "cursor-pointer",
      render: (value: string, data: BlogItemType) => (
        <>
          <div
            className="d-flex align-items-center"
            onClick={() => handleEdit(data._id)}
          >
            <div className="product">
              <img src={value} alt="avatar" />
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (value: string) => <p className="two-line-clamp">{value}</p>,
    },
    {
      title: "Tech Stack Name",
      dataIndex: "techStackName",
      key: "techStackName",
      cellClass: "min-w-176",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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

  const getBlogData = () => {
    getAllBlog({ page: pagination.page, limit: pagination.limit }).then(
      (res) => {
        setProductData(res.data.records);
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
    navigate(`/update-blog/${id}`);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);

    try {
      deleteBlog(productToDelete._id).then((res) => {
        const toast2 = res.success ? toast.success : toast.error;
        toast2(res.message);

        if (res.success) {
          getBlogData();
        }
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
          data={productData}
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

export default Blog;
