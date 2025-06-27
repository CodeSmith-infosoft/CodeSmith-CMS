import React, { useEffect, useRef, useState } from "react";
import CommonTable from "../CommonComponents/CommonTable";
import { BsEye } from "react-icons/bs";
import {
  getAllJobApplication,
  markAsRead,
} from "@/service/asyncStore/action/business";
import { Modal } from "react-bootstrap";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const MyViewer = ({ url }: { url: string }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js">
      <div
        style={{
          height: "750px",
          width: "700px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Viewer fileUrl={url} plugins={[defaultLayoutPluginInstance]} />
      </div>
    </Worker>
  );
};

type ProductPropType = {
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
};

export interface Career {
  _id: string;
  jobTitle: string;
  location: string;
  experience: string;
  vacancy: number;
  ofcTime: string;
  role: string[];
  skills: string[];
  benefits: string[];
  isArchive: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  techStackId: string;
  qualification: string;
}

export interface CareerApplication {
  _id: string;
  careerId: Career;
  name: string;
  email: string;
  mobile: string;
  attach: string;
  experienceYM: string;
  currentSalary: string;
  expectedSalary: string;
  currentJobLocation: string;
  isMark: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface MyVerticallyCenteredModalProps {
  show: boolean;
  onHide: () => void;
  selectedData: CareerApplication | null;
}
const JobComponent = ({ setTotalCount }: ProductPropType) => {
  const [productData, setProductData] = useState<CareerApplication[]>([]);
  const [modalShow, setModalShow] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<CareerApplication | null>(
    null
  );
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

  const handleViewClick = async (item: CareerApplication) => {
    setSelectedItem(item);
    setModalShow(true);

    // Mark as read if not already marked
    if (!item.isMark) {
      try {
        await markAsRead(item._id);
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
      render: (value: string, record: CareerApplication) => (
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
      render: (value: string, record: CareerApplication) => (
        <span style={{ fontWeight: !record.isMark ? "bold" : "normal" }}>
          {value}
        </span>
      ),
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      render: (value: string, record: CareerApplication) => (
        <span style={{ fontWeight: !record.isMark ? "bold" : "normal" }}>
          {value}
        </span>
      ),
    },
    {
      title: "Experience",
      dataIndex: "experienceYM",
      key: "experienceYM",
      render: (value: string, record: CareerApplication) => (
        <span
          className="two-line-clamp"
          style={{ fontWeight: !record.isMark ? "bold" : "normal" }}
        >
          {value}
        </span>
      ),
    },
    {
      title: "Current Salary",
      dataIndex: "currentSalary",
      key: "currentSalary",
      render: (value: string, record: CareerApplication) => (
        <span
          className="two-line-clamp"
          style={{ fontWeight: !record.isMark ? "bold" : "normal" }}
        >
          {value} LPA
        </span>
      ),
    },
    {
      title: "Expected Salary",
      dataIndex: "expectedSalary",
      key: "expectedSalary",
      render: (value: string, record: CareerApplication) => (
        <span
          className="two-line-clamp"
          style={{ fontWeight: !record.isMark ? "bold" : "normal" }}
        >
          {value} LPA
        </span>
      ),
    },
    {
      title: "Job Location",
      dataIndex: "currentJobLocation",
      key: "currentJobLocation",
      render: (value: string, record: CareerApplication) => (
        <span
          className="two-line-clamp"
          style={{ fontWeight: !record.isMark ? "bold" : "normal" }}
        >
          {value}
        </span>
      ),
    },
    {
      title: "Career",
      dataIndex: "careerId",
      key: "careerId",
      render: (value: Career, record: CareerApplication) => (
        <span
          className="two-line-clamp"
          style={{ fontWeight: !record.isMark ? "bold" : "normal" }}
        >
          {value.jobTitle}
        </span>
      ),
    },
    {
      title: "Attach",
      dataIndex: "attach",
      key: "attach",
      render: (value: string, record: CareerApplication) => (
        <span
          className="two-line-clamp"
          style={{ fontWeight: !record.isMark ? "bold" : "normal" }}
        >
          {value}
        </span>
      ),
    },
    {
      title: "Action",
      key: "_id",
      dataIndex: "_id",
      render: (value: string, record: CareerApplication) => (
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
    getAllJobApplication({
      page: pagination.page,
      limit: pagination.limit,
    }).then((res) => {
      setProductData(res.data.records);
      setPagination({
        page: res.data.page,
        limit: 10,
        totalPages: res.data.totalPages,
        totalRecords: res.data.totalRecords,
      });
      setTotalCount(res.data.totalRecords || 0);
    });
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
          Application Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedData ? (
          <>
            <MyViewer
              url={import.meta.env.VITE_IMAGE_DOMAIN + selectedData.attach}
            />
          </>
        ) : (
          // <Document file={import.meta.env.VITE_IMAGE_DOMAIN + selectedData.attach}>
          //   <Page pageNumber={1} />
          // </Document>
          <p>No data available</p>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default JobComponent;
