import {
  Nav,
  NavItem,
  NavLink,
  TabContainer,
  TabContent,
  TabPane,
} from "react-bootstrap";
import { FaEye, FaSearch } from "react-icons/fa";
import CommonTable from "../CommonComponents/CommonTable";
import { useCallback, useEffect, useState } from "react";
import {
  downloadOrdersCSV,
  getAllOrders,
} from "@/service/asyncStore/action/order";
import { orderDataType, orderItemType } from "@/types/order";
import { DatePicker } from "rsuite";
import { debounce, parseAndExportCSV } from "@/utils/helper";
import { useNavigate } from "react-router-dom";
import PageTitle from "../CommonComponents/PageTitle";
import ExportDatePopup from "../ExportDatePopup";
import { toast } from "react-toastify";

const Orders = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<orderDataType[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
    totalRecords: 0,
  });
  const [filter, setFilter] = useState<{
    status: string;
    startDate: null | Date;
    endDate: null | Date;
    search: string;
  }>({
    search: "",
    status: "",
    startDate: null,
    endDate: null,
  });
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    getOrderData();
  }, [pagination.page, filter]);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      cellClass: "orderId",
      render: (value: string) => (
        <span
          onClick={() => navigate(`/order/${value}`)}
          className="cursor-pointer"
        >
          {value}
        </span>
      ),
    },
    {
      title: "Products",
      dataIndex: "items",
      key: "items",
      render: (items: orderItemType[], main: orderDataType) => (
        <>
          {/* <div className='d-flex align-items-center'>
                  <input className='input-box me-2' type="checkbox" /> */}
          <div
            className="product cursor-pointer"
            onClick={() => navigate(`/order/${main.orderId}`)}
          >
            <img
              src={
                import.meta.env.VITE_IMAGE_DOMAIN +
                items[0].productId?.image?.[0]
              }
              alt="avatar"
            />
            <div className="product-title">
              <h5 className="two-line-clamp">{items[0].productId?.title}</h5>
              <p className="mb-0 fade-data">
                {items[0].productId?.subCategoryId?.name}
              </p>
            </div>
          </div>
          {/* </div> */}
        </>
      ),
    },
    {
      title: "Customer",
      dataIndex: "fname",
      key: "fname",
      cellClass: "fade-data",
      render: (_: any, item: orderDataType) => (
        <span>
          {item.fname} {item.lname}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      cellClass: "fade-data",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      key: "totalAmount",
      cellClass: "fade-data",
    },
    {
      title: "Payment",
      dataIndex: "totalAmount",
      key: "totalAmount",
      cellClass: "order-status-button",
      render: () => <button className="paid">Paid</button>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      cellClass: "order-status-button",
      render: (value: string) => <button className={value}>{value}</button>,
    },
    {
      title: "Action",
      key: "orderId",
      dataIndex: "orderId",
      render: (value: string) => (
        <div
          className="d-flex justify-content-center cursor-pointer"
          onClick={() => navigate(`/order/${value}`)}
        >
          <FaEye />
        </div>
      ),
    },
  ];

  const getOrderData = () => {
    const payload = {
      page: pagination.page,
      limit: pagination.limit,
      status: filter.status,
      startDate: filter.startDate,
      endDate: filter.endDate,
      search: filter.search,
    };
    getAllOrders(payload).then((res) => {
      if (res.success) {
        const data = res.data;
        setPagination({
          page: data.page,
          limit: 10,
          totalPages: data.totalPages,
          totalRecords: data.totalRecords,
        });
        setOrderData(data.orders);
        setTotalCount(res.data.totalRecords || 0)
      } else {
        setOrderData([]);
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

  const handleExport = (startDate: Date | null, endDate: Date | null) => {
    setLoading(true);
    downloadOrdersCSV({
      startDate,
      endDate,
    })
      .then((res) => {
        if (!res.success) {
          toast.error(res.message);
        }
        if (!res.includes("Error")) {
          parseAndExportCSV(res, "Orders_List");
        }
      })
      .finally(() => {
        setLoading(false);
        setIsExportOpen(false);
      });
  };

  return (
    <>
      <PageTitle
        title="Orders"
        totalCount={totalCount}
      />
      <section className="order">
        <TabContainer defaultActiveKey="all">
          <div className="order-categories">
            <Nav>
              <NavItem>
                <NavLink
                  eventKey="all"
                  onClick={() => setFilter((prev) => ({ ...prev, status: "" }))}
                >
                  All Status
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  eventKey="processing"
                  onClick={() =>
                    setFilter((prev) => ({ ...prev, status: "processing" }))
                  }
                >
                  Processing
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  eventKey="shipped"
                  onClick={() =>
                    setFilter((prev) => ({ ...prev, status: "shipped" }))
                  }
                >
                  Shipped
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  eventKey="delivered"
                  onClick={() =>
                    setFilter((prev) => ({ ...prev, status: "delivered" }))
                  }
                >
                  Delivered
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  eventKey="cancelled"
                  onClick={() =>
                    setFilter((prev) => ({ ...prev, status: "cancelled" }))
                  }
                >
                  Cancelled
                </NavLink>
              </NavItem>
            </Nav>

            <div className="last-serach">
              <div className="d-flex gap-3">
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
                      return filter.endDate
                        ? date > new Date(filter.endDate)
                        : false;
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
          <TabContent>
            {[
              "all",
              "pending",
              "processing",
              "shipped",
              "delivered",
              "cancelled",
              "rejected",
            ].map((key) => (
              <TabPane eventKey={key} key={key}>
                <CommonTable
                  header={columns}
                  data={orderData}
                  isPagination
                  limit={pagination.limit}
                  page={pagination.page}
                  totalPages={pagination.totalPages}
                  totalRecords={pagination.totalRecords}
                  onPageChange={setPagination}
                />
              </TabPane>
            ))}
          </TabContent>
        </TabContainer>
      </section>
      <ExportDatePopup
        isOpen={isExportOpen}
        setIsOpen={() => setIsExportOpen(false)}
        handleExport={handleExport}
        loading={loading}
      />
    </>
  );
};

export default Orders;
