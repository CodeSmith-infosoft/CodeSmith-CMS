import React, { useEffect, useRef, useState } from "react";
import { Overlay, Tooltip } from "react-bootstrap";
import PageTitle from "../CommonComponents/PageTitle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import ConfirmationModal from "../ConfirmationModal";
import AddTechstack from "./AddHire";
import CommonTable from "../CommonComponents/CommonTable";
import { HiDotsVertical } from "react-icons/hi";
import { TechStackItemType } from "@/types/techStackTypes";
import techStackSchema, {
  techStackFormData,
} from "@/service/form-schema/techStack.schema";
import {
  getAllHireOurDevelopers,
  updateHireOurDevelopers,
  addHireOurDeveloper,
  deleteHireOurDevelopers,
} from "@/service/asyncStore/action/hireDev";
import { HireDevItemType } from "@/types/hireDevTypes";
import addHireDevSchema, {
  hireDevFormSchemaType,
} from "@/service/form-schema/hiredev.schema";
import AddHire from "./AddHire";

const HireData: React.FC = () => {
  const [techstachData, setTechstachData] = useState<HireDevItemType[]>([]);
  const [openTechstachModal, setTechstachModal] = useState(false);
  const [isEdit, setIsEdit] = useState<HireDevItemType | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const refs = useRef<any>({});
  const [show, setShow] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
    totalRecords: 0,
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    setError,
    getValues,
  } = useForm<hireDevFormSchemaType>({
    resolver: zodResolver(addHireDevSchema),
    defaultValues: {
      logo: "",
      title: "",
      url: "",
    },
  });

  useEffect(() => {
    getMarketPlaceData();
  }, []);

  console.log(getValues());

  const columns = [
    {
      // title: <div className='d-flex align-items-center'><input className='input-box me-2' type="checkbox" />Products</div>,
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      cellClass: "cursor-pointer min-w-176",
      render: (value: string, data: HireDevItemType) => (
        <>
          <div
            className="d-flex align-items-center"
            onClick={() => handleEdit(data)}
          >
            <div className="product">
              <img
                src={import.meta.env.VITE_IMAGE_DOMAIN + value}
                alt="avatar"
              />
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Url",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "Action",
      key: "_id",
      dataIndex: "_id",
      render: (value: string, item: any) => (
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
                  onClick={() => handleEdit(item)}
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

  const getMarketPlaceData = () => {
    getAllHireOurDevelopers({
      page: pagination.page,
      limit: pagination.limit,
    }).then((res) => {
      if (res.success) {
        setTechstachData(res.data.records);
        setPagination({
          page: res.data.page,
          limit: 10,
          totalPages: res.data.totalPages,
          totalRecords: res.data.totalRecords,
        });
        setTotalCount(res.data.totalRecords || 0);
      }
    });
  };

  const handleEdit = (item: HireDevItemType) => {
    setIsEdit(item);
    toggleModal(true);
    setShow("");
  };

  const toggleModal = (isOpen: boolean, setFileList?: React.Dispatch<any>) => {
    reset();
    setTechstachModal(isOpen);
    if (!isOpen) {
      setIsEdit(null);
    }
    if (setFileList) {
      setFileList(null);
    }
  };

  const onSubmit = async (
    data: hireDevFormSchemaType,
    setFileList: React.Dispatch<any>
  ) => {
    setIsDeleting(true);
    const formData = new FormData();
    formData.append("logo", data.logo);
    formData.append("title", data.title);
    formData.append("url", data.url);
    const action = () =>
      isEdit?._id
        ? updateHireOurDevelopers(formData, isEdit._id)
        : addHireOurDeveloper(formData);
    action()
      .then((res) => {
        const toast2 = res.success ? toast.success : toast.error;
        toast2(res.message);
        if (res.success) {
          toggleModal(false);
          reset();
          getMarketPlaceData();
          setFileList(null);
        }
      })
      .finally(() => setIsDeleting(false));
  };

  const handleDelete = (item: HireDevItemType) => {
    setIsEdit(item);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!isEdit) return;
    setIsDeleting(true);

    try {
      deleteHireOurDevelopers(isEdit._id).then((res) => {
        const toast2 = res.success ? toast.success : toast.error;
        toast2(res.message);

        if (res.success) {
          getMarketPlaceData();
        }
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setIsEdit(null);
    }
  };

  const handleDeleteCancel = () => {
    if (!isDeleting) {
      setShowDeleteModal(false);
      setIsEdit(null);
    }
  };

  return (
    <>
      <PageTitle
        title="Hire Developer"
        button="Hire Developer"
        openCategories={toggleModal}
        totalCount={totalCount}
      />
      <section>
        <CommonTable
          header={columns}
          data={techstachData}
          isPagination
          limit={pagination.limit}
          page={pagination.page}
          totalPages={pagination.totalPages}
          totalRecords={pagination.totalRecords}
          onPageChange={setPagination}
        />
      </section>
      <AddHire
        handleToggle={toggleModal}
        openMarketModal={openTechstachModal}
        control={control}
        register={register}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        errors={errors}
        item={isEdit}
        setValue={setValue}
        isLoading={isDeleting}
        setError={setError}
      />
      <ConfirmationModal
        show={showDeleteModal}
        onHide={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Home Banner"
        message={
          <>
            Are you sure you want to delete this <b>Home Banner</b>? This action
            cannot be undone.
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

export default HireData;
