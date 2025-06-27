import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import PageTitle from "../CommonComponents/PageTitle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import ConfirmationModal from "../ConfirmationModal";
import AddGallery from "./AddGallery";
import { bannerItemType } from "@/types/galleryBannerTypes";
import bannerFormSchema, {
  bannerFormSchemaType,
} from "@/service/form-schema/gallery.schema";
import {
  addBanner,
  deleteBanner,
  getAllBanner,
} from "@/service/asyncStore/action/gallery";

const GalleryPage: React.FC = () => {
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
    getValues,
    formState: { errors },
    reset,
    setError,
  } = useForm<bannerFormSchemaType>({
    resolver: zodResolver(bannerFormSchema),
    defaultValues: {
      images: [],
    },
  });
  useEffect(() => {
    getMarketPlaceData();
  }, []);

  const getMarketPlaceData = () => {
    getAllBanner().then((res) => {
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

  console.log(getValues("images"));

  const onSubmit = async (
    data: bannerFormSchemaType,
    setFileList: React.Dispatch<any>
  ) => {
    setIsDeleting(true);
    const formData = new FormData();

    // Handle array of files properly
    if (Array.isArray(data.images)) {
      data.images.forEach((file) => {
        formData.append(`images`, file);
      });
    } else {
      formData.append("images", data.images);
    }

    console.log("FormData entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    addBanner(formData)
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
      deleteBanner(isEdit._id).then((res) => {
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
        title="Gallery"
        button="Banner"
        openCategories={toggleModal}
        totalCount={totalCount}
      />
      <Container fluid className="home-banner-manager">
        <Row className="g-4">
          {bannerData.map((banner) => (
            <Col key={banner._id} md={6}>
              <Card className="home-banner-card h-100">
                <Card.Body className="d-flex justify-content-center">
                  <div className="logo-section">
                    <div className="logo-container blinkit-logo">
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
      <AddGallery
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
        title="Delete Banner"
        message={
          <>
            Are you sure you want to delete this <b>Gallery Banner</b>? This
            action cannot be undone.
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

export default GalleryPage;
