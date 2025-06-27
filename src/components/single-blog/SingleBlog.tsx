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
import { maxSizeInBytes } from "@/utils/constant";

const SingleBlog = () => {
  const [techstachData, setTechstachData] = useState<TechStackItemType[]>([]);
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
  } = useForm<SingleBlogFormData>({
    resolver: zodResolver(SingleBlogSchema),
    defaultValues: {
      description: "",
      details: "<p></p>",
      techStackId: "",
      title: "",
      image: "",
      createdBy: "",
    },
  });

  useEffect(() => {
    if (id) {
      getBlogById(id).then((res) => {
        if (res.success) {
          const data = res.data;
          setValue("title", data.title);
          setValue("description", data.description);
          setValue("image", import.meta.env.VITE_IMAGE_DOMAIN + data.image);
          setValue("details", data.details);
          setValue("techStackId", data.techStackId);
          setValue("createdBy", data.createdBy);
          console.log(editorRef.current);
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

  useEffect(() => {
    if (editorRef && editorRef.getData() !== watch("details")) {
      editorRef.setData(watch("details") || "");
    }
  }, [watch("details"), editorRef]);

  useEffect(() => {
    getAllTechStack({}).then((res) => {
      if (res.success) {
        setTechstachData(res.data.records);
      }
    });
  }, []);

  const onSubmit = async (data: SingleBlogFormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("techStackId", data.techStackId);
    formData.append("details", data.details);
    formData.append("createdBy", data.createdBy);
    if (id && !(data.image instanceof File)) {
      const blob = await getImageAsBlob(data.image);
      formData.append(`image`, blob);
    } else {
      formData.append(`image`, data.image);
    }

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

    if (file.size > maxSizeInBytes) {
      toast.error("File size must be 1MB or less.");
      setFileList([]);
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
            <Col md={12}>
              <Card>
                <h3>Media</h3>
                <label htmlFor="">Photo</label>
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
                  <h3>Blog Details</h3>

                  <label htmlFor="">Created By</label>
                  <input
                    type="text"
                    placeholder="Type product name here. . ."
                    {...register("createdBy")}
                  />
                  <ErrorMessage message={errors.createdBy?.message} />

                  <label htmlFor="">Tech Stack Name</label>
                  <div className="category-drop">
                    <Controller
                      name="techStackId"
                      control={control}
                      render={({ field }) => (
                        <Dropdown>
                          <DropdownToggle>
                            {techstachData.find((d) => d._id === field.value)
                              ?.name || "Select a Tech Stack"}{" "}
                            <FaCaretDown />
                          </DropdownToggle>
                          <DropdownMenu>
                            {techstachData.length ? (
                              techstachData.map((data) => (
                                <DropdownItem
                                  onClick={() => {
                                    field.onChange(data._id);
                                  }}
                                >
                                  {data.name}
                                </DropdownItem>
                              ))
                            ) : (
                              <DropdownItem onClick={() => field.onChange("")}>
                                No Data
                              </DropdownItem>
                            )}
                          </DropdownMenu>
                        </Dropdown>
                      )}
                    />
                  </div>
                  <ErrorMessage message={errors.techStackId?.message} />

                  <label htmlFor="">Title</label>
                  <input
                    type="text"
                    placeholder="Type product name here. . ."
                    {...register("title")}
                  />
                  <ErrorMessage message={errors.title?.message} />

                  <label htmlFor="">Description</label>
                  <textarea
                    placeholder="Type product description here. . ."
                    {...register("description")}
                  />
                  <ErrorMessage message={errors.description?.message} />

                  <label>Content</label>
                  {
                    <div>
                      <Controller
                        name="details"
                        control={control}
                        render={({ field }) => (
                          <CKEditor
                            editorUrl="https://cdn.ckeditor.com/4.22.1/full/ckeditor.js"
                            initData={
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: watch("details"),
                                }}
                              />
                            }
                            config={{
                              toolbar: "Full", // Full toolbar like in the image
                            }}
                            onInstanceReady={(event) => {
                              const editor = event.editor;
                              setEditRef(editor);
                              editor.on("change", () => {
                                field.onChange(editor.getData());
                              });
                            }}
                          />
                        )}
                      />
                    </div>
                  }
                  <ErrorMessage message={errors.details?.message} />
                </Card>
              </div>
            </Col>
          </Row>
        </Form>
      </section>
    </>
  );
};

export default SingleBlog;
