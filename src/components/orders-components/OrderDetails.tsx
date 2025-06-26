import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { BsFillCreditCardFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { HiTruck } from "react-icons/hi";
import { IoCalendarClear, IoPencil } from "react-icons/io5";
import { MdEmail, MdTimer } from "react-icons/md";
import { FaCartShopping, FaLocationDot, FaMobileButton } from "react-icons/fa6";
import { TbReceiptFilled } from "react-icons/tb";
import { BiSolidBox } from "react-icons/bi";
import { CgFileDocument } from "react-icons/cg";
import { useParams } from "react-router-dom";
import { orderDataType, orderItemType } from "@/types/order";
import { getOrderById } from "@/service/asyncStore/action/order";
import { ProductDataType } from "@/types/productDataTypes";
import CommonTable from "../CommonComponents/CommonTable";
import { formatUserAddress } from "@/utils/helper";
import PageTitle from "../CommonComponents/PageTitle";

const OrderDetails = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState<orderDataType | null>(null);
  const [otherData, setOtherData] = useState<any>([]);

  useEffect(() => {
    if (id) {
      getOrderById(id).then((res) => {
        if (res.success) {
          const data = res.data;
          const extraColumn = [
            [
              "",
              "",
              "",
              <span className="order-subdata">Subtotal</span>,
              <span className="order-subdata">₹{res.data.totalAmount}</span>,
            ],
            // ["", "", "", "Subtotal", res.data.totalAmount],
            [
              "",
              "",
              "",
              <span className="order-subdata">Shipping Rate</span>,
              <span className="order-subdata">₹0</span>,
            ],
            [
              "",
              "",
              "",
              <span className="order-subdata-total">Total</span>,
              <span className="order-subdata-total">
                ₹{res.data.totalAmount}
              </span>,
            ],
          ];
          setOtherData(extraColumn);
          setOrderDetails(data);
        }
      });
    }
  }, [id]);

  const column = [
    {
      title: "Product",
      dataIndex: "productId",
      key: "productId",
      render: (item: ProductDataType) => (
        <>
          <div className="product cursor-pointer">
            <img
              src={import.meta.env.VITE_IMAGE_DOMAIN + item?.image?.[0]}
              alt="avatar"
            />
            <div className="product-title">
              <h5 className="two-line-clamp">{item?.title}</h5>
              <p className="mb-0 fade-data">{item?.subCategoryId?.name}</p>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      cellClass: "skuId",
      render: (_: string, item: orderItemType) => (
        <span className="cursor-pointer">{item.productId.sku}</span>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      cellClass: "fade-data",
      render: (value: string) => (
        <span className="cursor-pointer">{value} pcs</span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      cellClass: "fade-data",
      render: (value: number) => {
        return <>${value}</>;
      },
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      key: "totalAmount",
      cellClass: "fade-data",
      render: (_: string, item: orderItemType) => (
        <span className="cursor-pointer">
          ₹{(item.price * item.quantity).toFixed(2)}
        </span>
      ),
    },
  ];

  return (
    <>
      <PageTitle
        title="Order Details"
        subTitle="Orders"
        isExport={false}
      />
      <div className="order-details">
        <Container fluid className="py-4 px-0">
          <Row>
            {/* Left Column */}
            <Col lg={8} className="mb-4">
              {/* Order Header */}
              <Row>
                <Col lg={6}>
                  <Card className="order-header-card mb-4">
                    <Card.Body>
                      <div className="order-header">
                        <div className="order-title">
                          <h4>Order #{id}</h4>
                          <span className="processing-badge">
                            {orderDetails?.status}
                          </span>
                          <button className="edit-btn">
                            <IoPencil size={22} />
                          </button>
                        </div>

                        <div className="order-meta">
                          <div className="meta-item">
                            <div className="meta-icon">
                              <IoCalendarClear size={24} />
                            </div>
                            <div>
                              <span className="meta-label">Added</span>
                              <span className="meta-value">
                                {orderDetails?.createdAt &&
                                  new Date(
                                    orderDetails?.createdAt
                                  ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          <div className="meta-item">
                            <div className="meta-icon">
                              <BsFillCreditCardFill size={24} />
                            </div>
                            <div>
                              <span className="meta-label">Payment Method</span>
                              <span className="meta-value">
                                {orderDetails?.paymentMethod?.toUpperCase()}
                              </span>
                            </div>
                          </div>

                          <div className="meta-item">
                            <div className="meta-icon">
                              <HiTruck size={24} />
                            </div>
                            <div>
                              <span className="meta-label">
                                Shipping Method
                              </span>
                              <span className="meta-value">Flat Shipping</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={6}>
                  <Card className="customer-card mb-4">
                    <Card.Header>
                      <h5>Customer</h5>
                    </Card.Header>
                    <Card.Body>
                      <div className="customer-info">
                        <div className="info-item">
                          <div className="info-icon">
                            <FaUserAlt size={24} />
                          </div>
                          <div>
                            <span className="info-label">Customer</span>
                            <span className="info-value">
                              {orderDetails?.fname} {orderDetails?.lname}
                            </span>
                          </div>
                        </div>

                        <div className="info-item">
                          <div className="info-icon">
                            <MdEmail size={24} />
                          </div>
                          <div>
                            <span className="info-label">Email</span>
                            <span className="info-value">
                              {orderDetails?.email}
                            </span>
                          </div>
                        </div>

                        <div className="info-item">
                          <div className="info-icon">
                            <FaMobileButton size={24} />
                          </div>
                          <div>
                            <span className="info-label">Phone</span>
                            <span className="info-value">
                              {orderDetails?.mobile}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Order List */}
              <Card className="order-list-card">
                <Card.Header>
                  <h5>
                    Order List <span className="order-count">+2 Orders</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <CommonTable
                    header={column}
                    data={orderDetails?.items || []}
                    extraColumn={otherData}
                  />
                </Card.Body>
              </Card>
            </Col>

            {/* Right Column */}
            <Col lg={4}>
              {/* Document Info */}
              <Card className="document-card mb-4">
                <Card.Header>
                  <h5>Document</h5>
                </Card.Header>
                <Card.Body>
                  <div className="document-info">
                    <div className="info-item">
                      <div className="info-icon">
                        <TbReceiptFilled size={24} />
                      </div>
                      <div>
                        <span className="info-label">Invoice</span>
                        <span className="info-value">INV-32011</span>
                      </div>
                    </div>

                    <div className="info-item">
                      <div className="info-icon">
                        <BiSolidBox size={24} />
                      </div>
                      <div>
                        <span className="info-label">Shipping</span>
                        <span className="info-value">SHP-20118EG</span>
                      </div>
                    </div>

                    {/* <div className="info-item">
                    <div className="info-icon">
                      <BsFillTrophyFill size={24} />
                    </div>
                    <div>
                      <span className="info-label">Rewards</span>
                      <span className="info-value">480 point</span>
                    </div>
                  </div> */}
                  </div>
                </Card.Body>
              </Card>

              {/* Address */}
              <Card className="address-card mb-4">
                <Card.Header>
                  <h5>Address</h5>
                </Card.Header>
                <Card.Body>
                  <div className="address-section">
                    <div className="address-item">
                      <div className="address-icon">
                        <FaLocationDot size={24} />
                      </div>
                      <div>
                        <span className="address-label">Billing Address</span>
                        <span className="address-value">
                          {formatUserAddress({
                            address: orderDetails?.streetAddress.join(" "),
                            state: orderDetails?.state,
                            country: orderDetails?.country,
                            pincode: orderDetails?.pincode.toString(),
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="address-item">
                      <div className="address-icon">
                        <FaLocationDot size={24} />
                      </div>
                      <div>
                        <span className="address-label">Shipping Address</span>
                        <span className="address-value">
                          {formatUserAddress({
                            address: orderDetails?.shippingAddress.join(" "),
                            state: orderDetails?.shippingState,
                            country: orderDetails?.shippingCountry,
                            pincode: orderDetails?.shippingPincode?.toString(),
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Order Status */}
              <Card className="order-status-card">
                <Card.Header>
                  <h5>Order Status</h5>
                </Card.Header>
                <Card.Body>
                  <div className="status-timeline">
                    <div className="status-item completed">
                      <div className="status-icon">
                        <FaCartShopping size={24} />
                      </div>
                      <div className="status-content">
                        <span className="status-title">Order Placed</span>
                        <span className="status-desc">
                          An order has been placed.
                        </span>
                        <span className="status-time">13/12/2022, 05:00</span>
                      </div>
                    </div>

                    <div className="status-item active">
                      <div className="status-icon">
                        <MdTimer size={24} />
                      </div>
                      <div className="status-content">
                        <span className="status-title">Processing</span>
                        <span className="status-desc">
                          Seller has processed your order.
                        </span>
                        <span className="status-time">13/12/2022, 05:15</span>
                      </div>
                    </div>

                    <div className="status-item">
                      <div className="status-icon">
                        <BiSolidBox size={24} />
                      </div>
                      <div className="status-content">
                        <span className="status-title">Packed</span>
                        <span className="status-time">DD/MM/YY, 00:00</span>
                      </div>
                    </div>

                    <div className="status-item">
                      <div className="status-icon">
                        <HiTruck size={24} />
                      </div>
                      <div className="status-content">
                        <span className="status-title">Shipping</span>
                        <span className="status-time">DD/MM/YY, 00:00</span>
                      </div>
                    </div>

                    <div className="status-item">
                      <div className="status-icon">
                        <CgFileDocument size={24} />
                      </div>
                      <div className="status-content">
                        <span className="status-title">Delivered</span>
                        <span className="status-time">DD/MM/YY, 00:00</span>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default OrderDetails;
