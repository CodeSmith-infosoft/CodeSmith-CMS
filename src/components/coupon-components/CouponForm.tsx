import couponSchema, {
  couponFormdataType,
} from "@/service/form-schema/coupon.schema";
import PageTitle from "../CommonComponents/PageTitle";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { addCoupon, getCouponById, updateCouponById } from "@/service/asyncStore/action/coupon";
import { Card, Col, Form, Row } from "react-bootstrap";
import ErrorMessage from "../ErrorMessage";
import { DatePicker } from "rsuite";
import { PiMoney } from "react-icons/pi";
import { BsBag } from "react-icons/bs";
import { addCouponPayloadType } from "@/types/couponTypes";
import { toast } from "react-toastify";

const CouponForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<couponFormdataType>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      code: "",
      description: "",
      discountType: "fixed",
      discountValue: "",
      minPurchase: "",
      validFrom: "",
      validTo: "",
    },
  });

  useEffect(() => {
    if (id) {
      getCouponById(id).then((res) => {
        if (res.success) {
          const data = res.data;
          setValue("code", data.code);
          setValue("description", data.description);
          setValue("discountType", data.discountType);
          setValue("discountValue", data.discountValue.toString());
          setValue("minPurchase", data.minPurchase.toString());
          setValue("validFrom", data.validFrom);
          setValue("validTo", data.validTo);
        }
      });
    }
  }, [id]);

  const onSubmit = (data: couponFormdataType) => {
    const payload: addCouponPayloadType = {
      ...data,
      discountValue: Number(data.discountValue),
      minPurchase: Number(data.minPurchase),
    };
    const action = id ? updateCouponById(payload, id) : addCoupon(payload)
    action.then((res) => {
      const toast2 = res.success ? toast.success : toast.error;
      toast2(res.message);
      if (res.success) {
        reset();
        navigate("/coupons");
      }
    });
  };

  return (
    <div>
      <PageTitle
        title="Add Coupon"
        subTitle="Coupons"
        button="subCategories"
        onCancel={() => navigate("/coupons")}
        onSubmit={handleSubmit(onSubmit)}
      />
      <section className="single-product">
        <Form>
          <Row>
            <div className="inventory">
              <Card>
                <h3>Coupons Information</h3>
                <Row>
                  <Col md={6}>
                    <label htmlFor="">Coupon Code</label>
                    <input
                      type="text"
                      placeholder="Type coupon code here. . ."
                      {...register("code")}
                      onChange={(e) => {
                        const value = e.target.value.toUpperCase();
                        setValue("code", value);
                      }}
                    />
                    <ErrorMessage message={errors.code?.message} />
                  </Col>
                  <Col md={6}>
                    <label htmlFor="">Description</label>
                    <input
                      type="text"
                      placeholder="Type description here. . ."
                      {...register("description")}
                    />
                    <ErrorMessage message={errors.description?.message} />
                  </Col>
                  <Col md={6}>
                    <label htmlFor="">Discount Value</label>
                    <input
                      type="text"
                      placeholder="Type discount value here. . ."
                      {...register("discountValue")}
                    />
                    <ErrorMessage message={errors.discountValue?.message} />
                  </Col>
                  <Col md={6}>
                    <label htmlFor="">Minimum Purchase Value</label>
                    <input
                      type="text"
                      placeholder="Type minimum purchase value. . ."
                      {...register("minPurchase")}
                    />
                    <ErrorMessage message={errors.minPurchase?.message} />
                  </Col>
                  <Col md={6}>
                    <label htmlFor="">Valid From (Start Date)</label>
                    <Controller
                      name="validFrom"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          format="yyyy-MM-dd"
                          placeholder="Select Start Date"
                          placement="bottomStart"
                          value={new Date(field.value)}
                          onChange={(value) =>
                            field.onChange(value?.toISOString())
                          }
                          disabledDate={(date?: Date) => {
                            if (!date) return false;
                            return watch("validTo")
                              ? date > new Date(watch("validTo"))
                              : false;
                          }}
                        />
                      )}
                    />
                    <ErrorMessage message={errors.validFrom?.message} />
                  </Col>
                  <Col md={6}>
                    <label htmlFor="">Valid To (End Date)</label>
                    <Controller
                      name="validTo"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          format="yyyy-MM-dd"
                          placeholder="Select Start Date"
                          placement="bottomStart"
                          value={new Date(field.value)}
                          onChange={(value) =>
                            field.onChange(value?.toISOString())
                          }
                          disabledDate={(date?: Date) => {
                            if (!date) return false;
                            return watch("validFrom")
                              ? date < new Date(watch("validFrom"))
                              : false;
                          }}
                        />
                      )}
                    />
                    <ErrorMessage message={errors.validTo?.message} />
                  </Col>
                </Row>
              </Card>
            </div>
          </Row>
          <Row>
            <div className="inventory">
              <Card>
                <h3>Coupons Type</h3>
                <label>Type Of Coupon You Want To Create</label>
                <div className="inventory coupon-ticket-wrapper">
                  <div
                    className={`coupon-type-ticket ${
                      watch("discountType") === "fixed" ? "active" : ""
                    }`}
                    onClick={() => setValue("discountType", "fixed")}
                  >
                    <PiMoney size={32} />
                    <span className="label">Fixed Discount</span>
                  </div>
                  <div
                    className={`coupon-type-ticket ${
                      watch("discountType") === "percentage" ? "active" : ""
                    }`}
                    onClick={() => setValue("discountType", "percentage")}
                  >
                    <BsBag size={32} />
                    <span className="label">Percentage Discount</span>
                  </div>
                </div>
              </Card>
            </div>
          </Row>
        </Form>
      </section>
    </div>
  );
};

export default CouponForm;
