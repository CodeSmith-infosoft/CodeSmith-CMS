import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import PageTitle from "../CommonComponents/PageTitle";
import {
  addMarketPlace,
  deleteMarketPlace,
  getMarketPlace,
  updateMarketPlace,
} from "@/service/asyncStore/action/marketPlace";
import { MarketplaceItemType } from "@/types/marketPlaceTypes";
import AddMarketPlace from "./AddMarketPlace";
import { useForm } from "react-hook-form";
import marketPlaceFormSchema, {
  marketPlaceFormSchemaType,
} from "@/service/form-schema/marketPlace.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getImageAsBlob } from "@/utils/helper";
import { toast } from "react-toastify";
import ConfirmationModal from "../ConfirmationModal";

const MarketPlace: React.FC = () => {
  const [marketplaces, setMarketPlace] = useState<MarketplaceItemType[]>([]);
  const [openMarketModal, setMarketModal] = useState(false);
  const [isEdit, setIsEdit] = useState<MarketplaceItemType | null>(null);
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
  } = useForm<marketPlaceFormSchemaType>({
    resolver: zodResolver(marketPlaceFormSchema),
    defaultValues: {
      link: "",
      image: "",
    },
  });

  useEffect(() => {
    getMarketPlaceData();
  }, []);

   useEffect(() => {
    if (!openMarketModal) {
      setIsEdit(null);
    }
  }, [openMarketModal]);

  const getMarketPlaceData = () => {
    getMarketPlace().then((res) => {
      if (res.success) {
        setMarketPlace(res.data);
        setTotalCount(res?.data?.length || 0)
      }
    });
  };

  const handleEdit = (item: MarketplaceItemType) => {
    setIsEdit(item);
    toggleModal(true);
  };

  const toggleModal = (isOpen: boolean, setFileList?: React.Dispatch<any>) => {
    setMarketModal(isOpen);
    if (setFileList) {
      setFileList(null);
    }
  };

  const onSubmit = async (
    data: marketPlaceFormSchemaType,
    setFileList: React.Dispatch<any>
  ) => {
    const formData = new FormData();
    formData.append("link", data.link);
    if (isEdit?._id && !(data.image instanceof File)) {
      const blob = await getImageAsBlob(data.image);
      formData.append(`image`, blob);
    } else {
      formData.append("image", data.image);
    }

    const action = () =>
      isEdit?._id
        ? updateMarketPlace(formData, isEdit._id)
        : addMarketPlace(formData);
    action().then((res) => {
      const toast2 = res.success ? toast.success : toast.error;
      toast2(res.message);
      if (res.success) {
        toggleModal(false);
        setFileList(null);
        reset();
        getMarketPlaceData();
      }
    });
  };

  const handleDelete = (item: MarketplaceItemType) => {
    setIsEdit(item);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!isEdit) return;
    setIsDeleting(true);

    try {
      deleteMarketPlace(isEdit._id).then((res) => {
        const toast2 = res.success ? toast.success : toast.error;
        toast2(res.message);

        if (res.success) {
          setMarketPlace((prev) => prev.filter((p) => p._id !== isEdit._id));
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
        title="Market Place"
        button="Market Place"
        openCategories={toggleModal}
        isExport={false}
        totalCount={totalCount}
      />
      <Container fluid className="marketplace-manager">
        <Row className="g-4">
          {marketplaces.map((marketplace) => (
            <Col key={marketplace._id} xs={12} sm={6} lg={6} xl={4}>
              <Card className="marketplace-card h-100">
                <Card.Body className="d-flex gap-4">
                  <div className="logo-section">
                    <div className="logo-container blinkit-logo">
                      <img
                        src={
                          import.meta.env.VITE_IMAGE_DOMAIN + marketplace.image
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <div className="url-section mb-3">
                      <small className="text-muted url-text one-line-clamp">
                        {marketplace.link}
                      </small>
                    </div>

                    <div className="button-section mt-auto">
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="edit-btn flex-fill"
                          onClick={() => handleEdit(marketplace)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          className="delete-btn flex-fill"
                          onClick={() => handleDelete(marketplace)}
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
      <AddMarketPlace
        handleToggle={toggleModal}
        openMarketModal={openMarketModal}
        control={control}
        register={register}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        errors={errors}
        item={isEdit}
        setValue={setValue}
      />
      <ConfirmationModal
        show={showDeleteModal}
        onHide={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Market Place"
        message={
          <>
            Are you sure you want to delete this <b>Market Place</b>?
            This action cannot be undone.
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

export default MarketPlace;
