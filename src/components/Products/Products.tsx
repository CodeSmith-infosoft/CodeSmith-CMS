import { useEffect, useRef, useState } from "react";
import CommonTable from "../CommonComponents/CommonTable";
import { HiDotsVertical } from "react-icons/hi";
import {
  deleteProduct,
  getAllProductsList,
  toggleActiveStateById,
} from "@/service/asyncStore/action/product";
import { Overlay, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { ProductDataType, ProductVariantType } from "@/types/productDataTypes";
import ConfirmationModal from "../ConfirmationModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TfiInfoAlt } from "react-icons/tfi";

type ProductPropType = {
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
};

const Products = ({ setTotalCount }: ProductPropType) => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState<ProductDataType[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
    totalRecords: 0,
  });
  const refs = useRef<any>({});
  const [show, setShow] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] =
    useState<ProductDataType | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState("");

  useEffect(() => {
    getProductData();
  }, [pagination.page]);

  const columns = [
    {
      // title: <div className='d-flex align-items-center'><input className='input-box me-2' type="checkbox" />Products</div>,
      title: "Products",
      dataIndex: "title",
      key: "title",
      cellClass: "min-w-300 cursor-pointer",
      render: (value: string, data: ProductDataType) => (
        <>
          <div className="d-flex align-items-center" onClick={()=>handleEdit(data._id)}>
            {/* <input className='input-box me-2' type="checkbox" /> */}
            <div className="product">
              <img
                src={import.meta.env.VITE_IMAGE_DOMAIN + data?.image}
                alt="avatar"
              />
              <div className="product-title">
                <h5 className="two-line-clamp">{value}</h5>
                <p className="mb-0 product-list-fade-color">
                  {data.subCategoryName}
                </p>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      cellClass: "product-list-fade-color",
      render: (value: string) => <p className="two-line-clamp">{value}</p>,
    },
    {
      title: "Sale",
      dataIndex: "salesCount",
      key: "salesCount",
      cellClass: "product-list-fade-color",
    },
    {
      title: "Inventory",
      dataIndex: "quantity",
      key: "quantity",
      cellClass: "product-list-fade-color",
    },
    {
      title: "Price",
      dataIndex: `variants`,
      key: "variants",
      cellClass: "product-list-fade-color",
      render: (value: ProductVariantType[]) => (
        <OverlayTrigger
          placement={"auto"}
          overlay={
            <Tooltip id="button-tooltip">
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Weight</th>
                    <th>MRP</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {value?.map((variant, ind) => (
                    <tr key={ind}>
                      <td>{variant.weight}</td>
                      <td>{variant.mrp}</td>
                      <td>{variant.price}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tooltip>
          }
        >
          <span className="cursor-pointer d-flex gap-2 align-items-center">
            {value[0].price} <TfiInfoAlt />
          </span>
        </OverlayTrigger>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      cellClass: "product-list-fade-color product-status",
      render: (value: boolean, item: ProductDataType) => {
        return (
          <>
            {loading !== item._id ? (
              <label>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() =>
                    handleActiveToggle(item._id, !value, "isActive")
                  }
                />
                <div className="toggle-switch">
                  <div className={`toggle-knob ${value ? "active" : ""}`} />
                </div>
              </label>
            ) : (
              <span className="spinner" />
            )}
          </>
        );
      },
    },
    {
      title: "Popular",
      dataIndex: "isPopular",
      key: "isPopular",
      cellClass: "product-list-fade-color product-status",
      render: (value: boolean, item: ProductDataType) => {
        return (
          <>
            {loading !== item._id ? (
              <label>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() =>
                    handleActiveToggle(item._id, !value, "isPopular")
                  }
                />
                <div className="toggle-switch">
                  <div className={`toggle-knob ${value ? "active" : ""}`} />
                </div>
              </label>
            ) : (
              <span className="spinner" />
            )}
          </>
        );
      },
    },
    {
      title: "Action",
      key: "_id",
      dataIndex: "_id",
      render: (value: string, item: ProductDataType) => (
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

  const handleActiveToggle = (id: string, status: boolean, name: string) => {
    setLoading(id);
    toggleActiveStateById(id, status, name)
      .then((res) => {
        const toast2 = res.success ? toast.success : toast.error;
        toast2(res.message);
        if (res.success) {
          getProductData();
        }
      })
      .finally(() => setLoading(""));
  };

  const getProductData = () => {
    getAllProductsList({ page: pagination.page, limit: pagination.limit }).then(
      (res) => {
        setProductData(res.data.products);
        setPagination({
          page: res.data.page,
          limit: 10,
          totalPages: res.data.totalPages,
          totalRecords: res.data.totalRecords,
        });
        setTotalCount(res.data.totalRecords || 0)
      }
    );
  };

  const handleDelete = (product: ProductDataType) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
    setShow("");
  };

  const handleEdit = (id: string) => {
    navigate(`/update-product/${id}`);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);

    try {
      deleteProduct(productToDelete._id).then((res) => {
        const toast2 = res.success ? toast.success : toast.error;
        toast2(res.message);

        if (res.success) {
          setProductData((prev) =>
            prev.filter((p) => p._id !== productToDelete._id)
          );
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

export default Products;
