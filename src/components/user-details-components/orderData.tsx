import { getAllOrders } from "@/service/asyncStore/action/order";
import { orderDataType, orderItemType } from "@/types/order";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommonTable from "../CommonComponents/CommonTable";

const OrderData = () => {
  const [orderData, setOrderData] = useState<orderDataType[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
    totalRecords: 0,
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getOrderData();
  }, [pagination.page]);

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
  ];

  const getOrderData = () => {
    const payload = {
      page: pagination.page,
      limit: pagination.limit,
      userId: id,
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

  return (
    <section>
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
    </section>
  );
};

export default OrderData;
