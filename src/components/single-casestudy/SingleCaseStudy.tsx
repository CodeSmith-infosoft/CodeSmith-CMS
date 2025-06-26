import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Col, Dropdown, Form, Row } from "react-bootstrap";
import { BsFileImageFill } from "react-icons/bs";
import { FaCaretDown, FaPlus } from "react-icons/fa";
import { Uploader } from "rsuite";
import "rsuite/dist/rsuite.css";
import ErrorMessage from "../ErrorMessage";
import PageTitle from "../CommonComponents/PageTitle";
import { getImageAsBlob, toBase64 } from "@/utils/helper";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import addCaseStudySchema, {
  caseStudyFormSchemaType,
} from "@/service/form-schema/casestudy.schema";
import { RxCross2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
import { allTechData } from "@/utils/constant";
import {
  addCaseStudy,
  getCaseStudyById,
  updateCaseStudy,
} from "@/service/asyncStore/action/caseStudy";

const SingleCaseStudy = () => {
  const [fileList, setFileList] = useState<any>({
    logo: [],
    main: [],
    color: [],
    typography: [],
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentProblem, setCurrentProblem] = useState("");
  const [problemEdit, setProblemEdit] = useState<null | number>(null);
  const [editProblemValue, setEditProblemValue] = useState("");
  const problemRefs = useRef<any>({});
  const [currentDev, setCurrentDev] = useState("");
  const [devEdit, setDevEdit] = useState<null | number>(null);
  const [editDevValue, setEditDevValue] = useState("");
  const devRefs = useRef<any>({});
  // 💡 For Challenges
  const [currentChallenge, setCurrentChallenge] = useState("");
  const [challengeEdit, setChallengeEdit] = useState<null | number>(null);
  const [editChallengeValue, setEditChallengeValue] = useState("");
  const challengeRefs = useRef<any>({});

  // 💡 For Conclusion
  const [currentConclusion, setCurrentConclusion] = useState("");
  const [conclusionEdit, setConclusionEdit] = useState<null | number>(null);
  const [editConclusionValue, setEditConclusionValue] = useState("");
  const conclusionRefs = useRef<any>({});

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
    getValues,
  } = useForm<caseStudyFormSchemaType>({
    resolver: zodResolver(addCaseStudySchema),
    defaultValues: {
      description: "",
      challenges: [],
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
      color: "",
      typography: "",
    },
  });

  useEffect(() => {
    if (problemEdit !== null) {
      const ref = problemRefs.current[problemEdit];
      if (ref) {
        ref.focus();
      }
    }
  }, [problemEdit]);

  useEffect(() => {
    if (devEdit !== null) {
      const ref = devRefs.current[devEdit];
      if (ref) {
        ref.focus();
      }
    }
  }, [devEdit]);

  // 👀 Focus when challengeEdit is set
  useEffect(() => {
    if (challengeEdit !== null) {
      const ref = challengeRefs.current[challengeEdit];
      if (ref) {
        ref.focus();
      }
    }
  }, [challengeEdit]);

  // 👀 Focus when conclusionEdit is set
  useEffect(() => {
    if (conclusionEdit !== null) {
      const ref = conclusionRefs.current[conclusionEdit];
      if (ref) {
        ref.focus();
      }
    }
  }, [conclusionEdit]);

  const {
    fields: solutionFields,
    append: appendSolution,
    remove: removeSolution,
  } = useFieldArray({
    control,
    name: "solution",
  });

  useEffect(() => {
    if (id) {
      getCaseStudyById(id).then((res) => {
        if (res.success) {
          const data = res.data;
          setValue("challenges", data.challenges);
          setValue("description", data.description);
          setValue(
            "companyLogo",
            import.meta.env.VITE_IMAGE_DOMAIN + data.companyLogo
          );
          setValue("conclusion", data.conclusion);
          setValue("devProcess", data.devProcess);
          setValue("duration", data.duration);
          setValue("industry", data.industry);
          setValue(
            "mainImage",
            import.meta.env.VITE_IMAGE_DOMAIN + data.mainImage
          );
          setValue("platform", data.platform);
          setValue("problem", data.problem);
          setValue("projectName", data.projectName);
          setValue("solution", data.solution);
          setValue("color", import.meta.env.VITE_IMAGE_DOMAIN + data.color);
          setValue("tech", data.tech);
          setValue(
            "typography",
            import.meta.env.VITE_IMAGE_DOMAIN + data.typography
          );
          setFileList({
            logo: [
              {
                url: import.meta.env.VITE_IMAGE_DOMAIN + data.companyLogo,
                name: data.companyLogo.split("/").at(-1),
              },
            ],
            main: [
              {
                url: import.meta.env.VITE_IMAGE_DOMAIN + data.mainImage,
                name: data.mainImage.split("/").at(-1),
              },
            ],
            color: [
              {
                url: import.meta.env.VITE_IMAGE_DOMAIN + data.color,
                name: data.color.split("/").at(-1),
              },
            ],
            typography: [
              {
                url: import.meta.env.VITE_IMAGE_DOMAIN + data.typography,
                name: data.typography.split("/").at(-1),
              },
            ],
          });
        }
      });
    }
  }, [id]);

  const onSubmit = async (data: caseStudyFormSchemaType) => {
    const formData = new FormData();
    formData.append("duration", data.duration);
    formData.append("description", data.description);
    formData.append("projectName", data.projectName);
    formData.append("industry", data.industry);
    formData.append("platform", data.platform);
    data.problem.forEach((item, index) => {
      formData.append(`problem[${index}]`, item);
    });
    data.tech.forEach((item, index) => {
      formData.append(`tech[${index}]`, item);
    });
    data.devProcess.forEach((item, index) => {
      formData.append(`devProcess[${index}]`, item);
    });
    data.challenges.forEach((item, index) => {
      formData.append(`challenges[${index}]`, item);
    });
    data.conclusion.forEach((item, index) => {
      formData.append(`conclusion[${index}]`, item);
    });
    data.solution.forEach((variant, index) => {
      formData.append(`solution[${index}][h]`, variant.h);
      formData.append(`solution[${index}][p]`, variant.p);
    });
    if (id && !(data.companyLogo instanceof File)) {
      const blob = await getImageAsBlob(data.companyLogo);
      formData.append(`companyLogo`, blob);
    } else {
      formData.append(`companyLogo`, data.companyLogo);
    }
    if (id && !(data.mainImage instanceof File)) {
      const blob = await getImageAsBlob(data.mainImage);
      formData.append(`mainImage`, blob);
    } else {
      formData.append(`mainImage`, data.mainImage);
    }
    if (id && !(data.color instanceof File)) {
      const blob = await getImageAsBlob(data.color);
      formData.append(`color`, blob);
    } else {
      formData.append(`color`, data.color);
    }
    if (id && !(data.typography instanceof File)) {
      const blob = await getImageAsBlob(data.typography);
      formData.append(`typography`, blob);
    } else {
      formData.append(`typography`, data.typography);
    }

    const action = () =>
      id ? updateCaseStudy(formData, id) : addCaseStudy(formData);

    action().then((res) => {
      const toast2 = res.success ? toast.success : toast.error;
      toast2(res.message);
      if (res.success) {
        reset();
        navigate("/casestudy");
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

  const addProblem = () => {
    if (currentProblem.trim()) {
      const current = getValues("problem") || [];
      setValue("problem", [...current, currentProblem]);
      setCurrentProblem("");
    }
  };

  const removeProblem = (index: number) => {
    setProblemEdit(null);
    const current = getValues("problem") || [];
    current.splice(index, 1);
    setValue("problem", [...current]);
  };

  const handleProblemEdit = (index: number) => {
    const editedData = editProblemValue;
    const cleaned = editedData.replace(/^•\s*/, "");
    const allFeatures = getValues("problem");
    allFeatures.splice(index, 1, cleaned);
    setValue("problem", allFeatures);
    handleCancelProblemEdit();
  };

  const handleCancelProblemEdit = () => {
    setEditProblemValue("");
    setProblemEdit(null);
  };

  const addDev = () => {
    if (currentDev.trim()) {
      const current = getValues("devProcess") || [];
      setValue("devProcess", [...current, currentDev]);
      setCurrentDev("");
    }
  };

  const removeDev = (index: number) => {
    setDevEdit(null);
    const current = getValues("devProcess") || [];
    current.splice(index, 1);
    setValue("devProcess", [...current]);
  };

  const handleDevEdit = (index: number) => {
    const editedData = editDevValue;
    const cleaned = editedData.replace(/^•\s*/, "");
    const allFeatures = getValues("devProcess");
    allFeatures.splice(index, 1, cleaned);
    setValue("devProcess", allFeatures);
    handleCancelDevEdit();
  };

  const handleCancelDevEdit = () => {
    setEditDevValue("");
    setDevEdit(null);
  };

  const addChallenge = () => {
    if (currentChallenge.trim()) {
      const current = getValues("challenges") || [];
      setValue("challenges", [...current, currentChallenge]);
      setCurrentChallenge("");
    }
  };

  const removeChallenge = (index: number) => {
    setChallengeEdit(null);
    const current = getValues("challenges") || [];
    current.splice(index, 1);
    setValue("challenges", [...current]);
  };

  const handleChallengeEdit = (index: number) => {
    const editedData = editChallengeValue;
    const cleaned = editedData.replace(/^•\s*/, "");
    const all = getValues("challenges");
    all.splice(index, 1, cleaned);
    setValue("challenges", all);
    handleCancelChallengeEdit();
  };

  const handleCancelChallengeEdit = () => {
    setEditChallengeValue("");
    setChallengeEdit(null);
  };

  const addConclusion = () => {
    if (currentConclusion.trim()) {
      const current = getValues("conclusion") || [];
      setValue("conclusion", [...current, currentConclusion]);
      setCurrentConclusion("");
    }
  };

  const removeConclusion = (index: number) => {
    setConclusionEdit(null);
    const current = getValues("conclusion") || [];
    current.splice(index, 1);
    setValue("conclusion", [...current]);
  };

  const handleConclusionEdit = (index: number) => {
    const editedData = editConclusionValue;
    const cleaned = editedData.replace(/^•\s*/, "");
    const all = getValues("conclusion");
    all.splice(index, 1, cleaned);
    setValue("conclusion", all);
    handleCancelConclusionEdit();
  };

  const handleCancelConclusionEdit = () => {
    setEditConclusionValue("");
    setConclusionEdit(null);
  };

  const addWeightVariant = () => {
    appendSolution({
      p: "",
      h: "",
    });
  };

  return (
    <>
      <PageTitle
        title={`${id ? "Update" : "Add"} CaseStudy`}
        subTitle="CaseStudy"
        subRedirect="/casestudy"
        cancelBtn
        cancelPath="/casestudy"
        onSubmit={handleSubmit(onSubmit)}
      />
      <section className="single-product">
        <Form>
          <Row>
            <Col md={6}>
              <Card>
                <h3>Company Images</h3>
                <label htmlFor="">Company Logo</label>
                <div className="file-upload">
                  <Controller
                    name="companyLogo"
                    control={control}
                    render={({ field }) => (
                      <Uploader
                        listType="picture-text"
                        multiple={true}
                        action=""
                        accept="image/*"
                        fileList={fileList.logo}
                        onChange={(fileList) =>
                          handleFeildChange(fileList, field, "logo")
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
                <ErrorMessage message={errors.companyLogo?.message} />

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
                        fileList={fileList.main}
                        onChange={(fileList) =>
                          handleFeildChange(fileList, field, "main")
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
                <h3>Typography Images</h3>
                <label htmlFor="">Color Image</label>
                <div className="file-upload">
                  <Controller
                    name="color"
                    control={control}
                    render={({ field }) => (
                      <Uploader
                        listType="picture-text"
                        multiple={true}
                        action=""
                        accept="image/*"
                        fileList={fileList.color}
                        onChange={(fileList) =>
                          handleFeildChange(fileList, field, "color")
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
                <ErrorMessage message={errors.color?.message} />

                <label htmlFor="">Typography Image</label>
                <div className="file-upload">
                  <Controller
                    name="typography"
                    control={control}
                    render={({ field }) => (
                      <Uploader
                        listType="picture-text"
                        multiple={true}
                        action=""
                        accept="image/*"
                        fileList={fileList.typography}
                        onChange={(fileList) =>
                          handleFeildChange(fileList, field, "typography")
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
                <ErrorMessage message={errors.typography?.message} />
              </Card>
            </Col>
            <Col md={12}>
              <div className="general-information">
                <Card>
                  <h3>Project Info</h3>
                  <Row>
                    <Col md={4}>
                      <label htmlFor="">Platform</label>
                      <input
                        type="text"
                        placeholder="Type platform name here. . ."
                        {...register("platform")}
                      />
                      <ErrorMessage message={errors.platform?.message} />
                    </Col>
                    <Col md={4}>
                      <label htmlFor="">Duration</label>
                      <input
                        type="text"
                        placeholder="Type duration name here. . ."
                        {...register("duration")}
                      />
                      <ErrorMessage message={errors.duration?.message} />
                    </Col>
                    <Col md={4}>
                      <label htmlFor="">Industry</label>
                      <input
                        type="text"
                        placeholder="Type industry name here. . ."
                        {...register("industry")}
                      />
                      <ErrorMessage message={errors.industry?.message} />
                    </Col>
                  </Row>
                </Card>
              </div>
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
                  <textarea
                    placeholder="Type product name here. . ."
                    {...register("description")}
                  />
                  <ErrorMessage message={errors.description?.message} />
                </Card>
              </div>
            </Col>
            <Col md={12}>
              <div className="general-information">
                <Card>
                  <h3 className="mb-3">Problem Details</h3>
                  <div className="feature-input">
                    <textarea
                      placeholder="Type problem details here. . ."
                      value={currentProblem}
                      onChange={(e) => setCurrentProblem(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addProblem()}
                    />
                    <div className="add-feature" onClick={addProblem}>
                      <FaPlus size={16} />
                    </div>
                  </div>

                  {watch("problem").map((field, index) => (
                    <div
                      key={field}
                      className="feature-item d-flex align-items-center mt-2 gap-2"
                    >
                      <textarea
                        value={
                          problemEdit === index
                            ? editProblemValue
                            : getValues(`problem.${index}`)
                        }
                        disabled={problemEdit !== index}
                        ref={(el) => {
                          if (el) {
                            problemRefs.current[index] = el;
                          } else {
                            delete problemRefs.current[index];
                          }
                        }}
                        onChange={(e) => setEditProblemValue(e.target.value)}
                      />
                      {problemEdit === index ? (
                        <>
                          <button
                            type="button"
                            className="btn btn-sm btn-success"
                            onClick={() => handleProblemEdit(index)}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={handleCancelProblemEdit}
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
                              setProblemEdit(index);
                              setEditProblemValue(
                                getValues(`problem.${index}`)
                              );
                            }}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeProblem(index)}
                          >
                            Remove
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                  <ErrorMessage message={errors.problem?.message} />
                </Card>
              </div>
            </Col>
            <Col md={12}>
              <div className="general-information">
                <Card>
                  <h3>Solution</h3>
                  {solutionFields.map((field, index) => (
                    <div key={field.id} className="weight-variant mb-4">
                      <Row>
                        <Col md={3}>
                          <label htmlFor="">Heading</label>
                          <textarea
                            placeholder="Type heading name here. . ."
                            {...register(`solution.${index}.h`)}
                          />
                          <ErrorMessage
                            message={errors.solution?.[index]?.h?.message}
                          />
                        </Col>
                        <Col md={9}>
                          <label htmlFor="">Content</label>
                          <textarea
                            placeholder="Type content name here. . ."
                            {...register(`solution.${index}.p`)}
                          />
                          <ErrorMessage
                            message={errors.solution?.[index]?.p?.message}
                          />
                        </Col>
                      </Row>
                      {solutionFields.length > 1 && (
                        <Row>
                          <Col>
                            <div className="weight-add">
                              <button
                                type="button"
                                className="weight-add-btn remove"
                                onClick={() => removeSolution(index)}
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
                          <GoPlus size={20} /> Add Solution
                        </button>
                      </div>
                    </Col>
                  </Row>
                  <ErrorMessage message={errors.solution?.message} />
                </Card>
              </div>
            </Col>
            <Col md={12}>
              <div className="general-information">
                <Card>
                  <h3 className="mb-3">Tech Stack & Tools</h3>
                  <div className="category-drop">
                    <Controller
                      name="tech"
                      control={control}
                      render={({ field }) => {
                        const [searchTerm, setSearchTerm] = useState("");
                        const [selectedItems, setSelectedItems] = useState<
                          string[]
                        >(field.value || []);
                        const filteredData = useMemo(() => {
                          return allTechData.filter((data) =>
                            data.title
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          );
                        }, [searchTerm, allTechData]);

                        const toggleItem = (title: string) => {
                          const updated = selectedItems.includes(title)
                            ? selectedItems.filter((item) => item !== title)
                            : [...selectedItems, title];
                          setSelectedItems(updated);
                          field.onChange(updated);
                        };

                        return (
                          <Dropdown className="banner-dropdown">
                            <Dropdown.Toggle>
                              {selectedItems.length
                                ? selectedItems.join(", ")
                                : "Select a Tech Stack"}{" "}
                              <FaCaretDown />
                            </Dropdown.Toggle>

                            <Dropdown.Menu
                              style={{
                                maxHeight: "250px",
                                overflowY: "auto",
                                padding: "10px",
                              }}
                            >
                              <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                              />

                              {filteredData.length ? (
                                filteredData.map((data: any) => (
                                  <Dropdown.Item
                                    key={data.title}
                                    onClick={() => toggleItem(data.title)}
                                    active={selectedItems.includes(data.title)}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={selectedItems.includes(
                                        data.title
                                      )}
                                      readOnly
                                      className="me-2 multi-select-check"
                                    />
                                    {data.title}
                                  </Dropdown.Item>
                                ))
                              ) : (
                                <Dropdown.Item disabled>
                                  No Data Found
                                </Dropdown.Item>
                              )}
                            </Dropdown.Menu>
                          </Dropdown>
                        );
                      }}
                    />
                  </div>
                  <ErrorMessage message={errors.tech?.message} />
                </Card>
              </div>
            </Col>
            <Col md={12}>
              <div className="general-information">
                <Card>
                  <h3>Dev Process</h3>
                  <label htmlFor="">Description</label>
                  <div className="feature-input">
                    <input
                      type="text"
                      placeholder="Type dev details here. . ."
                      value={currentDev}
                      onChange={(e) => setCurrentDev(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addDev()}
                    />
                    <div className="add-feature" onClick={addDev}>
                      <FaPlus size={16} />
                    </div>
                  </div>

                  {watch("devProcess").map((field, index) => (
                    <div
                      key={field}
                      className="feature-item d-flex align-items-center mt-2 gap-2"
                    >
                      <input
                        type="text"
                        value={
                          devEdit === index
                            ? editDevValue
                            : getValues(`devProcess.${index}`)
                        }
                        disabled={devEdit !== index}
                        ref={(el) => {
                          if (el) {
                            devRefs.current[index] = el;
                          } else {
                            delete devRefs.current[index];
                          }
                        }}
                        onChange={(e) => setEditDevValue(e.target.value)}
                      />
                      {devEdit === index ? (
                        <>
                          <button
                            type="button"
                            className="btn btn-sm btn-success"
                            onClick={() => handleDevEdit(index)}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={handleCancelDevEdit}
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
                              setDevEdit(index);
                              setEditDevValue(getValues(`devProcess.${index}`));
                            }}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeDev(index)}
                          >
                            Remove
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                  <ErrorMessage message={errors.devProcess?.message} />
                </Card>
              </div>
            </Col>
            <Col md={12}>
              <div className="general-information">
                <Card>
                  <h3 className="mb-3">Challenges</h3>
                  <div className="feature-input">
                    <textarea
                      placeholder="Type challenge here. . ."
                      value={currentChallenge}
                      onChange={(e) => setCurrentChallenge(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addChallenge()}
                    />
                    <div className="add-feature" onClick={addChallenge}>
                      <FaPlus size={16} />
                    </div>
                  </div>

                  {watch("challenges").map((field, index) => (
                    <div
                      key={field}
                      className="feature-item d-flex align-items-center mt-2 gap-2"
                    >
                      <textarea
                        value={
                          challengeEdit === index
                            ? editChallengeValue
                            : getValues(`challenges.${index}`)
                        }
                        disabled={challengeEdit !== index}
                        ref={(el) => {
                          if (el) {
                            challengeRefs.current[index] = el;
                          } else {
                            delete challengeRefs.current[index];
                          }
                        }}
                        onChange={(e) => setEditChallengeValue(e.target.value)}
                      />
                      {challengeEdit === index ? (
                        <>
                          <button
                            type="button"
                            className="btn btn-sm btn-success"
                            onClick={() => handleChallengeEdit(index)}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={handleCancelChallengeEdit}
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
                              setChallengeEdit(index);
                              setEditChallengeValue(
                                getValues(`challenges.${index}`)
                              );
                            }}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeChallenge(index)}
                          >
                            Remove
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                  <ErrorMessage message={errors.challenges?.message} />
                </Card>
              </div>
            </Col>
            <Col md={12}>
              <div className="general-information">
                <Card>
                  <h3 className="mb-3">Conclusion</h3>
                  <div className="feature-input">
                    <textarea
                      placeholder="Type conclusion here. . ."
                      value={currentConclusion}
                      onChange={(e) => setCurrentConclusion(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addConclusion()}
                    />
                    <div className="add-feature" onClick={addConclusion}>
                      <FaPlus size={16} />
                    </div>
                  </div>

                  {watch("conclusion").map((field, index) => (
                    <div
                      key={field}
                      className="feature-item d-flex align-items-center mt-2 gap-2"
                    >
                      <textarea
                        value={
                          conclusionEdit === index
                            ? editConclusionValue
                            : getValues(`conclusion.${index}`)
                        }
                        disabled={conclusionEdit !== index}
                        ref={(el) => {
                          if (el) {
                            conclusionRefs.current[index] = el;
                          } else {
                            delete conclusionRefs.current[index];
                          }
                        }}
                        onChange={(e) => setEditConclusionValue(e.target.value)}
                      />
                      {conclusionEdit === index ? (
                        <>
                          <button
                            type="button"
                            className="btn btn-sm btn-success"
                            onClick={() => handleConclusionEdit(index)}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={handleCancelConclusionEdit}
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
                              setConclusionEdit(index);
                              setEditConclusionValue(
                                getValues(`conclusion.${index}`)
                              );
                            }}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeConclusion(index)}
                          >
                            Remove
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                  <ErrorMessage message={errors.conclusion?.message} />
                </Card>
              </div>
            </Col>
          </Row>
        </Form>
      </section>
    </>
  );
};

export default SingleCaseStudy;
