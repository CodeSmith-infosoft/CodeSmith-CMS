import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import PageTitle from "../CommonComponents/PageTitle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import ConfirmationModal from "../ConfirmationModal";
import {
  getAllAboutUS,
  deleteAboutUS,
  addAboutUS,
} from "@/service/asyncStore/action/aboutUs";
import ReactPlayer from "react-player";
import AddAboutBanner from "./AddAboutBanner";
import aboutFormSchema, {
  aboutFormSchemaType,
} from "@/service/form-schema/about.schema";

type ItemType = {
  mediaFile: string;
  _id: string;
};

const AboutBannerCard: React.FC = () => {
  const [bannerData, setBannerData] = useState<ItemType[]>([]);
  const [imageData, setImageData] = useState<ItemType[]>([]);
  const [openBannerModal, setBannerModal] = useState(false);
  const [isEdit, setIsEdit] = useState<ItemType | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [totalCount] = useState(0);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    setError,
    watch,
  } = useForm<aboutFormSchemaType>({
    resolver: zodResolver(aboutFormSchema),
    defaultValues: {
      mediaFile: "",
      type: "",
    },
  });

  useEffect(() => {
    getMarketPlaceData();
  }, []);

  const getMarketPlaceData = () => {
    Promise.all([getAllAboutUS("video"), getAllAboutUS("image")]).then(
      ([video, image]) => {
        setBannerData(video.data);
        setImageData(image.data);
      }
    );
  };

  const toggleModal = (isOpen: boolean, setFileList?: React.Dispatch<any>) => {
    setBannerModal(isOpen);
    if (setFileList) {
      setFileList(null);
    }
  };

  const onSubmit = async (
    data: aboutFormSchemaType,
    setFileList: React.Dispatch<any>
  ) => {
    setIsDeleting(true);
    const formData = new FormData();
    formData.append("mediaFile", data.mediaFile);
    formData.append("type", data.type);
    addAboutUS(formData)
      .then((res) => {
        const toast2 = res.success ? toast.success : toast.error;
        toast2(res.message);
        if (res.success) {
          toggleModal(false);
          setFileList(null);
          reset();
          getMarketPlaceData();
        }
      })
      .finally(() => setIsDeleting(false));
  };

  const handleDelete = (item: ItemType) => {
    setIsEdit(item);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!isEdit) return;
    setIsDeleting(true);

    try {
      deleteAboutUS(isEdit._id).then((res) => {
        const toast2 = res.success ? toast.success : toast.error;
        toast2(res.message);

        if (res.success) {
          getMarketPlaceData();
        }
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setIsEdit(null);
    }
  };

  const handleDeleteCancel = () => {
    if (!isDeleting) {
      setShowDeleteModal(false);
      setIsEdit(null);
    }
  };

  return (
    <>
      <PageTitle
        title="About Us"
        button="About Us"
        openCategories={toggleModal}
        totalCount={totalCount}
      />
      <Container fluid className="home-banner-manager">
        <h3 className="mb-3 bg-white p-3 rounded-4">Web Story</h3>
        <Row className="g-4">
          {bannerData.map((banner) => (
            <Col key={banner._id} md={12}>
              <Card className="home-banner-card h-100">
                <Card.Body className="d-flex justify-content-center">
                  <div className="logo-section">
                    <div className="logo-container blinkit-logo">
                      <ReactPlayer
                        url={banner.mediaFile}
                        muted
                        loop
                        controls={true}
                        width="100%"
                        style={{ borderRadius: "20px" }}
                      />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Container fluid className="home-banner-manager">
        <h3 className="mb-3 bg-white p-3 rounded-4">Images</h3>
        <Row className="g-4">
          {imageData.map((banner) => (
            <Col key={banner._id} md={6}>
              <Card className="home-banner-card h-100">
                <Card.Body className="d-flex justify-content-center">
                  <div className="logo-section">
                    <div className="logo-container blinkit-logo">
                      <img src={banner.mediaFile} />
                    </div>
                  </div>

                  <div className="overlay">
                    <div className="button-section">
                      <div className="d-flex gap-2">
                        <Button
                          variant="danger"
                          size="sm"
                          className="delete-btn flex-fill"
                          onClick={() => handleDelete(banner)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <AddAboutBanner
        handleToggle={toggleModal}
        openMarketModal={openBannerModal}
        control={control}
        register={register}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        errors={errors}
        item={isEdit}
        setValue={setValue}
        isLoading={isDeleting}
        setError={setError}
        watch={watch}
      />
      <ConfirmationModal
        show={showDeleteModal}
        onHide={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete About Banner"
        message={
          <>
            Are you sure you want to delete this <b>About Banner</b>? This action
            cannot be undone.
          </>
        }
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        loading={isDeleting}
      />
    </>
  );
};

export default AboutBannerCard;
