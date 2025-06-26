import PageTitle from "@/components/CommonComponents/PageTitle";
import Coupon from "@/components/coupon-components/Coupon";
import { useState } from "react";

const CouponDetails = () => {
  const [totalCount, setTotalCount] = useState(0)

  return (
    <section>
      <PageTitle title="Coupons" button="Coupon" path="/coupon" isExport={false} totalCount={totalCount} />
      <Coupon setTotalCount={setTotalCount} />
    </section>
  );
};

export default CouponDetails;
