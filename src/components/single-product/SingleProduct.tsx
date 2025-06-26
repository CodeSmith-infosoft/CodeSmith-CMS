import { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
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
import { FaAngleDown, FaCaretDown, FaPlus } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { Uploader, DatePicker } from "rsuite";
import { z } from "zod";
import "rsuite/dist/rsuite.css";
import SingleProductSchema from "@/service/form-schema/blog.schema";
import ErrorMessage from "../ErrorMessage";
import PageTitle from "../CommonComponents/PageTitle";
import { RxCross2 } from "react-icons/rx";
import { getActiveSubCategoryList } from "@/service/asyncStore/action/caseStudy";
import { getImageAsBlob, toBase64 } from "@/utils/helper";
import {
  addSingleProduct,
  getProductByID,
  updateProduct,
} from "@/service/asyncStore/action/product";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { ProductVariantType } from "@/types/productDataTypes";

type SingleProductFormData = z.infer<typeof SingleProductSchema>;

const SingleProduct = () => {
  const [currentFeature, setCurrentFeature] = useState("");
  const [categoryData, setCategoryData] = useState<any>({});
  const [fileList, setFileList] = useState<any>([]);
  const navigate = useNavigate();
  const [featureEdit, setFeatureEdit] = useState<null | number>(null);
  const featureRefs = useRef<any>({});
  const [editFeatureValue, setEditFeatureValue] = useState("");
  const { id } = useParams();
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<SingleProductFormData>({
    resolver: zodResolver(SingleProductSchema),
    defaultValues: {
      productCategory: "",
      productSubCategory: "",
      isActiveProduct: true,
      sku: "",
      quantity: "",
      stock: "",
      hsnNumber: "",
      gstPercentage: "",
      productName: "",
      description: "",
      features: [],
      benefits: "",
      weightVariants: [
        {
          weightUnit: "GM",
          weightValue: "",
          price: "",
          mrp: "",
          discountPrice: "",
          startSaleOn: null,
          endSaleOn: null,
          saleStatus: false,
        },
      ],
      images: [],
    },
  });

  useEffect(() => {
    if (watch("features").length) {
      clearErrors("features");
    }
  }, [watch("features")]);

  useEffect(() => {
    if (id) {
      getProductByID(id).then((res) => {
        if (res.success) {
          const data = res.data;
          setValue("productCategory", data.category.name);
          setValue("productSubCategory", data.subCategoryId._id);
          setValue("isActiveProduct", data.isActive);
          setValue("sku", data.sku);
          setValue("stock", data.stock.toString());
          setValue("quantity", data.quantity.toString());
          setValue("hsnNumber", data.hsnCode.toString());
          setValue("gstPercentage", data.gst.split("%")[0]);
          setValue("productName", data.title);
          setValue("description", data.description);
          setValue("benefits", data.benefits);
          setValue("features", data.isFeatured);
          const weightData = data.variants.map(
            (variant: ProductVariantType) => ({
              weightUnit: variant.weight.split(" ")[1],
              weightValue: variant.weight.split(" ")[0],
              price: variant.price.toString(),
              mrp: variant.mrp.toString(),
              discountPrice: variant?.discountPrice?.toString() || "",
              startSaleOn: variant.startSaleOn
                ? new Date(variant.startSaleOn)
                : null,
              endSaleOn: variant.endSaleOn ? new Date(variant.endSaleOn) : null,
              saleStatus: variant.saleStatus,
            })
          );
          setValue("weightVariants", weightData);
          handleImageUpdateChange(data.image);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    if (featureEdit !== null) {
      const ref = featureRefs.current[featureEdit];
      if (ref) {
        ref.focus();
      }
    }
  }, [featureEdit]);

  const {
    fields: weightFields,
    append: appendWeight,
    remove: removeWeight,
  } = useFieldArray({
    control,
    name: "weightVariants",
  });

  useEffect(() => {
    getActiveSubCategoryList().then((res) => {
      if (res.success) {
        const result = res.data.reduce(
          (acc: any, cur: any) => ({
            ...acc,
            [cur.categoryName]: cur.subCategories,
          }),
          {}
        );
        setCategoryData(result);
      }
    });
  }, []);

  const addFeature = () => {
    if (currentFeature.trim()) {
      const current = getValues("features") || [];
      setValue("features", [...current, currentFeature]);
      setCurrentFeature("");
    }
  };

  const onSubmit = async (data: SingleProductFormData) => {
    const formData = new FormData();
    formData.append("title", data.productName);
    data.features.forEach((item, index) => {
      formData.append(`isFeatured[${index}]`, item);
    });
    formData.append("description", data.description);
    formData.append("benefits", data.benefits);
    formData.append("subCategoryId", data.productSubCategory);
    formData.append("sku", data.sku);
    formData.append("gst", data.gstPercentage);
    formData.append("hsnCode", data.hsnNumber);
    formData.append("stock", data.stock);
    formData.append("quantity", data.quantity);
    formData.append("isActive", data.isActiveProduct.toString());
    data.weightVariants.forEach((variant, index) => {
      formData.append(
        `variants[${index}][weight]`,
        `${variant.weightValue} ${variant.weightUnit}`
      );
      formData.append(`variants[${index}][price]`, variant.price);
      formData.append(`variants[${index}][mrp]`, variant.mrp);

      if (variant.discountPrice) {
        formData.append(
          `variants[${index}][discountPrice]`,
          variant.discountPrice
        );
      }
      if (variant.startSaleOn) {
        formData.append(
          `variants[${index}][startSaleOn]`,
          variant.startSaleOn.toISOString()
        );
      }
      if (variant.endSaleOn) {
        formData.append(
          `variants[${index}][endSaleOn]`,
          variant.endSaleOn.toISOString()
        );
      }
      if (variant.saleStatus) {
        formData.append(
          `variants[${index}][saleStatus]`,
          variant.saleStatus.toString()
        );
      }
    });

    await Promise.all(
      fileList.map(async (file: any) => {
        if (id) {
          if (file.blobFile) {
            formData.append(`image`, file.blobFile);
          } else {
            const blob = await getImageAsBlob(file.url);
            formData.append(`image`, blob);
          }
        } else {
          formData.append(`image`, file.blobFile);
        }
      })
    );

    if (id) {
      formData.delete("subCategoryId");
      formData.delete("sku");
    }

    const action = () =>
      id ? updateProduct(formData, id) : addSingleProduct(formData);
    action().then((res) => {
      const toast2 = res.success ? toast.success : toast.error;
      toast2(res.message);
      if (res.success) {
        reset();
        navigate("/product");
      }
    });
  };

  console.log(errors, getValues("images"));

  const removeFeature = (index: number) => {
    setFeatureEdit(null);
    const current = getValues("features") || [];
    current.splice(index, 1);
    setValue("features", [...current]);
  };

  const addWeightVariant = () => {
    appendWeight({
      weightUnit: "GM",
      weightValue: "",
      price: "",
      mrp: "",
      discountPrice: "",
      startSaleOn: null,
      endSaleOn: null,
      saleStatus: false,
    });
  };

  const handleFeildChange = async (newFileList: any, field: any) => {
    const formValue: Blob[] = [];
    const updatedList = await Promise.all(
      newFileList.map(async (fileWrapper: any) => {
        // Add preview URL if not present
        if (!fileWrapper.url && fileWrapper.blobFile) {
          const base64 = await toBase64(fileWrapper.blobFile);
          formValue.push(fileWrapper.blobFile);
          return { ...fileWrapper, url: base64, name: fileWrapper.name };
        }

        formValue.push(fileWrapper.url);
        return fileWrapper;
      })
    );
    setFileList(updatedList);
    field.onChange(formValue);
  };

  const handleImageUpdateChange = async (newFileList: any) => {
    const formValue: File | string[] = [];
    const updatedList = await Promise.all(
      newFileList.map((fileWrapper: string) => {
        formValue.push(import.meta.env.VITE_IMAGE_DOMAIN + fileWrapper);
        return {
          url: import.meta.env.VITE_IMAGE_DOMAIN + fileWrapper,
          name: fileWrapper.split("/").at(-1),
        };
      })
    );

    setFileList(updatedList);
    setValue("images", formValue);
  };

  const handleFetureEdit = (index: number) => {
    const editedData = editFeatureValue;
    const cleaned = editedData.replace(/^•\s*/, "");
    const allFeatures = getValues("features");
    allFeatures.splice(index, 1, cleaned);
    setValue("features", allFeatures);
    handleCancelFetureEdit()
  };

  const handleCancelFetureEdit = () => {
    setEditFeatureValue("")
    setFeatureEdit(null)
  };

  return (
    <>
      <PageTitle
        title={`${id ? "Update" : "Add"} single products`}
        subTitle="Products"
        subRedirect="/product"
        cancelBtn
        onSubmit={handleSubmit(onSubmit)}
      />
      <section className="single-product">
        <Form>
          <Row>
            <Col md={8}>
              <Row>
                <Col md={9}>
                  <Card>
                    <h3>Category</h3>
                    <Row>
                      <Col md={6}>
                        <label>Product Category</label>
                        <div className="category-drop">
                          <Controller
                            name="productCategory"
                            control={control}
                            render={({ field }) => (
                              <Dropdown>
                                <DropdownToggle>
                                  {field.value || "Select a category"}{" "}
                                  <FaCaretDown />
                                </DropdownToggle>
                                <DropdownMenu>
                                  {Object.keys(categoryData).length ? (
                                    Object.keys(categoryData).map((data) => (
                                      <DropdownItem
                                        onClick={() => {
                                          field.onChange(data);
                                          setValue("productSubCategory", "");
                                        }}
                                      >
                                        {data}
                                      </DropdownItem>
                                    ))
                                  ) : (
                                    <DropdownItem
                                      onClick={() => field.onChange("")}
                                    >
                                      No Dara
                                    </DropdownItem>
                                  )}
                                </DropdownMenu>
                              </Dropdown>
                            )}
                          />
                        </div>
                        <ErrorMessage
                          message={errors.productCategory?.message}
                        />
                      </Col>
                      <Col md={6}>
                        <label>Product Sub Category</label>
                        <div className="category-drop">
                          <Controller
                            name="productSubCategory"
                            control={control}
                            render={({ field }) => (
                              <Dropdown>
                                <DropdownToggle>
                                  {categoryData?.[
                                    getValues("productCategory")
                                  ]?.find((d: any) => d._id === field.value)
                                    ?.name || "Select a sub category"}{" "}
                                  <FaCaretDown />
                                </DropdownToggle>
                                <DropdownMenu>
                                  {categoryData?.[watch("productCategory")]
                                    ?.length ? (
                                    categoryData?.[
                                      getValues("productCategory")
                                    ].map((data: any) => (
                                      <DropdownItem
                                        onClick={() => field.onChange(data._id)}
                                      >
                                        {data.name}
                                      </DropdownItem>
                                    ))
                                  ) : (
                                    <DropdownItem
                                      onClick={() => field.onChange("Books")}
                                    >
                                      No sub category
                                    </DropdownItem>
                                  )}
                                </DropdownMenu>
                              </Dropdown>
                            )}
                          />
                        </div>
                        <ErrorMessage
                          message={errors.productSubCategory?.message}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col md={3}>
                  <div className="active-pro">
                    <Card>
                      <Controller
                        name="isActiveProduct"
                        control={control}
                        render={({ field }) => (
                          <label>
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                            />
                            <div className="toggle-switch">
                              <div
                                className={`toggle-knob ${
                                  field.value ? "active" : ""
                                }`}
                              />
                            </div>
                          </label>
                        )}
                      />
                      <h3 className="mb-0">active product</h3>
                    </Card>
                  </div>
                </Col>
              </Row>

              <div className="inventory">
                <Card>
                  <h3>Inventory</h3>
                  <Row>
                    <Col md={6}>
                      <label htmlFor="">SKU</label>
                      <input
                        type="text"
                        placeholder="Type product SKU here. . ."
                        {...register("sku")}
                      />
                      <ErrorMessage message={errors.sku?.message} />
                    </Col>
                    <Col md={6}>
                      <label htmlFor="">Stock</label>
                      <input
                        type="text"
                        placeholder="Type product stock here. . ."
                        {...register("stock")}
                      />
                      <ErrorMessage message={errors.stock?.message} />
                    </Col>
                    <Col md={6}>
                      <label htmlFor="">Quantity</label>
                      <input
                        type="text"
                        placeholder="Type product quantity here. . ."
                        {...register("quantity")}
                      />
                      <ErrorMessage message={errors.quantity?.message} />
                    </Col>
                    <Col md={6}>
                      <label htmlFor="">HSN Number</label>
                      <input
                        type="text"
                        placeholder="Type HSN Number. . ."
                        {...register("hsnNumber")}
                      />
                      <ErrorMessage message={errors.hsnNumber?.message} />
                    </Col>
                    <Col md={6}>
                      <label htmlFor="">GST%</label>
                      <input
                        type="text"
                        placeholder="Type GST. . ."
                        {...register("gstPercentage")}
                      />
                      <ErrorMessage message={errors.gstPercentage?.message} />
                    </Col>
                  </Row>
                </Card>
              </div>

              <div className="general-information">
                <Card>
                  <h3>General Information</h3>
                  <label htmlFor="">Product Name</label>
                  <input
                    type="text"
                    placeholder="Type product name here. . ."
                    {...register("productName")}
                  />
                  <ErrorMessage message={errors.productName?.message} />

                  <label htmlFor="">Description</label>
                  <textarea
                    placeholder="Type product description here. . ."
                    {...register("description")}
                  />
                  <ErrorMessage message={errors.description?.message} />

                  <label htmlFor="">Features</label>
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
                    <div
                      key={field}
                      className="feature-item d-flex align-items-center mt-2 gap-2"
                    >
                      <input
                        type="text"
                        value={featureEdit === index ? editFeatureValue : `• ${getValues(`features.${index}`)}`}
                        disabled={featureEdit !== index}
                        ref={(el) => {
                          if (el) {
                            featureRefs.current[index] = el;
                          } else {
                            delete featureRefs.current[index];
                          }
                        }}
                        onChange={(e) => setEditFeatureValue(e.target.value)}
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
                                `• ${getValues(`features.${index}`)}`
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
                  ))}
                  <ErrorMessage message={errors.features?.message} />

                  <label htmlFor="">Benefits</label>
                  <textarea
                    placeholder="Type product Benefits here. . ."
                    {...register("benefits")}
                  />
                  <ErrorMessage message={errors.benefits?.message} />
                </Card>
              </div>

              <div className="Weight">
                <Card>
                  <h3>Weight</h3>
                  {weightFields.map((field, index) => (
                    <div key={field.id} className="weight-variant mb-4">
                      <Row>
                        <Col>
                          <label htmlFor="">Weight Unit</label>
                          <Controller
                            name={`weightVariants.${index}.weightUnit`}
                            control={control}
                            render={({ field }) => (
                              <Dropdown>
                                <DropdownToggle>
                                  {field.value} <FaAngleDown />
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem
                                    onClick={() => field.onChange("GM")}
                                  >
                                    GM
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() => field.onChange("KG")}
                                  >
                                    KG
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() => field.onChange("Liter")}
                                  >
                                    Liter
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            )}
                          />
                        </Col>
                        <Col>
                          <label htmlFor="">Weight Value</label>
                          <input
                            type="text"
                            placeholder="100"
                            {...register(`weightVariants.${index}.weightValue`)}
                          />
                          <ErrorMessage
                            message={
                              errors.weightVariants?.[index]?.weightValue
                                ?.message
                            }
                          />
                        </Col>
                        <Col>
                          <label htmlFor="">MRP price</label>
                          <input
                            type="text"
                            placeholder="MRP price"
                            {...register(`weightVariants.${index}.mrp`)}
                          />
                          <ErrorMessage
                            message={
                              errors.weightVariants?.[index]?.mrp?.message
                            }
                          />
                        </Col>
                        <Col>
                          <label htmlFor="">Regular Price</label>
                          <input
                            type="text"
                            placeholder="Regular Price"
                            {...register(`weightVariants.${index}.price`)}
                          />
                          <ErrorMessage
                            message={
                              errors.weightVariants?.[index]?.price?.message
                            }
                          />
                        </Col>
                        <Col>
                          <label htmlFor="">Discount price</label>
                          <input
                            type="text"
                            placeholder="Discount price"
                            {...register(
                              `weightVariants.${index}.discountPrice`
                            )}
                          />
                          <ErrorMessage
                            message={
                              errors.weightVariants?.[index]?.discountPrice
                                ?.message
                            }
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={5}>
                          <label htmlFor="">Start Date</label>
                          <div className="weight-date">
                            <Controller
                              name={`weightVariants.${index}.startSaleOn`}
                              control={control}
                              render={({ field }) => (
                                <DatePicker
                                  format="yyyy-MM-dd HH:mm:ss"
                                  placeholder="Select Start Date"
                                  placement="topStart"
                                  value={field.value}
                                  onChange={(value) => field.onChange(value)}
                                />
                              )}
                            />
                          </div>
                          <ErrorMessage
                            message={
                              errors.weightVariants?.[index]?.startSaleOn
                                ?.message
                            }
                          />
                        </Col>
                        <Col md={5}>
                          <label htmlFor="">End Date</label>
                          <div className="weight-date">
                            <Controller
                              name={`weightVariants.${index}.endSaleOn`}
                              control={control}
                              render={({ field }) => (
                                <DatePicker
                                  format="yyyy-MM-dd HH:mm:ss"
                                  placeholder="Select End Date"
                                  placement="topStart"
                                  value={field.value}
                                  onChange={(value) => field.onChange(value)}
                                />
                              )}
                            />
                          </div>
                          <ErrorMessage
                            message={
                              errors.weightVariants?.[index]?.endSaleOn?.message
                            }
                          />
                        </Col>
                        <Col md={2}>
                          <label htmlFor="">Active</label>
                          <div className="active-weight">
                            <Card>
                              <Controller
                                name={`weightVariants.${index}.saleStatus`}
                                control={control}
                                render={({ field }) => (
                                  <label>
                                    <input
                                      type="checkbox"
                                      checked={field.value}
                                      onChange={field.onChange}
                                    />
                                    <div className="toggle-switch">
                                      <div
                                        className={`toggle-knob ${
                                          field.value ? "active" : ""
                                        }`}
                                      />
                                    </div>
                                  </label>
                                )}
                              />
                            </Card>
                          </div>
                        </Col>
                      </Row>
                      {weightFields.length > 1 && (
                        <Row>
                          <Col>
                            <div className="weight-add">
                              <button
                                type="button"
                                className="weight-add-btn remove"
                                onClick={() => removeWeight(index)}
                              >
                                <RxCross2 /> Remove
                              </button>
                            </div>
                          </Col>
                        </Row>
                      )}
                    </div>
                  ))}
                  <Row>
                    <Col>
                      <div className="weight-add">
                        <button
                          type="button"
                          className="weight-add-btn"
                          onClick={addWeightVariant}
                        >
                          <GoPlus size={20} /> Add Weight
                        </button>
                      </div>
                    </Col>
                  </Row>
                  <ErrorMessage message={errors.weightVariants?.message} />
                </Card>
              </div>
            </Col>

            <Col md={4}>
              <Card>
                <h3>Media</h3>
                <label htmlFor="">Photo</label>
                <div className="file-upload">
                  <Controller
                    name="images"
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
                <ErrorMessage message={errors.images?.message} />
              </Card>
            </Col>
          </Row>
        </Form>
      </section>
    </>
  );
};

export default SingleProduct;
