import PageTitle from "@/components/CommonComponents/PageTitle";
import QuickBusinessComponent from "@/components/QuickBusinessComponent/BusinessComponent";
import { useState } from "react";

const DirectBusinessInquiry = () => {
  const [totalCount, setTotalCount] = useState(0);

  return (
    <>
      <PageTitle title="Hire Inquiry" totalCount={totalCount} />
      <QuickBusinessComponent setTotalCount={setTotalCount} />
    </>
  );
};

export default DirectBusinessInquiry;
