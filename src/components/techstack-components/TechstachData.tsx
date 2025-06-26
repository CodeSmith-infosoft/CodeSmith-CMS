import React, { useEffect, useRef, useState } from "react";
import { Overlay, Tooltip } from "react-bootstrap";
import PageTitle from "../CommonComponents/PageTitle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import ConfirmationModal from "../ConfirmationModal";
import AddTechstack from "./AddTechstack";
import {
  addTechStack,
  deleteTechStack,
  getAllTechStack,
  updateTechStack,
} from "@/service/asyncStore/action/techStack";
import CommonTable from "../CommonComponents/CommonTable";
import { HiDotsVertical } from "react-icons/hi";
import { TechStackItemType } from "@/types/techStackTypes";
import techStackSchema, {
  techStackFormData,
} from "@/service/form-schema/techStack.schema";
import { deleteBlog } from "@/service/asyncStore/action/blog";

const TechstachData: React.FC = () => {
  const [techstachData, setTechstachData] = useState<TechStackItemType[]>([]);
  const [openTechstachModal, setTechstachModal] = useState(false);
  const [isEdit, setIsEdit] = useState<TechStackItemType | null>(null);
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
  } = useForm<techStackFormData>({
    resolver: zodResolver(techStackSchema),
    defaultValues: {
      name: "",
      bgColor: "",
      textColor: "",
    },
  });

  useEffect(() => {
    getMarketPlaceData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Bg Color",
      dataIndex: "bgColor",
      key: "bgColor",
      render: (value: string) => (
        <span className="d-flex gap-2 align-items-center">
          <div style={{ backgroundColor: value }} className="color-preview" />
          {value}
        </span>
      ),
    },
    {
      title: "Text Color",
      dataIndex: "textColor",
      key: "textColor",
      render: (value: string) => (
        <span className="d-flex gap-2 align-items-center">
          <div style={{ backgroundColor: value }} className="color-preview" />
          {value}
        </span>
      ),
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
    getAllTechStack({ page: pagination.page, limit: pagination.limit }).then(
      (res) => {
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
      }
    );
  };

  const handleEdit = (item: TechStackItemType) => {
    setIsEdit(item);
    toggleModal(true);
    setShow("");
  };

  const toggleModal = (isOpen: boolean) => {
    reset();
    setTechstachModal(isOpen);
  };

  const onSubmit = async (data: techStackFormData) => {
    setIsDeleting(true);
    const action = () =>
      isEdit?._id ? updateTechStack(data, isEdit._id) : addTechStack(data);
    action()
      .then((res) => {
        const toast2 = res.success ? toast.success : toast.error;
        toast2(res.message);
        if (res.success) {
          toggleModal(false);
          reset();
          getMarketPlaceData();
        }
      })
      .finally(() => setIsDeleting(false));
  };

  const handleDelete = (item: TechStackItemType) => {
    setIsEdit(item);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!isEdit) return;
    setIsDeleting(true);

    try {
      deleteTechStack(isEdit._id).then((res) => {
        const toast2 = res.success ? toast.success : toast.error;
        toast2(res.message);

        if (res.success) {
          setTechstachData((prev) => prev.filter((p) => p._id !== isEdit._id));
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
        title="Tech Stack"
        button="Tech Stack"
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
      <AddTechstack
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

export default TechstachData;
