import CommonTable from "../CommonComponents/CommonTable";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { orderDataType, orderItemType } from "@/types/order";
import { useEffect, useState } from "react";
import { getAllOrders } from "@/service/asyncStore/action/order";

const RecentOrders = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<orderDataType[]>([]);

  useEffect(() => {
    getAllOrders({page: 1, limit: 10}).then((res) => {
      if (res.success) {
        const data = res.data;
        setOrderData(data.orders);
      }
    });
  }, []);

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
              <p className="mb-0 fade-data">{items[0].productId?.subCategoryId?.name}</p>
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

  return (
    <section className="recent-orders">
      <h2 className="mb-0">Recent Orders</h2>
      <CommonTable header={columns} data={orderData} />
    </section>
  );
};

export default RecentOrders;
