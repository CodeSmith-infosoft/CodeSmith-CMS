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
import { toBase64 } from "@/utils/helper";
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
    },
  });

  useEffect(() => {
    if (id) {
      getTestimonialById(id).then((res) => {
        if (res.success) {
          const data = res.data;
          setValue("name", data.name);
          setValue("description", data.description);
          setValue("image", data.image);
          setValue("rating", data.rating);
          setFileList([
            {
              url: data.image,
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
   
    formData.append(`image`, data.image);

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
        isCancelConfirm={true}
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
                        draggable
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
                            {field.value || "Select Rating"} <FaCaretDown />
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
              </div>
            </Col>
          </Row>
        </Form>
      </section>
    </>
  );
};

export default SingleTestimonial;
