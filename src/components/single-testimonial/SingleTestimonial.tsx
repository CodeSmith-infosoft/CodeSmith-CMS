import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  Row,
} from "react-bootstrap";
import { BsFileImageFill } from "react-icons/bs";
import { Uploader } from "rsuite";
import "rsuite/dist/rsuite.css";
import ErrorMessage from "../ErrorMessage";
import PageTitle from "../CommonComponents/PageTitle";
import { getImageAsBlob, toBase64 } from "@/utils/helper";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import SingleTestimonialSchema, {
  SingleTestimonialFormData,
} from "@/service/form-schema/testimonial.schema";
import {
  addTestimonial,
  getTestimonialById,
  updateTestimonial,
} from "@/service/asyncStore/action/testimonial";
import { maxSizeInBytes } from "@/utils/constant";
import { FaCaretDown } from "react-icons/fa";

const SingleTestimonial = () => {
  const [fileList, setFileList] = useState<any>([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<SingleTestimonialFormData>({
    resolver: zodResolver(SingleTestimonialSchema),
    defaultValues: {
      name: "",
      description: "",
      rating: "",
      image: "",
      textColor: "",
      bgColor: "",
    },
  });

  useEffect(() => {
    if (id) {
      getTestimonialById(id).then((res) => {
        if (res.success) {
          const data = res.data;
          setValue("name", data.name);
          setValue("description", data.description);
          setValue("image", import.meta.env.VITE_IMAGE_DOMAIN + data.image);
          setValue("rating", data.rating);
          setValue("textColor", data.textColor);
          setValue("bgColor", data.bgColor);
          setFileList([
            {
              url: import.meta.env.VITE_IMAGE_DOMAIN + data.image,
              name: data.image.split("/").at(-1),
            },
          ]);
        }
      });
    }
  }, [id]);

  const onSubmit = async (data: SingleTestimonialFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("rating", data.rating);
    formData.append("textColor", data.textColor);
    formData.append("bgColor", data.bgColor);
    if (id && !(data.image instanceof File)) {
      const blob = await getImageAsBlob(data.image);
      formData.append(`image`, blob);
    } else {
      formData.append(`image`, data.image);
    }

    const action = () =>
      id ? updateTestimonial(formData, id) : addTestimonial(formData);
    action().then((res) => {
      const toast2 = res.success ? toast.success : toast.error;
      toast2(res.message);
      if (res.success) {
        reset();
        navigate("/testimonial");
      }
    });
  };

  const handleFeildChange = async (newFileList: any, field: any) => {
    const data = newFileList.at(-1);
    const file = data?.originFileObj || data?.blobFile || data;

    if (!(file instanceof Blob)) {
      return;
    }

    if (file.size > maxSizeInBytes) {
      toast.error("File size must be 1MB or less.");
      setFileList([]);
      return;
    }

    const base64 = await toBase64(file);
    setFileList([{ ...data, url: base64 }]);
    field.onChange(file);
  };

  return (
    <>
      <PageTitle
        title={`${id ? "Update" : "Add"} single testimonial`}
        subTitle="Testimonial"
        subRedirect="/testimonial"
        cancelBtn
        cancelPath="/testimonial"
        onSubmit={handleSubmit(onSubmit)}
      />
      <section className="single-product">
        <Form>
          <Row>
            <Col md={12}>
              <Card>
                <h3 className="mb-2">Person Image</h3>
                <div className="file-upload">
                  <Controller
                    name="image"
                    control={control}
                    render={({ field }) => (
                      <Uploader
                        listType="picture-text"
                        multiple={true}
                        action=""
                        accept="image/*"
                        fileList={fileList}
                        onChange={(fileList) =>
                          handleFeildChange(fileList, field)
                        }
                      >
                        <div className="upload-button">
                          <div className="img-logo">
                            <BsFileImageFill size={18} />
                          </div>
                          <div>
                            <label className="d-block" htmlFor="">
                              Drag and drop image here, or click add image
                            </label>
                          </div>
                          <div className="add-img-btn">
                            <button type="button">Add Image</button>
                          </div>
                        </div>
                      </Uploader>
                    )}
                  />
                </div>
                <ErrorMessage message={errors.image?.message} />
              </Card>
            </Col>
            <Col md={12}>
              <div className="general-information">
                <Card>
                  <h3>Details</h3>

                  <label htmlFor="">Name</label>
                  <input type="text" placeholder="Name" {...register("name")} />
                  <ErrorMessage message={errors.name?.message} />
                  <label htmlFor="">Description (Max-Characters: 245)</label>
                  <input
                    type="text"
                    placeholder="Description"
                    maxLength={245}
                    {...register("description", {
                      required: "Description is required",
                      maxLength: {
                        value: 245,
                        message: "Description cannot exceed 800 characters",
                      },
                    })}
                  />
                  <ErrorMessage message={errors.description?.message} />
                  <label htmlFor="">Rating</label>
                  <div className="category-drop">
                    <Controller
                      name="rating"
                      control={control}
                      render={({ field }) => (
                        <Dropdown>
                          <DropdownToggle>
                            {field.value || "Select Rating"}{" "}
                            <FaCaretDown />
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem
                              onClick={() => field.onChange("1")}
                              className="d-flex gap-2 align-items-center"
                            >
                              1
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => field.onChange("2")}
                              className="d-flex gap-2 align-items-center"
                            >
                              2
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => field.onChange("3")}
                              className="d-flex gap-2 align-items-center"
                            >
                              3
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => field.onChange("4")}
                              className="d-flex gap-2 align-items-center"
                            >
                              4
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => field.onChange("5")}
                              className="d-flex gap-2 align-items-center"
                            >
                              5
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      )}
                    />
                  </div>
                  <ErrorMessage message={errors.description?.message} />
                </Card>
                <Card className="my-4">
                  <h3>Color</h3>

                  <label htmlFor="">Text & Background Color</label>
                  <div className="category-drop">
                    <Controller
                      name="textColor"
                      control={control}
                      render={({ field }) => (
                        <Dropdown>
                          <DropdownToggle>
                            {field.value || "Select a Tech Stack"}{" "}
                            <FaCaretDown />
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem
                              onClick={() => {
                                field.onChange("#273974");
                                setValue("bgColor", "#F2F4FE");
                              }}
                              className="d-flex gap-2 align-items-center"
                            >
                              <div
                                style={{ backgroundColor: "#273974" }}
                                className="color-preview"
                              />{" "}
                              {"#273974"} -
                              <div
                                style={{ backgroundColor: "#F2F4FE" }}
                                className="color-preview"
                              />{" "}
                              {"#F2F4FE"}
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => {
                                field.onChange("#E9373A");
                                setValue("bgColor", "#FDEBEB");
                              }}
                              className="d-flex gap-2 align-items-center"
                            >
                              <div
                                style={{ backgroundColor: "#E9373A" }}
                                className="color-preview"
                              />{" "}
                              {"#E9373A"} -
                              <div
                                style={{ backgroundColor: "#FDEBEB" }}
                                className="color-preview"
                              />{" "}
                              {"#FDEBEB"}
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => {
                                field.onChange("#3098D4");
                                setValue("bgColor", "#E7F4FB");
                              }}
                              className="d-flex gap-2 align-items-center"
                            >
                              <div
                                style={{ backgroundColor: "#3098D4" }}
                                className="color-preview"
                              />{" "}
                              {"#3098D4"} -
                              <div
                                style={{ backgroundColor: "#E7F4FB" }}
                                className="color-preview"
                              />{" "}
                              {"#E7F4FB"}
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => {
                                field.onChange("#119448");
                                setValue("bgColor", "#E7F4ED");
                              }}
                              className="d-flex gap-2 align-items-center"
                            >
                              <div
                                style={{ backgroundColor: "#119448" }}
                                className="color-preview"
                              />{" "}
                              {"#119448"} -
                              <div
                                style={{ backgroundColor: "#E7F4ED" }}
                                className="color-preview"
                              />{" "}
                              {"#E7F4ED"}
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      )}
                    />
                  </div>
                  <ErrorMessage message={errors.bgColor?.message} />
                </Card>
              </div>
            </Col>
          </Row>
        </Form>
      </section>
    </>
  );
};

export default SingleTestimonial;
