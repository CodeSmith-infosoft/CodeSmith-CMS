import { useEffect, useRef, useState } from "react";
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
import { FaCaretDown, FaPlus } from "react-icons/fa";
import { Uploader } from "rsuite";
import "rsuite/dist/rsuite.css";
import ErrorMessage from "../ErrorMessage";
import PageTitle from "../CommonComponents/PageTitle";
import { getImageAsBlob, toBase64 } from "@/utils/helper";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import addPortfolioSchema, {
  portfolioFormSchemaType,
} from "@/service/form-schema/portfolio.schema";
import {
  addPortfolio,
  updatePortfolio,
  getPortfolioById,
} from "@/service/asyncStore/action/portfolio";
import { TechStackItemType } from "@/types/techStackTypes";
import { getAllTechStack } from "@/service/asyncStore/action/techStack";

const SinglePortfolio = () => {
  const [fileList, setFileList] = useState<any>({
    banner: [],
    image: [],
  });
  const navigate = useNavigate();
  const { id } = useParams();
  // 💡 For Conclusion
  const [currentFeature, setCurrentFeature] = useState("");
  const [featureEdit, setFeatureEdit] = useState<null | number>(null);
  const featureRefs = useRef<any>({});
  const [editFeatureValue, setEditFeatureValue] = useState("");
  const [techstachData, setTechstachData] = useState<TechStackItemType[]>([]);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
    getValues,
    clearErrors,
  } = useForm<portfolioFormSchemaType>({
    resolver: zodResolver(addPortfolioSchema),
    defaultValues: {
      description: "",
      projectName: "",
      banner: "",
      features: [],
      image: "",
      techStackId: "",
    },
  });

  useEffect(() => {
    if (featureEdit !== null) {
      const ref = featureRefs.current[featureEdit];
      if (ref) {
        ref.focus();
      }
    }
  }, [featureEdit]);

  useEffect(() => {
    getAllTechStack({}).then((res) => {
      if (res.success) {
        setTechstachData(res.data.records);
      }
    });
  }, []);

  console.log(errors, getValues());

  useEffect(() => {
    if (id) {
      getPortfolioById(id).then((res) => {
        if (res.success) {
          const data = res.data;
          setValue("features", data.features);
          setValue("description", data.description);
          setValue("techStackId", data.techStackId);
          setValue("projectName", data.projectName);
          setValue("banner", import.meta.env.VITE_IMAGE_DOMAIN + data.banner);
          setValue("image", import.meta.env.VITE_IMAGE_DOMAIN + data.image);
          setFileList({
            image: [
              {
                url: import.meta.env.VITE_IMAGE_DOMAIN + data.image,
                name: data.companyLogo.split("/").at(-1),
              },
            ],
            banner: [
              {
                url: import.meta.env.VITE_IMAGE_DOMAIN + data.banner,
                name: data.mainImage.split("/").at(-1),
              },
            ],
          });
        }
      });
    }
  }, [id]);

  const onSubmit = async (data: portfolioFormSchemaType) => {
    const formData = new FormData();
    formData.append("techStackId", data.techStackId);
    formData.append("description", data.description);
    formData.append("projectName", data.projectName);
    data.features.forEach((item, index) => {
      formData.append(`features[${index}]`, item);
    });
    if (id && !(data.image instanceof File)) {
      const blob = await getImageAsBlob(data.image);
      formData.append(`image`, blob);
    } else {
      formData.append(`image`, data.image);
    }
    if (id && !(data.banner instanceof File)) {
      const blob = await getImageAsBlob(data.banner);
      formData.append(`banner`, blob);
    } else {
      formData.append(`banner`, data.banner);
    }

    const action = () =>
      id ? updatePortfolio(formData, id) : addPortfolio(formData);

    action().then((res) => {
      const toast2 = res.success ? toast.success : toast.error;
      toast2(res.message);
      if (res.success) {
        reset();
        navigate("/portfolio");
      }
    });
  };

  const handleFeildChange = async (
    newFileList: any,
    field: any,
    key: string
  ) => {
    const data = newFileList[0];
    const file = data?.originFileObj || data?.blobFile || data;

    if (!(file instanceof Blob)) {
      return;
    }

    // const image = new Image();
    // const objectUrl = URL.createObjectURL(file);

    const base64 = await toBase64(file);
    setFileList({ ...fileList, [key]: [{ ...data, url: base64 }] });
    field.onChange(file);
  };

  const addFeature = () => {
    if (currentFeature.trim()) {
      const current = getValues("features") || [];
      setValue("features", [...current, currentFeature]);
      setCurrentFeature("");
      clearErrors("features");
    }
  };

  const removeFeature = (index: number) => {
    setFeatureEdit(null);
    const current = getValues("features") || [];
    current.splice(index, 1);
    setValue("features", [...current]);
  };

  const handleFetureEdit = (index: number) => {
    const editedData = editFeatureValue;
    const cleaned = editedData.replace(/^•\s*/, "");
    const allFeatures = getValues("features");
    allFeatures.splice(index, 1, cleaned);
    setValue("features", allFeatures);
    handleCancelFetureEdit();
  };

  const handleCancelFetureEdit = () => {
    setEditFeatureValue("");
    setFeatureEdit(null);
  };

  return (
    <>
      <PageTitle
        title={`${id ? "Update" : "Add"} Portfolio`}
        subTitle="Portfolio"
        subRedirect="/portfolio"
        cancelBtn
        cancelPath="/portfolio"
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
                    name="image"
                    control={control}
                    render={({ field }) => (
                      <Uploader
                        listType="picture-text"
                        multiple={true}
                        action=""
                        accept="image/*"
                        fileList={fileList.image}
                        onChange={(fileList) =>
                          handleFeildChange(fileList, field, "image")
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
            <Col md={6}>
              <Card>
                <h3 className="mb-3">Banner</h3>
                <div className="file-upload">
                  <Controller
                    name="banner"
                    control={control}
                    render={({ field }) => (
                      <Uploader
                        listType="picture-text"
                        multiple={true}
                        action=""
                        accept="image/*"
                        fileList={fileList.banner}
                        onChange={(fileList) =>
                          handleFeildChange(fileList, field, "banner")
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
                <ErrorMessage message={errors.banner?.message} />
              </Card>
            </Col>
            <Col md={12}>
              <div className="general-information">
                <Card>
                  <h3>Project Info</h3>
                  <Row>
                    <Col md={6}>
                      <label htmlFor="">Project Name</label>
                      <input
                        type="text"
                        placeholder="Type product name here. . ."
                        {...register("projectName")}
                      />
                      <ErrorMessage message={errors.projectName?.message} />
                    </Col>
                    <Col md={6}>
                      <label htmlFor="">Tech Stack Name</label>
                      <div className="category-drop">
                        <Controller
                          name="techStackId"
                          control={control}
                          render={({ field }) => (
                            <Dropdown>
                              <DropdownToggle>
                                {techstachData.find(
                                  (d) => d._id === field.value
                                )?.name || "Select a Tech Stack"}{" "}
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
                                  <DropdownItem
                                    onClick={() => field.onChange("")}
                                  >
                                    No Data
                                  </DropdownItem>
                                )}
                              </DropdownMenu>
                            </Dropdown>
                          )}
                        />
                      </div>
                      <ErrorMessage message={errors.techStackId?.message} />
                    </Col>
                    <Col md={12}>
                      <label htmlFor="">Description</label>
                      <textarea
                        placeholder="Type description name here. . ."
                        {...register("description")}
                      />
                      <ErrorMessage message={errors.description?.message} />
                    </Col>
                  </Row>
                </Card>
              </div>
            </Col>
            <Col md={12}>
              <div className="general-information">
                <Card>
                  <h3 className="mb-3">Features</h3>
                  <div className="feature-input">
                    <input
                      type="text"
                      placeholder="Type product feature here. . ."
                      value={currentFeature}
                      onChange={(e) => setCurrentFeature(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addFeature()}
                    />
                    <div className="add-feature" onClick={addFeature}>
                      <FaPlus size={16} />
                    </div>
                  </div>

                  {watch("features").map((field, index) => (
                    <>
                      <div
                        key={field}
                        className="feature-item d-flex align-items-center mt-2 gap-2"
                      >
                        <input
                          type="text"
                          value={
                            featureEdit === index
                              ? editFeatureValue
                              : getValues(`features.${index}`)
                          }
                          disabled={featureEdit !== index}
                          ref={(el) => {
                            if (el) {
                              featureRefs.current[index] = el;
                            } else {
                              delete featureRefs.current[index];
                            }
                          }}
                          onChange={(e) => {
                            setEditFeatureValue(e.target.value);
                            clearErrors("features");
                          }}
                        />
                        {featureEdit === index ? (
                          <>
                            <button
                              type="button"
                              className="btn btn-sm btn-success"
                              onClick={() => handleFetureEdit(index)}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={handleCancelFetureEdit}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="btn btn-sm btn-success"
                              onClick={() => {
                                setFeatureEdit(index);
                                setEditFeatureValue(
                                  getValues(`features.${index}`)
                                );
                              }}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removeFeature(index)}
                            >
                              Remove
                            </button>
                          </>
                        )}
                      </div>
                      <ErrorMessage
                        message={errors.features?.[index]?.message}
                      />
                    </>
                  ))}
                  <ErrorMessage message={errors.features?.message} />
                </Card>
              </div>
            </Col>
          </Row>
        </Form>
      </section>
    </>
  );
};

export default SinglePortfolio;
