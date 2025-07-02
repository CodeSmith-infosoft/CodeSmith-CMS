import React, { useEffect, useRef, useState } from "react";
import CommonTable from "../CommonComponents/CommonTable";
import { BsEye } from "react-icons/bs";
import {
  getAllHireDeveloperInquiry, 
  markHireDeveloperInquiry,
} from "@/service/asyncStore/action/business";
import { Modal } from "react-bootstrap";

type ProductPropType = {
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
};

interface ContactItem {
  _id: string;
  name: string;
  email: string;
  hiringDuration: string;
  message: string;
  isActive: boolean;
  isMark: boolean;
  service: string;
  updatedAt: string;
  budget: boolean;
  createdAt: string;
}

interface MyVerticallyCenteredModalProps {
  show: boolean;
  onHide: () => void;
  selectedData: ContactItem | null;
}
const QuickBusinessComponent = ({ setTotalCount }: ProductPropType) => {
  const [productData, setProductData] = useState<ContactItem[]>([]);
  const [modalShow, setModalShow] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ContactItem | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
    totalRecords: 0,
  });

  const refs = useRef<any>({});

  useEffect(() => {
    getTeamData();
  }, [pagination.page]);

  const handleViewClick = async (item: ContactItem) => {
    setSelectedItem(item);
    setModalShow(true);

    // Mark as read if not already marked
    if (!item.isMark) {
      try {
        await markHireDeveloperInquiry(item._id);
        // Update the local state to reflect the change
        setProductData((prevData) =>
          prevData.map((dataItem) =>
            dataItem._id === item._id ? { ...dataItem, isMark: true } : dataItem
          )
        );
      } catch (error) {
        console.error("Failed to mark as read:", error);
      }
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (value: string, record: ContactItem) => (
        <p
          className={`two-line-clamp ${!record.isMark ? "fw-bold" : ""}`}
          style={{ fontWeight: !record.isMark ? "bold" : "normal" }}
        >
          {value}
        </p>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (value: string, record: ContactItem) => (
        <span style={{ fontWeight: !record.isMark ? "bold" : "normal" }}>
          {value}
        </span>
      ),
    },
    {
      title: "Hiring Duration",
      dataIndex: "hiringDuration",
      key: "hiringDuration",
      render: (value: string, record: ContactItem) => (
        <span style={{ fontWeight: !record.isMark ? "bold" : "normal", }}>
          {value}
        </span>
      ),
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      render: (value: string, record: ContactItem) => (
        <span style={{ fontWeight: !record.isMark ? "bold" : "normal", }}>
          {value}
        </span>
      ),
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (value: string, record: ContactItem) => (
        <span
          className="two-line-clamp"
          style={{ fontWeight: !record.isMark ? "bold" : "normal" }}
        >
          {value || "Quick Inquiry"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "_id",
      dataIndex: "_id",
      render: (value: string, record: ContactItem) => (
        <>
          <span
            className="cursor-pointer position-relative"
            ref={(el) => {
              refs.current[value] = el;
            }}
            onClick={() => handleViewClick(record)}
          >
            <BsEye />
          </span>
        </>
      ),
    },
  ];

  const getTeamData = () => {
    getAllHireDeveloperInquiry({ page: pagination.page, limit: pagination.limit }).then(
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
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        selectedData={selectedItem}
      />
    </>
  );
};

function MyVerticallyCenteredModal(props: MyVerticallyCenteredModalProps) {
  const { selectedData } = props;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Contact Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedData ? (
          <div>
            <div className="mb-3">
              <strong>Name:</strong>
              <p className="mb-2">{selectedData.name}</p>
            </div>

            <div className="mb-3">
              <strong>Email:</strong>
              <p className="mb-2">{selectedData.email}</p>
            </div>

            <div className="mb-3">
              <strong>Hiring Duration:</strong>
              <p className="mb-2">{selectedData.hiringDuration}</p>
            </div>

            <div className="mb-3">
              <strong>Message:</strong>
              <p className="mb-2">{selectedData.message}</p>
            </div>

            <div className="mb-3">
              <strong>Service:</strong>
              <p className="mb-2">{selectedData.service}</p>
            </div>

            <div className="mb-3">
              <strong>Date & Time:</strong>
              <p className="mb-2">
                {new Date(selectedData.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <p>No data available</p>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default QuickBusinessComponent;
