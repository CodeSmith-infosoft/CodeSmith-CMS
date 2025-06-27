import BusinessComponent from "@/components/BusinessComponent/BusinessComponent";
import PageTitle from "@/components/CommonComponents/PageTitle";
import { useState } from "react";

const BusinessInquiry = () => {
  const [totalCount, setTotalCount] = useState(0);

  return (
    <>
      <PageTitle title="Contact" totalCount={totalCount} />
      <BusinessComponent setTotalCount={setTotalCount} />
    </>
  );
};

export default BusinessInquiry;
