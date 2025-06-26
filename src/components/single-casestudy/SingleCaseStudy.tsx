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
import { FaCaretDown } from "react-icons/fa";
import { Uploader } from "rsuite";
import "rsuite/dist/rsuite.css";
import { SingleBlogFormData } from "@/service/form-schema/blog.schema";
import ErrorMessage from "../ErrorMessage";
import PageTitle from "../CommonComponents/PageTitle";
import { getImageAsBlob, toBase64 } from "@/utils/helper";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getAllTechStack } from "@/service/asyncStore/action/techStack";
import { TechStackItemType } from "@/types/techStackTypes";
import { CKEditor } from "ckeditor4-react";
import SingleBlogSchema from "@/service/form-schema/blog.schema";
import {
  addBlog,
  getBlogById,
  updateBlog,
} from "@/service/asyncStore/action/blog";
import addCaseStudySchema, {
  caseStudyFormSchemaType,
} from "@/service/form-schema/casestudy.schema";

const SingleCaseStudy = () => {
  const [fileList, setFileList] = useState<any>([]);
  const navigate = useNavigate();
  const [editorRef, setEditRef] = useState<any>(null);
  const { id } = useParams();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm<caseStudyFormSchemaType>({
    resolver: zodResolver(addCaseStudySchema),
    defaultValues: {
      description: "",
      challenges: [],
      color: [],
      companyLogo: "",
      conclusion: [],
      devProcess: [],
      duration: "",
      industry: "",
      mainImage: "",
      platform: "",
      problem: [],
      projectName: "",
      solution: [],
      tech: [],
      typography: [],
    },
  });

  useEffect(() => {
    if (id) {
      getBlogById(id).then((res) => {
        if (res.success) {
          const data = res.data;
          // setValue("title", data.title);
          // setValue("description", data.description);
          // setValue("image", import.meta.env.VITE_IMAGE_DOMAIN + data.image);
          // setValue("details", data.details);
          // setValue("techStackId", data.techStackId);
          // setValue("createdBy", data.createdBy);
          // console.log(editorRef.current);
          // setFileList([
          //   {
          //     url: import.meta.env.VITE_IMAGE_DOMAIN + data.image,
          //     name: data.image.split("/").at(-1),
          //   },
          // ]);
        }
      });
    }
  }, [id]);

  const onSubmit = async (data: caseStudyFormSchemaType) => {
    const formData = new FormData();
    // formData.append("title", data.title);
    formData.append("description", data.description);
    // formData.append("techStackId", data.techStackId);
    // formData.append("details", data.details);
    // formData.append("createdBy", data.createdBy);
    // if (id && !(data.image instanceof File)) {
    //   const blob = await getImageAsBlob(data.image);
    //   formData.append(`image`, blob);
    // } else {
    //   formData.append(`image`, data.image);
    // }

    const action = () => (id ? updateBlog(formData, id) : addBlog(formData));

    action().then((res) => {
      const toast2 = res.success ? toast.success : toast.error;
      toast2(res.message);
      if (res.success) {
        reset();
        navigate("/blog");
      }
    });
  };

  const handleFeildChange = async (newFileList: any, field: any) => {
    const data = newFileList[0];
    const file = data?.originFileObj || data?.blobFile || data;

    if (!(file instanceof Blob)) {
      return;
    }

    // const image = new Image();
    // const objectUrl = URL.createObjectURL(file);

    const base64 = await toBase64(file);
    setFileList([{ ...data, url: base64 }]);
    field.onChange(file);
  };

  return (
    <>
      <PageTitle
        title={`${id ? "Update" : "Add"} single blog`}
        subTitle="Blog"
        subRedirect="/blog"
        cancelBtn
        cancelPath="/blog"
        onSubmit={handleSubmit(onSubmit)}
      />
      <section className="single-product">
        <Form>
          <Row>
            <Col md={6}>
              <Card>
                <h3 className="mb-3">Company Logo</h3>
                <div className="file-upload">
                  <Controller
                    name="mainImage"
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
                <ErrorMessage message={errors.mainImage?.message} />
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <h3>Media</h3>
                <label htmlFor="">Photo</label>
                <div className="file-upload">
                  <Controller
                    name="mainImage"
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
                <ErrorMessage message={errors.mainImage?.message} />
                <label htmlFor="">Platform</label>
                <input
                  type="text"
                  placeholder="Type platform name here. . ."
                  {...register("platform")}
                />
                <ErrorMessage message={errors.platform?.message} />
                <label htmlFor="">Duration</label>
                <input
                  type="text"
                  placeholder="Type duration name here. . ."
                  {...register("duration")}
                />
                <ErrorMessage message={errors.duration?.message} />
                <label htmlFor="">Industry</label>
                <input
                  type="text"
                  placeholder="Type industry name here. . ."
                  {...register("industry")}
                />
                <ErrorMessage message={errors.industry?.message} />
              </Card>
            </Col>
            <Col md={12}>
              <div className="general-information">
                <Card>
                  <h3>Project Name</h3>

                  <label htmlFor="">Project Name</label>
                  <input
                    type="text"
                    placeholder="Type product name here. . ."
                    {...register("projectName")}
                  />
                  <ErrorMessage message={errors.projectName?.message} />

                  <label htmlFor="">Description</label>
                  <input
                    type="text"
                    placeholder="Type product name here. . ."
                    {...register("description")}
                  />
                  <ErrorMessage message={errors.description?.message} />
                </Card>
              </div>
              <div className="general-information">
                <Card></Card>
              </div>
            </Col>
          </Row>
        </Form>
      </section>
    </>
  );
};

export default SingleCaseStudy;
