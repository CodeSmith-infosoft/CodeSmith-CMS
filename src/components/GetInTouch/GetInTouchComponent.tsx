// import React, { useEffect, useRef, useState } from "react";
// import CommonTable from "../CommonComponents/CommonTable";
// import { TeamItemType } from "@/types/teamType";
// import { BsEye } from "react-icons/bs";
// import { getAllTouch } from "@/service/asyncStore/action/getintouch";
// import { Modal } from "react-bootstrap";

// type ProductPropType = {
//   setTotalCount: React.Dispatch<React.SetStateAction<number>>;
// };

// interface MyVerticallyCenteredModalProps {
//   show: boolean;
//   onHide: () => void;
// }

// const GetInTouchComponent = ({ setTotalCount }: ProductPropType) => {
//   const [productData, setProductData] = useState<TeamItemType[]>([]);
//   const [modalShow, setModalShow] = React.useState<boolean>(false);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     totalPages: 0,
//     totalRecords: 0,
//   });

//   const refs = useRef<any>({});

//   useEffect(() => {
//     getTeamData();
//   }, [pagination.page]);

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       render: (value: string) => <p className="two-line-clamp">{value}</p>,
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Mobile",
//       dataIndex: "mobile",
//       key: "mobile",
//     },
//     {
//       title: "Message",
//       dataIndex: "message",
//       key: "message",
//     },
//     {
//       title: "Action",
//       key: "_id",
//       dataIndex: "_id",
//       render: (value: string) => (
//         <>
//           <span
//             className="cursor-pointer position-relative"
//             ref={(el) => {
//               refs.current[value] = el;
//             }}
//             onClick={() => setModalShow(true)}
//           >
//             <BsEye />
//           </span>
//         </>
//       ),
//     },
//   ];

//   const getTeamData = () => {
//     getAllTouch({ page: pagination.page, limit: pagination.limit }).then(
//       (res) => {
//         setProductData(res.data.records);
//         setPagination({
//           page: res.data.page,
//           limit: 10,
//           totalPages: res.data.totalPages,
//           totalRecords: res.data.totalRecords,
//         });
//         setTotalCount(res.data.totalRecords || 0);
//       }
//     );
//   };

//   return (
//     <>
//       <section>
//         <CommonTable
//           header={columns}
//           data={productData}
//           isPagination
//           limit={pagination.limit}
//           page={pagination.page}
//           totalPages={pagination.totalPages}
//           totalRecords={pagination.totalRecords}
//           onPageChange={setPagination}
//         />
//       </section>
//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// };

// function MyVerticallyCenteredModal(props: MyVerticallyCenteredModalProps) {
//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//       backdrop="static"
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           Details
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <h4>Centered Modal</h4>
//         <p>
//           Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
//           dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
//           consectetur ac, vestibulum at eros.
//         </p>
//       </Modal.Body>
//     </Modal>
//   );
// }

// export default GetInTouchComponent;

import React, { useEffect, useRef, useState } from "react";
import CommonTable from "../CommonComponents/CommonTable";
import { BsEye } from "react-icons/bs";
import {
  getAllTouch,
  markAsRead,
} from "@/service/asyncStore/action/getintouch";
import { Modal } from "react-bootstrap";

type ProductPropType = {
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
};

interface ContactItem {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  message: string;
  isActive: boolean;
  isMark: boolean;
  createdAt: string;
  updatedAt: string;
}

interface MyVerticallyCenteredModalProps {
  show: boolean;
  onHide: () => void;
  selectedData: ContactItem | null;
}
const GetInTouchComponent = ({ setTotalCount }: ProductPropType) => {
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
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      render: (value: string, record: ContactItem) => (
        <span style={{ fontWeight: !record.isMark ? "bold" : "normal" }}>
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
          {value}
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
    getAllTouch({ page: pagination.page, limit: pagination.limit }).then(
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
              <strong>Mobile:</strong>
              <p className="mb-2">{selectedData.mobile}</p>
            </div>

            <div className="mb-3">
              <strong>Message:</strong>
              <p className="mb-2">{selectedData.message}</p>
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

export default GetInTouchComponent;
