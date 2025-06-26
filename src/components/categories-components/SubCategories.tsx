import { categoryListType } from "@/types/caseStudyTypes";
import CommonTable from "../CommonComponents/CommonTable";

import { useContext, useEffect, useRef, useState } from "react";
import { Col, Form, Overlay, Row, Tooltip } from "react-bootstrap";
import { HiDotsVertical } from "react-icons/hi";
import { MainContext } from "@/context/mainContext";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PageTitle from "../CommonComponents/PageTitle";
import AddSubCategoryModal from "./AddSubCategoryModal";
import {
  addSubCategory,
  getSubCategoryList,
  inActiveSubcategory,
  updateSubCategory,
} from "@/service/asyncStore/action/subCategory";
import subCategoryFormSchema, {
  subCategoryFormSchemaType,
} from "@/service/form-schema/subCategory.schema";
import { useParams } from "react-router-dom";

const SubCategories = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<subCategoryFormSchemaType>({
    resolver: zodResolver(subCategoryFormSchema),
    defaultValues: {
      name: "",
      // image: "",
    },
  });
  const { categoryChange }: any = useContext(MainContext);
  <PageTitle title="Categories" button="Categories" />;
  const refs = useRef<any>({});
  const [show, setShow] = useState("");
  const [isEdit, setIsEdit] = useState<categoryListType | null>(null);
  const [categoryList, setCategoryList] = useState<categoryListType[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
    totalRecords: 0,
  });
  const { id } = useParams();
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    getSubCategoryData();
  }, [categoryChange, pagination.page, id]);

  const columns = [
    {
      title: "Sub Category Name",
      dataIndex: "name",
      key: "name",
      headerClass: "th-font",
      render: (value: string) => (
        <>
          <div className="product">
            {/* <img
              src={import.meta.env.VITE_IMAGE_DOMAIN + item.image}
              alt="avatar"
            /> */}
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
          {loading ? (
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
    setShow("");
  };

  const categoryStatusChange = (id: string, isActive: boolean) => {
    setLoading(true);
    inActiveSubcategory(id, isActive)
      .then((res) => {
        const toast2 = res.success ? toast.success : toast.error;
        toast2(res.message);
        if (res.success) {
          getSubCategoryData();
        }
      })
      .finally(() => setLoading(false));
  };

  const getSubCategoryData = () => {
    getSubCategoryList({
      page: pagination.page,
      limit: pagination.limit,
      categoryId: id,
    }).then((res) => {
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
    });
  };

  const onSubmit = async (data: subCategoryFormSchemaType) => {
    // const formData = new FormData();
    // formData.append("name", data.name);
    // if (isEdit?._id && !(data.image instanceof File)) {
    //   const blob = await getImageAsBlob(data.image);
    //   formData.append(`image`, blob);
    // } else {
    //   formData.append("image", data.image);
    // }

    const payload = {
      name: data.name,
      categoryId: id,
    };

    const action = () =>
      isEdit?._id
        ? updateSubCategory(payload, isEdit._id)
        : addSubCategory(payload);
    action().then((res) => {
      const toast2 = res.success ? toast.success : toast.error;
      toast2(res.message);
      if (res.success) {
        reset();
        getSubCategoryData();
      }
    });
  };

  const handleCancel = () => {
    setValue("name", "");
    setIsEdit(null);
  };

  return (
    <>
      <PageTitle
        title="Sub Categories"
        button="subCategories"
        onCancel={handleCancel}
        onSubmit={handleSubmit(onSubmit)}
        totalCount={totalCount}
      />
      <section className="categories">
        <Row>
          <Col md={8}>
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
          </Col>
          <Col md={4}>
            <AddSubCategoryModal
              register={register}
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              errors={errors}
              item={isEdit}
              setValue={setValue}
            />
          </Col>
        </Row>
      </section>
    </>
  );
};

export default SubCategories;
