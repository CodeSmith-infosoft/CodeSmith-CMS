import { Nav, NavItem, NavLink, Overlay, Tooltip } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import CommonTable from "../CommonComponents/CommonTable";
import { useCallback, useEffect, useRef, useState } from "react";
import { debounce, formatted } from "@/utils/helper";
import { useNavigate } from "react-router-dom";
import {
  deleteCouponById,
  getAllCouponList,
} from "@/service/asyncStore/action/coupon";
import { CouponDocumentType, getCouponPayloadType } from "@/types/couponTypes";
import { MdOutlineSell } from "react-icons/md";
import { toast } from "react-toastify";
import ConfirmationModal from "../ConfirmationModal";
import { HiDotsVertical } from "react-icons/hi";

type CouponPropType = {
  setTotalCount: React.Dispatch<React.SetStateAction<number>>
}

const Coupon = ({setTotalCount}: CouponPropType) => {
  const navigate = useNavigate();
  const [couponData, setCouponData] = useState<CouponDocumentType[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
    totalRecords: 0,
  });
  const [filter, setFilter] = useState<{
    search: string;
    state: "" | "isActive" | "isExpire";
  }>({
    search: "",
    state: "",
  });
  const refs = useRef<any>({});
  const [show, setShow] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [couponToDelete, setCouponToDelete] =
    useState<CouponDocumentType | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getCouponData();
  }, [pagination.page, filter]);

  const columns = [
    {
      title: "Coupons",
      dataIndex: "code",
      key: "code",
      render: (value: string, main: CouponDocumentType) => (
        <>
          <div className="product">
            <div className="coupon-icon">
              <MdOutlineSell size={22} />
            </div>
            <div className="product-title">
              <h5 className="two-line-clamp">{value}</h5>
              <p className="mb-0 fade-data">{main.description}</p>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Use",
      dataIndex: "usedCount",
      key: "usedCount",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      cellClass: "order-status-button",
      render: (value: boolean) => (
        <button className={value ? "Active" : "Expired"}>
          {value ? "Active" : "Expired"}
        </button>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      cellClass: "fade-data",
      render: (_: string, item: CouponDocumentType) => (
        <span>
          {`${formatted(item.validFrom)} - ${formatted(item.validTo)}`}
        </span>
      ),
    },
    {
      title: "Action",
      key: "_id",
      dataIndex: "_id",
      render: (value: string, item: CouponDocumentType) => (
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
          {refs.current[value] && show === value && (
            <Overlay
              placement={"left"}
              target={refs.current[value]}
              show
              container={document.body}
              onHide={() => setShow("")}
              rootClose
            >
              <Tooltip id="button-tooltip" className={show + " " + value}>
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
          )}
        </>
      ),
    },
  ];

  const getCouponData = () => {
    const payload: getCouponPayloadType = {
      page: pagination.page,
      limit: pagination.limit,
      search: filter.search,
    };

    if (filter.state === "isActive") {
      payload.isActive = true;
    }

    if (filter.state === "isExpire") {
      payload.isExpire = true;
    }

    getAllCouponList(payload).then((res) => {
      if (res.success) {
        const data = res.data;
        setPagination({
          page: data.page,
          limit: 10,
          totalPages: data.totalPages,
          totalRecords: data.totalRecords,
        });
        setCouponData(data.records);
        setTotalCount(res.data.totalRecords || 0)
      } else {
        setCouponData([]);
        setPagination({
          page: 1,
          limit: 10,
          totalPages: 0,
          totalRecords: 0,
        });
      }
    });
  };

  const handleChange = (value: string) => {
    setFilter((prev) => ({ ...prev, search: value }));
  };

  const debouncedSearch = useCallback(debounce(handleChange, 200), []);

  const handleDelete = (product: CouponDocumentType) => {
    setCouponToDelete(product);
    setShowDeleteModal(true);
    setShow("");
  };

  const handleEdit = (id: string) => {
    navigate(`/coupon/${id}`);
  };

  const handleDeleteConfirm = async () => {
    if (!couponToDelete) return;
    setIsDeleting(true);

    try {
      deleteCouponById(couponToDelete._id).then((res) => {
        const toast2 = res.success ? toast.success : toast.error;
        toast2(res.message);

        if (res.success) {
          setCouponData((prev) =>
            prev.filter((p) => p._id !== couponToDelete._id)
          );
        }
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setCouponToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    if (!isDeleting) {
      setShowDeleteModal(false);
      setCouponToDelete(null);
    }
  };

  return (
    <section className="coupon">
      <div className="coupon-categories">
        <Nav>
          <NavItem>
            <NavLink
              eventKey=""
              active={filter.state === ""}
              onClick={() => setFilter((prev) => ({ ...prev, state: "" }))}
            >
              All Coupons
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              eventKey="isActive"
              onClick={() =>
                setFilter((prev) => ({ ...prev, state: "isActive" }))
              }
            >
              Active Coupons
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              eventKey="isExpire"
              onClick={() =>
                setFilter((prev) => ({ ...prev, state: "isExpire" }))
              }
            >
              Expired Coupons
            </NavLink>
          </NavItem>
        </Nav>
        <div className="last-serach">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              className="order-search"
              type="search"
              placeholder="Search orders. . ."
              // value={filter.search}
              onChange={(e) => debouncedSearch(e.target.value, 10000)}
            />
          </div>
        </div>
      </div>
      <CommonTable
        header={columns}
        data={couponData}
        isPagination
        limit={pagination.limit}
        page={pagination.page}
        totalPages={pagination.totalPages}
        totalRecords={pagination.totalRecords}
        onPageChange={setPagination}
      />
      <ConfirmationModal
        show={showDeleteModal}
        onHide={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Coupon"
        message={
          <>
            Are you sure you want to delete <b>{couponToDelete?.code}</b>? This
            action cannot be undone.
          </>
        }
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        loading={isDeleting}
      />
    </section>
  );
};

export default Coupon;
