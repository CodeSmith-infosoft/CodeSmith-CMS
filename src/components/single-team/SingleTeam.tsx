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
import {
  addTeam,
  getTeamById,
  updateTeam,
} from "@/service/asyncStore/action/team";
import SingleTeamSchema, {
  SingleTeamFormData,
} from "@/service/form-schema/team.schema";
import { maxSizeInBytes } from "@/utils/constant";

const SingleTeam = () => {
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
  } = useForm<SingleTeamFormData>({
    resolver: zodResolver(SingleTeamSchema),
    defaultValues: {
      photo: "",
      name: "",
      position: "",
      linkedin: "",
      instagram: "",
      facebook: "",
      twitter: "",
    },
  });

  useEffect(() => {
    if (id) {
      getTeamById(id).then((res) => {
        if (res.success) {
          const data = res.data;
          setValue("name", data.name);
          setValue("position", data.position);
          setValue("photo", data.photo);
          setValue("linkedin", data.linkedin);
          setValue("instagram", data.instagram);
          setValue("facebook", data.facebook);
          setValue("twitter", data.twitter);
          setFileList([
            {
              url: data.photo,
              name: data.photo.split("/").at(-1),
            },
          ]);
        }
      });
    }
  }, [id]);

  // useEffect(() => {
  //   if (editorRef && editorRef.getData() !== watch("details")) {
  //     editorRef.setData(watch("details") || "");
  //   }
  // }, [watch("details"), editorRef]);

  // useEffect(() => {
  //   getAllTechStack({}).then((res) => {
  //     if (res.success) {
  //       setTechstachData(res.data.records);
  //     }
  //   });
  // }, []);

  const onSubmit = async (data: SingleTeamFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("position", data.position);
    formData.append("linkedin", data.linkedin || "");
    formData.append("instagram", data.instagram || "");
    formData.append("facebook", data.facebook || "");
    formData.append("twitter", data.twitter || "");
    if (id && !(data.photo instanceof File)) {
      const blob = await getImageAsBlob(data.photo);
      formData.append(`photo`, blob);
    } else {
      formData.append(`photo`, data.photo);
    }

    const action = () => (id ? updateTeam(formData, id) : addTeam(formData));
    action().then((res) => {
      const toast2 = res.success ? toast.success : toast.error;
      toast2(res.message);
      if (res.success) {
        reset();
        navigate("/team-member");
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
        title={`${id ? "Update" : "Add"} single team member`}
        subTitle="Team Member"
        subRedirect="/team-member"
        cancelBtn
        cancelPath="/team-member"
        isCancelConfirm={true}
        onSubmit={handleSubmit(onSubmit)}
      />
      <section className="single-product">
        <Form>
          <Row>
            <Col md={12}>
              <Card>
                <h3 className="mb-2">Member Image</h3>
                <div className="file-upload">
                  <Controller
                    name="photo"
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
                <ErrorMessage message={errors.photo?.message} />
              </Card>
            </Col>
            <Col md={12}>
              <div className="general-information">
                <Card className="mb-4">
                  <h3>Team Member</h3>

                  <label htmlFor="">Name</label>
                  <input type="text" placeholder="Name" {...register("name")} />
                  <ErrorMessage message={errors.name?.message} />

                  <label htmlFor="">Position</label>
                  <input
                    type="text"
                    placeholder="Position"
                    {...register("position")}
                  />
                  <ErrorMessage message={errors.position?.message} />
                </Card>
                <Card className="mb-4">
                  <h3>Social Media</h3>

                  <label htmlFor="">LinkedIn</label>
                  <input
                    type="text"
                    placeholder="LinkedIn URL"
                    {...register("linkedin")}
                  />
                  <ErrorMessage message={errors.linkedin?.message} />

                  <label htmlFor="">Instagram</label>
                  <input
                    type="text"
                    placeholder="Instagram URL"
                    {...register("instagram")}
                  />
                  <ErrorMessage message={errors.instagram?.message} />
                  <label htmlFor="">Facebook</label>
                  <input
                    type="text"
                    placeholder="Facebook URL"
                    {...register("facebook")}
                  />
                  <ErrorMessage message={errors.facebook?.message} />
                  <label htmlFor="">Twitter</label>
                  <input
                    type="text"
                    placeholder="Twitter URL"
                    {...register("twitter")}
                  />
                  <ErrorMessage message={errors.twitter?.message} />
                </Card>
              </div>
            </Col>
          </Row>
        </Form>
      </section>
    </>
  );
};

export default SingleTeam;
