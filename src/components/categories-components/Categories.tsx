import { categoryListType } from "@/types/caseStudyTypes";
import CommonTable from "../CommonComponents/CommonTable";

import { useContext, useEffect, useRef, useState } from "react";
import { Form, Overlay, Tooltip } from "react-bootstrap";
import { HiDotsVertical } from "react-icons/hi";
import {
  addCategory,
  getCategoryList,
  inActiveCategory,
  updateCategory,
} from "@/service/asyncStore/action/caseStudy";
import { MainContext } from "@/context/mainContext";
import { toast } from "react-toastify";
import AddCategoryModal from "./AddCategoryModal";
import { useForm } from "react-hook-form";
import categoryFormSchema, {
  categoryFormSchemaType,
} from "@/service/form-schema/casestudy.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getImageAsBlob } from "@/utils/helper";

type Categoriestype = {
  openCategories: boolean;
  handleCategories: (
    isOpen: boolean,
    setFileList?: React.Dispatch<any>
  ) => void;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>

};

const Categories = ({ openCategories, handleCategories, setTotalCount }: Categoriestype) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<categoryFormSchemaType>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      image: "",
    },
  });
  const { categoryChange, setCategoryChange }: any = useContext(MainContext);
  const refs = useRef<any>({});
  const [show, setShow] = useState("");
  const [isEdit, setIsEdit] = useState<categoryListType | null>(null);
  const [categoryList, setCategoryList] = useState<categoryListType[]>([]);
  const [loading, setLoading] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
    totalRecords: 0,
  });

  useEffect(() => {
    getCategoryData();
  }, [categoryChange]);

  useEffect(() => {
    if (!openCategories) {
      setIsEdit(null);
    }
  }, [openCategories]);

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      headerClass: "th-font",
      render: (value: string, item: categoryListType) => (
        <>
          <div className="product">
            <img
              src={import.meta.env.VITE_IMAGE_DOMAIN + item.image}
              alt="avatar"
            />
            <div className="product-title">
              <h5>{value}</h5>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Active",
      key: "isActive",
      dataIndex: "isActive",
      render: (value: boolean, item: categoryListType) => (
        <>
          {loading === item._id ? (
            <span className="spinner" />
          ) : (
            <Form>
              <Form.Check
                type="switch"
                id="custom-switch"
                checked={value}
                onChange={() => categoryStatusChange(item._id, !value)}
                className="red-toggle"
              />
            </Form>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "_id",
      dataIndex: "_id",
      render: (value: string, item: categoryListType) => (
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
              </div>
            </Tooltip>
          </Overlay>
        </>
      ),
    },
  ];

  const handleEdit = (item: categoryListType) => {
    setIsEdit(item);
    handleCategories(true);
    setShow("");
    // setValue("name", item.name);
    // setValue("image", item.image);
  };

  const categoryStatusChange = (id: string, isActive: boolean) => {
    setLoading(id);
    inActiveCategory(id, isActive)
      .then((res) => {
        const toast2 = res.success ? toast.success : toast.error;
        toast2(res.message);
        if (res.success) {
          setCategoryChange((prev: boolean) => !prev);
          getCategoryData();
        }
      })
      .finally(() => setLoading(""));
  };

  const getCategoryData = () => {
    getCategoryList({ page: pagination.page, limit: pagination.limit }).then(
      (res) => {
        if (res.success) {
          setCategoryList(res.data.data);
          setPagination({
            page: res.data.page,
            limit: 10,
            totalPages: res.data.totalPages,
            totalRecords: res.data.totalRecords,
          });
          setTotalCount(res.data.totalRecords || 0)
        }
      }
    );
  };

  const onSubmit = async (
    data: categoryFormSchemaType,
    setFileList: React.Dispatch<any>
  ) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (isEdit?._id && !(data.image instanceof File)) {
      const blob = await getImageAsBlob(data.image);
      formData.append(`image`, blob);
    } else {
      formData.append("image", data.image);
    }

    const action = () =>
      isEdit?._id
        ? updateCategory(formData, isEdit._id)
        : addCategory(formData);
    action().then((res) => {
      const toast2 = res.success ? toast.success : toast.error;
      toast2(res.message);
      if (res.success) {
        setCategoryChange((prev: boolean) => !prev);
        handleCategories(false);
        setFileList(null);
        reset();
        getCategoryData();
      }
    });
  };

  return (
    <section className="categories">
      <CommonTable
        header={columns}
        data={categoryList}
        isPagination
        limit={pagination.limit}
        page={pagination.page}
        totalPages={pagination.totalPages}
        totalRecords={pagination.totalRecords}
        onPageChange={setPagination}
      />

      <AddCategoryModal
        handleCategories={handleCategories}
        openCategories={openCategories}
        control={control}
        register={register}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        errors={errors}
        item={isEdit}
        setValue={setValue}
      />
    </section>
  );
};

export default Categories;
