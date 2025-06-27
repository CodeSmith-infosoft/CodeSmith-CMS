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
import { FaCaretDown, FaPlus } from "react-icons/fa";
import "rsuite/dist/rsuite.css";
import ErrorMessage from "../ErrorMessage";
import PageTitle from "../CommonComponents/PageTitle";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import JobPostingSchema, {
  JobPostingFormData,
} from "@/service/form-schema/career.schema";
import { TechStackItemType } from "@/types/techStackTypes";
import { getAllTechStack } from "@/service/asyncStore/action/techStack";
import {
  addCareer,
  updateCareer,
  getCareerById,
} from "@/service/asyncStore/action/career";

const SingleCareer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // Benefits
  const [currentBenefit, setCurrentBenefit] = useState("");
  const [benefitEdit, setBenefitEdit] = useState<null | number>(null);
  const [editBenefitValue, setEditBenefitValue] = useState("");
  const benefitRefs = useRef<any>({});

  // Role
  const [currentRole, setCurrentRole] = useState("");
  const [roleEdit, setRoleEdit] = useState<null | number>(null);
  const [editRoleValue, setEditRoleValue] = useState("");
  const roleRefs = useRef<any>({});

  // Skills
  const [currentSkill, setCurrentSkill] = useState("");
  const [skillEdit, setSkillEdit] = useState<null | number>(null);
  const [editSkillValue, setEditSkillValue] = useState("");
  const skillRefs = useRef<any>({});
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
  } = useForm<JobPostingFormData>({
    resolver: zodResolver(JobPostingSchema),
    defaultValues: {
      benefits: [],
      experience: "",
      jobTitle: "",
      location: "",
      ofcTime: "",
      qualification: "",
      role: [],
      skills: [],
      techStackId: "",
      vacancy: 1,
    },
  });

  useEffect(() => {
    getAllTechStack({}).then((res) => {
      if (res.success) {
        setTechstachData(res.data.records);
      }
    });
  }, []);

  useEffect(() => {
    if (benefitEdit !== null) {
      const ref = benefitRefs.current[benefitEdit];
      ref?.focus();
    }
  }, [benefitEdit]);

  useEffect(() => {
    if (roleEdit !== null) {
      const ref = roleRefs.current[roleEdit];
      ref?.focus();
    }
  }, [roleEdit]);

  useEffect(() => {
    if (skillEdit !== null) {
      const ref = skillRefs.current[skillEdit];
      ref?.focus();
    }
  }, [skillEdit]);

  console.log(errors, getValues());

  useEffect(() => {
    if (id) {
      getCareerById(id).then((res) => {
        if (res.success) {
          const data = res.data;
          setValue("benefits", data.benefits);
          setValue("experience", data.experience);
          setValue("jobTitle", data.jobTitle);
          setValue("location", data.location);
          setValue("ofcTime", data.ofcTime);
          setValue("qualification", data.qualification);
          setValue("role", data.role);
          setValue("skills", data.skills);
          setValue("techStackId", data.techStackId);
          setValue("vacancy", data.vacancy);
        }
      });
    }
  }, [id]);

  const onSubmit = async (data: JobPostingFormData) => {
    const action = () => (id ? updateCareer(data, id) : addCareer(data));

    action().then((res) => {
      const toast2 = res.success ? toast.success : toast.error;
      toast2(res.message);
      if (res.success) {
        reset();
        navigate("/career");
      }
    });
  };

  const addBenefit = () => {
    if (currentBenefit.trim()) {
      const current = getValues("benefits") || [];
      setValue("benefits", [...current, currentBenefit]);
      setCurrentBenefit("");
      clearErrors("benefits");
    }
  };

  const removeBenefit = (index: number) => {
    setBenefitEdit(null);
    const current = getValues("benefits") || [];
    current.splice(index, 1);
    setValue("benefits", [...current]);
  };

  const handleBenefitEdit = (index: number) => {
    const edited = editBenefitValue.replace(/^•\s*/, "");
    const current = getValues("benefits");
    current.splice(index, 1, edited);
    setValue("benefits", current);
    handleCancelBenefitEdit();
  };

  const handleCancelBenefitEdit = () => {
    setEditBenefitValue("");
    setBenefitEdit(null);
  };

  const addRole = () => {
    if (currentRole.trim()) {
      const current = getValues("role") || [];
      setValue("role", [...current, currentRole]);
      setCurrentRole("");
      clearErrors("role");
    }
  };

  const removeRole = (index: number) => {
    setRoleEdit(null);
    const current = getValues("role") || [];
    current.splice(index, 1);
    setValue("role", [...current]);
  };

  const handleRoleEdit = (index: number) => {
    const edited = editRoleValue.replace(/^•\s*/, "");
    const current = getValues("role");
    current.splice(index, 1, edited);
    setValue("role", current);
    handleCancelRoleEdit();
  };

  const handleCancelRoleEdit = () => {
    setEditRoleValue("");
    setRoleEdit(null);
  };

  const addSkill = () => {
    if (currentSkill.trim()) {
      const current = getValues("skills") || [];
      setValue("skills", [...current, currentSkill]);
      setCurrentSkill("");
      clearErrors("skills");
    }
  };

  const removeSkill = (index: number) => {
    setSkillEdit(null);
    const current = getValues("skills") || [];
    current.splice(index, 1);
    setValue("skills", [...current]);
  };

  const handleSkillEdit = (index: number) => {
    const edited = editSkillValue.replace(/^•\s*/, "");
    const current = getValues("skills");
    current.splice(index, 1, edited);
    setValue("skills", current);
    handleCancelSkillEdit();
  };

  const handleCancelSkillEdit = () => {
    setEditSkillValue("");
    setSkillEdit(null);
  };

  return (
    <>
      <PageTitle
        title={`${id ? "Update" : "Add"} Career`}
        subTitle="Career"
        subRedirect="/career"
        cancelBtn
        cancelPath="/career"
        onSubmit={handleSubmit(onSubmit)}
      />
      <section className="single-product">
        <Form>
          <Row>
            <Col md={12}>
              <div className="general-information">
                <Card>
                  <h3>Career</h3>
                  <Row>
                    <Col md={6}>
                      <label htmlFor="">Job Title</label>
                      <input
                        type="text"
                        placeholder="Type job title here. . ."
                        {...register("jobTitle")}
                      />
                      <ErrorMessage message={errors.jobTitle?.message} />
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
                    <Col md={4}>
                      <label htmlFor="">Qualification</label>
                      <input
                        type="text"
                        placeholder="Type qualification here. . ."
                        {...register("qualification")}
                      />
                      <ErrorMessage message={errors.qualification?.message} />
                    </Col>
                    <Col md={4}>
                      <label htmlFor="">Location</label>
                      <input
                        type="text"
                        placeholder="Type location here. . ."
                        {...register("location")}
                      />
                      <ErrorMessage message={errors.location?.message} />
                    </Col>
                    <Col md={4}>
                      <label htmlFor="">Experience</label>
                      <div className="category-drop">
                        <Controller
                          name="experience"
                          control={control}
                          render={({ field }) => (
                            <Dropdown>
                              <DropdownToggle>
                                {field.value || "Select a Tech Stack"}{" "}
                                <FaCaretDown />
                              </DropdownToggle>
                              <DropdownMenu>
                                {["0-1", "1-2", "2-3", "3-5", "5-7", "7+"].map(
                                  (data) => (
                                    <DropdownItem
                                      onClick={() => {
                                        field.onChange(data);
                                      }}
                                    >
                                      {`${data} Years`}
                                    </DropdownItem>
                                  )
                                )}
                              </DropdownMenu>
                            </Dropdown>
                          )}
                        />
                      </div>
                      <ErrorMessage message={errors.experience?.message} />
                    </Col>
                    <Col md={6}>
                      <label htmlFor="">Vacancy</label>
                      <input
                        type="text"
                        placeholder="Type vacancy here. . ."
                        {...register("vacancy")}
                      />
                      <ErrorMessage message={errors.vacancy?.message} />
                    </Col>
                    <Col md={6}>
                      <label htmlFor="">Office Time</label>
                      <input
                        type="text"
                        placeholder="Type office time here. . ."
                        {...register("ofcTime")}
                      />
                      <ErrorMessage message={errors.ofcTime?.message} />
                    </Col>
                  </Row>
                </Card>
              </div>
            </Col>
            <Col md={12}>
              <div className="general-information">
                <Card>
                  <h3>Career Details</h3>
                  <label className="mb-3">Roles and Responsibility</label>
                  <div className="feature-input">
                    <input
                      type="text"
                      placeholder="Type roles and responsibility. . ."
                      value={currentRole}
                      onChange={(e) => setCurrentRole(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addRole()}
                    />
                    <div className="add-feature" onClick={addRole}>
                      <FaPlus size={16} />
                    </div>
                  </div>

                  {watch("role")?.map((field, index) => (
                    <>
                      <div
                        key={field}
                        className="feature-item d-flex align-items-center mt-2 gap-2"
                      >
                        <input
                          type="text"
                          value={
                            roleEdit === index
                              ? editRoleValue
                              : getValues(`role.${index}`)
                          }
                          disabled={roleEdit !== index}
                          ref={(el) => {
                            if (el) roleRefs.current[index] = el;
                            else delete roleRefs.current[index];
                          }}
                          onChange={(e) => {
                            setEditRoleValue(e.target.value);
                            clearErrors("role");
                          }}
                        />
                        {roleEdit === index ? (
                          <>
                            <button
                              type="button"
                              className="btn btn-sm btn-success"
                              onClick={() => handleRoleEdit(index)}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={handleCancelRoleEdit}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="btn btn-sm btn-success"
                              onClick={(e) => {
                                e.preventDefault();
                                setRoleEdit(index);
                                setEditRoleValue(getValues(`role.${index}`));
                              }}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removeRole(index)}
                            >
                              Remove
                            </button>
                          </>
                        )}
                      </div>
                      <ErrorMessage message={errors.role?.[index]?.message} />
                    </>
                  ))}
                  <ErrorMessage message={errors.role?.message} />

                  <label className="mb-3">Skills Required</label>
                  <div className="feature-input">
                    <input
                      type="text"
                      placeholder="Type skills required here. . ."
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addSkill()}
                    />
                    <div className="add-feature" onClick={addSkill}>
                      <FaPlus size={16} />
                    </div>
                  </div>

                  {watch("skills")?.map((field, index) => (
                    <>
                      <div
                        key={field}
                        className="feature-item d-flex align-items-center mt-2 gap-2"
                      >
                        <input
                          type="text"
                          value={
                            skillEdit === index
                              ? editSkillValue
                              : getValues(`skills.${index}`)
                          }
                          disabled={skillEdit !== index}
                          ref={(el) => {
                            if (el) skillRefs.current[index] = el;
                            else delete skillRefs.current[index];
                          }}
                          onChange={(e) => {
                            setEditSkillValue(e.target.value);
                            clearErrors("skills");
                          }}
                        />
                        {skillEdit === index ? (
                          <>
                            <button
                              type="button"
                              className="btn btn-sm btn-success"
                              onClick={() => handleSkillEdit(index)}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={handleCancelSkillEdit}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="btn btn-sm btn-success"
                              onClick={(e) => {
                                e.preventDefault();
                                setSkillEdit(index);
                                setEditSkillValue(getValues(`skills.${index}`));
                              }}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removeSkill(index)}
                            >
                              Remove
                            </button>
                          </>
                        )}
                      </div>
                      <ErrorMessage message={errors.skills?.[index]?.message} />
                    </>
                  ))}
                  <ErrorMessage message={errors.skills?.message} />

                  <label className="mb-3">Benefits</label>
                  <div className="feature-input">
                    <input
                      type="text"
                      placeholder="Type benefit here. . ."
                      value={currentBenefit}
                      onChange={(e) => setCurrentBenefit(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addBenefit()}
                    />
                    <div className="add-feature" onClick={addBenefit}>
                      <FaPlus size={16} />
                    </div>
                  </div>

                  {watch("benefits")?.map((field, index) => (
                    <>
                      <div
                        key={field}
                        className="feature-item d-flex align-items-center mt-2 gap-2"
                      >
                        <input
                          type="text"
                          value={
                            benefitEdit === index
                              ? editBenefitValue
                              : getValues(`benefits.${index}`)
                          }
                          disabled={benefitEdit !== index}
                          ref={(el) => {
                            if (el) benefitRefs.current[index] = el;
                            else delete benefitRefs.current[index];
                          }}
                          onChange={(e) => {
                            setEditBenefitValue(e.target.value);
                            clearErrors("benefits");
                          }}
                        />
                        {benefitEdit === index ? (
                          <>
                            <button
                              type="button"
                              className="btn btn-sm btn-success"
                              onClick={() => handleBenefitEdit(index)}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={handleCancelBenefitEdit}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="btn btn-sm btn-success"
                              onClick={(e) => {
                                e.preventDefault();
                                setBenefitEdit(index);
                                setEditBenefitValue(
                                  getValues(`benefits.${index}`)
                                );
                              }}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removeBenefit(index)}
                            >
                              Remove
                            </button>
                          </>
                        )}
                      </div>
                      <ErrorMessage
                        message={errors.benefits?.[index]?.message}
                      />
                    </>
                  ))}
                  <ErrorMessage message={errors.benefits?.message} />
                </Card>
              </div>
            </Col>
          </Row>
        </Form>
      </section>
    </>
  );
};

export default SingleCareer;
