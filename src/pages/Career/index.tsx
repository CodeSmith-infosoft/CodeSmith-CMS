import CareerComponent from "@/components/CareerComponent/CareerComponent";
import PageTitle from "@/components/CommonComponents/PageTitle";
import { useState } from "react";

const CareerPage = () => {
  const [totalCount, setTotalCount] = useState(0);

  return (
    <>
      <PageTitle
        title="Career"
        button="Career"
        path="/add-career"
        totalCount={totalCount}
      />
      <CareerComponent setTotalCount={setTotalCount} />
    </>
  );
};

export default CareerPage;
