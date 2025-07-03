import PageTitle from "@/components/CommonComponents/PageTitle";
import JobComponent from "@/components/JobComponent/JobComponent";
import { useState } from "react";

const JobApplication = () => {
  const [totalCount, setTotalCount] = useState(0);

  return (
    <>
      <PageTitle title="Job Application" totalCount={totalCount} />
      <JobComponent setTotalCount={setTotalCount} />
    </>
  );
};

export default JobApplication;
