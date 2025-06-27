import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Col, Form, Row } from "react-bootstrap";
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
    const data = newFileList[0];
    const file = data?.originFileObj || data?.blobFile || data;

    if (!(file instanceof Blob)) {
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
                  <label htmlFor="">Description</label>
                  <input
                    type="text"
                    placeholder="Description"
                    {...register("description")}
                  />
                  <ErrorMessage message={errors.description?.message} />
                  <label htmlFor="">Rating</label>
                  <select
                    className="form-select"
                    {...register("rating", { required: "Rating is required" })}
                  >
                    <option value="">Select Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <ErrorMessage message={errors.description?.message} />
                </Card>
                <Card className="my-4">
                  <h3>Color</h3>

                  <label htmlFor="">Text Color</label>
                  <input
                    type="text"
                    placeholder="Text Color"
                    {...register("textColor")}
                  />
                  <ErrorMessage message={errors.textColor?.message} />

                  <label htmlFor="">Background Color</label>
                  <input
                    type="text"
                    placeholder="Background Color"
                    {...register("bgColor")}
                  />
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
