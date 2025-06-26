import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import PageTitle from "../CommonComponents/PageTitle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import ConfirmationModal from "../ConfirmationModal";
import AddHomeBanner from "./AddEnterprise";
import {
  addEnterpriseLogo,
  getAllEnterpriseLogo,
  deleteEnterpriseLogo,
} from "@/service/asyncStore/action/dashboard";
import { bannerItemType } from "@/types/homeBannerTypes";
import bannerFormSchema, {
  bannerFormSchemaType,
} from "@/service/form-schema/banner.schema";

const EnterpriseCard: React.FC = () => {
  const [bannerData, setBannerData] = useState<bannerItemType[]>([]);
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
  } = useForm<bannerFormSchemaType>({
    resolver: zodResolver(bannerFormSchema),
    defaultValues: {
      image: "",
    },
  });

  useEffect(() => {
    getMarketPlaceData();
  }, []);

  useEffect(() => {
    if (!openBannerModal) {
      setIsEdit(null);
    }
  }, [openBannerModal]);

  const getMarketPlaceData = () => {
    getAllEnterpriseLogo().then((res) => {
      if (res.success) {
        setBannerData(res.data);
        setTotalCount(res?.data?.length || 0);
      }
    });
  };

  const toggleModal = (isOpen: boolean, setFileList?: React.Dispatch<any>) => {
    setBannerModal(isOpen);
    if (setFileList) {
      setFileList(null);
    }
  };

  const onSubmit = async (
    data: bannerFormSchemaType,
    setFileList: React.Dispatch<any>
  ) => {
    setIsDeleting(true);
    const formData = new FormData();
    formData.append("image", data.image);
    addEnterpriseLogo(formData)
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
      deleteEnterpriseLogo(isEdit._id).then((res) => {
        const toast2 = res.success ? toast.success : toast.error;
        toast2(res.message);

        if (res.success) {
          setBannerData((prev) => prev.filter((p) => p._id !== isEdit._id));
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
        title="Enterprise Logo"
        button="Enterprise Logo"
        openCategories={toggleModal}
        isExport={false}
        totalCount={totalCount}
      />
      <Container fluid className="home-banner-manager">
        <Row className="g-4">
          {bannerData.map((banner) => (
            <Col key={banner._id} md={2}>
              <Card className="home-banner-card h-100">
                <Card.Body className="d-flex justify-content-center">
                  <div className="logo-section">
                    <div className="enterprise-logo-container">
                      <img
                        src={import.meta.env.VITE_IMAGE_DOMAIN + banner.image}
                      />
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
      <AddHomeBanner
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
        title="Delete Home Banner"
        message={
          <>
            Are you sure you want to delete this <b>Enterprise Logo</b>? This action
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

export default EnterpriseCard;
