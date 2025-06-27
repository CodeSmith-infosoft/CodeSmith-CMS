import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import PageTitle from "../CommonComponents/PageTitle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getImageAsBlob } from "@/utils/helper";
import { toast } from "react-toastify";
import ConfirmationModal from "../ConfirmationModal";
import socialMediaFormSchema, {
  socialMediaFormSchemaType,
} from "@/service/form-schema/socialMedia.schema";
import {
  addInstaShop,
  deleteInstaShop,
  getAllInstaShop,
  updateInstaShop,
} from "@/service/asyncStore/action/portfolio";
import { socialMediaItemType } from "@/types/socialMediaDataTypes";
import AddSocialMedia from "./AddSocialMedia";

const SocialMediaCard: React.FC = () => {
  const [socialMediaData, setSocialMediaData] = useState<socialMediaItemType[]>(
    []
  );
  const [openSocialModal, setSocialModal] = useState(false);
  const [isEdit, setIsEdit] = useState<socialMediaItemType | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [totalCount, setTotalCount] = useState(0)

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<socialMediaFormSchemaType>({
    resolver: zodResolver(socialMediaFormSchema),
    defaultValues: {
      url: "",
      image: "",
    },
  });

  useEffect(() => {
    getMarketPlaceData();
  }, []);

  useEffect(() => {
    if (!openSocialModal) {
      setIsEdit(null);
    }
  }, [openSocialModal]);

  const getMarketPlaceData = () => {
    getAllInstaShop().then((res) => {
      if (res.success) {
        setSocialMediaData(res.data);
        setTotalCount(res?.data?.length || 0)
      }
    });
  };

  const handleEdit = (item: socialMediaItemType) => {
    setIsEdit(item);
    toggleModal(true);
  };

  const toggleModal = (isOpen: boolean, setFileList?: React.Dispatch<any>) => {
    setSocialModal(isOpen);
    if (setFileList) {
      setFileList(null);
    }
  };

  const onSubmit = async (
    data: socialMediaFormSchemaType,
    setFileList: React.Dispatch<any>
  ) => {
    setIsDeleting(true);
    const formData = new FormData();
    formData.append("url", data.url);
    if (isEdit?._id && !(data.image instanceof File)) {
      const blob = await getImageAsBlob(data.image);
      formData.append(`image`, blob);
    } else {
      formData.append("image", data.image);
    }

    const action = () =>
      isEdit?._id
        ? updateInstaShop(formData, isEdit._id)
        : addInstaShop(formData);
    action()
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

  const handleDelete = (item: socialMediaItemType) => {
    setIsEdit(item);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!isEdit) return;
    setIsDeleting(true);

    try {
      deleteInstaShop(isEdit._id).then((res) => {
        const toast2 = res.success ? toast.success : toast.error;
        toast2(res.message);

        if (res.success) {
          setSocialMediaData((prev) =>
            prev.filter((p) => p._id !== isEdit._id)
          );
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
        title="Instagram Feed"
        button="Instagram Feed"
        openCategories={toggleModal}
        isExport={false}
        totalCount={totalCount}
      />
      <Container fluid className="social-media-manager">
        <Row className="g-4">
          {socialMediaData.map((insta) => (
            <Col key={insta._id} xs={12} sm={6} lg={6} xl={4}>
              <Card className="social-media-card h-100">
                <Card.Body className="d-flex justify-content-center">
                  <div className="logo-section">
                    <div className="logo-container blinkit-logo">
                      <img
                        src={import.meta.env.VITE_IMAGE_DOMAIN + insta.image}
                      />
                    </div>
                  </div>

                  <div className="overlay">
                    {/* <div className="url-section mb-3">
                      <small className="text-muted url-text one-line-clamp">
                        {insta.url}
                      </small>
                    </div> */}

                    <div className="button-section">
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="edit-btn flex-fill"
                          onClick={() => handleEdit(insta)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          className="delete-btn flex-fill"
                          onClick={() => handleDelete(insta)}
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
      <AddSocialMedia
        handleToggle={toggleModal}
        openMarketModal={openSocialModal}
        control={control}
        register={register}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        errors={errors}
        item={isEdit}
        setValue={setValue}
        isLoading={isDeleting}
      />
      <ConfirmationModal
        show={showDeleteModal}
        onHide={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Insta Feed"
        message={
          <>
            Are you sure you want to delete this <b>Insta Feed</b>? This action
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

export default SocialMediaCard;
