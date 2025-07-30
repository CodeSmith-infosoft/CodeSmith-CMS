import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import PageTitle from "../CommonComponents/PageTitle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import ConfirmationModal from "../ConfirmationModal";
import { bannerItemType } from "@/types/SuccessTypes";

import AddSuccess from "./AddSuccess";
import {
  addSuccess,
  deleteSuccess,
  getAllSuccess,
} from "@/service/asyncStore/action/successStory";
import successSchema, {
  successFormSchemaType,
} from "@/service/form-schema/success.schema";

const SuccessStoryCard: React.FC = () => {
  const [mobileData, setMobileData] = useState<bannerItemType[]>([]);
  const [webData, setWebData] = useState<bannerItemType[]>([]);
  const [openBannerModal, setBannerModal] = useState(false);
  const [isEdit, setIsEdit] = useState<bannerItemType | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    setError,
  } = useForm<successFormSchemaType>({
    resolver: zodResolver(successSchema),
    defaultValues: {
      image: "",
    },
  });

  useEffect(() => {
    getMarketPlaceData();
  }, []);

  const getMarketPlaceData = async (): Promise<void> => {
    try {
      const [webRes, mobileRes] = await Promise.all([
        getAllSuccess({ type: "web" }),
        getAllSuccess({ type: "mobile" }),
      ]);

      const newWebData = webRes.success
        ? webRes.data.map((item: bannerItemType) => ({
            ...item,
            type: "web" as const,
          }))
        : [];

      const newMobileData = mobileRes.success
        ? mobileRes.data.map((item: bannerItemType) => ({
            ...item,
            type: "mobile" as const,
          }))
        : [];

      setWebData(newWebData);
      setMobileData(newMobileData);

      const combinedData: bannerItemType[] = [...newWebData, ...newMobileData];
      setTotalCount(combinedData.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const toggleModal = (isOpen: boolean, setFileList?: React.Dispatch<any>) => {
    setBannerModal(isOpen);
    if (setFileList) {
      setFileList(null);
    }
  };

  const onSubmit = async (
    data: successFormSchemaType,
    setFileList: React.Dispatch<any>
  ) => {
    setIsDeleting(true);
    const formData = new FormData();
    formData.append("image", data.image);
    // Remove this line: formData.append("type", data.type);

    addSuccess(formData, data.type) // Pass type as second parameter
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

  const handleDelete = (item: bannerItemType) => {
    setIsEdit(item);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!isEdit) return;
    setIsDeleting(true);

    try {
      deleteSuccess(isEdit._id).then((res) => {
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
        title="Success Story"
        button="Success Story"
        openCategories={toggleModal}
        totalCount={totalCount}
      />
      <Container fluid className="home-banner-manager">
        <h3 className="mb-3 bg-white p-3 rounded-4">Web Story</h3>
        <Row className="g-4">
          {webData.map((banner) => (
            <Col key={banner._id} md={6}>
              <Card className="home-banner-card h-100">
                <Card.Body className="d-flex justify-content-center">
                  <div className="logo-section">
                    <div className="logo-container blinkit-logo">
                      <img src={banner.image} />
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
        <h3 className="mt-5 mb-3 bg-white p-3 rounded-4">Mobile Story</h3>
        <Row className="g-4">
          {mobileData.map((banner) => (
            <Col key={banner._id} md={3}>
              <Card className="home-banner-card h-100">
                <Card.Body className="d-flex justify-content-center">
                  <div className="logo-section">
                    <div className="logo-container blinkit-logo">
                      <img src={banner.image} />
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
      <AddSuccess
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
      />
      <ConfirmationModal
        show={showDeleteModal}
        onHide={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Success Story"
        message={
          <>
            Are you sure you want to delete this <b>Success Story</b>? This action
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

export default SuccessStoryCard;
