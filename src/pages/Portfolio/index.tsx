import PageTitle from "@/components/CommonComponents/PageTitle";
import PortfolioComponent from "@/components/PortfolioComponent/PortfolioComponent";
import { useState } from "react";

const Portfolio = () => {
  const [totalCount, setTotalCount] = useState(0);

  return (
    <>
      <PageTitle
        title="Portfolio"
        button="Portfolio"
        path="/add-portfolio"
        totalCount={totalCount}
      />
      <PortfolioComponent setTotalCount={setTotalCount} />
    </>
  );
};

export default Portfolio;
